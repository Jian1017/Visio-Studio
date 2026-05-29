const app = getApp();

Page({
  data: {
    statusBarHeight: 20,
    navBarHeight: 44,
    pattern: null,
    selectedColorCode: null, // 当前选中的高亮色号 (null 为普通查看模式)
    checkedCodes: {},       // 用户标记“已购齐/已准备好”的色号 map
    showSymbol: false       // 是否在普通模式下显示拼豆色号 (默认隐藏，双击或点击悬浮按钮可切换)
  },

  // 内部临时变量，保存 Canvas 节点与 Context 引用，避免频繁查询
  canvas: null,
  ctx: null,
  dpr: 1,
  canvasWidth: 320, // 物理尺寸，初始值

  onLoad() {
    this.setData({
      statusBarHeight: app.globalData.statusBarHeight,
      navBarHeight: app.globalData.navBarHeight
    });

    // 在页面实例 (this) 上初始化手势参数，彻底绕过跨线程 setData 造成的严重绘图卡顿！
    this.scale = 1.0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.lastTouchX = 0;
    this.lastTouchY = 0;
    this.lastTouchDistance = 0;

    // 1. 获取全局生成的图纸数据
    const activePattern = app.globalData.activePattern;
    if (!activePattern) {
      wx.showToast({
        title: '未找到有效图纸',
        icon: 'error',
        duration: 2000
      });
      setTimeout(() => {
        wx.redirectTo({ url: '/pages/index/index' });
      }, 1500);
      return;
    }

    this.setData({
      pattern: activePattern
    });
  },

  onReady() {
    if (!this.data.pattern) return;
    this.initCanvas();
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 初始化画板 Canvas 节点
   */
  initCanvas() {
    const that = this;
    const query = wx.createSelectorQuery();
    query.select('#gridCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0] || !res[0].node) {
          console.error("画板 Canvas 获取失败");
          return;
        }

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const systemInfo = wx.getSystemInfoSync();
        
        that.dpr = systemInfo.pixelRatio;
        that.canvas = canvas;
        that.ctx = ctx;
        
        // 动态读取 WXML 容器的渲染宽度
        const displayWidth = res[0].width;
        that.canvasWidth = displayWidth;
        
        // 设置 Canvas 像素尺寸与高分屏对齐
        canvas.width = displayWidth * that.dpr;
        canvas.height = displayWidth * that.dpr;
        ctx.scale(that.dpr, that.dpr);

        // 默认将视口居中
        that.resetZoom();
      });
  },

  /**
   * 核心：渲染拼豆网格图纸
   */
  drawGrid() {
    const { canvas, ctx, canvasWidth, dpr } = this;
    if (!canvas || !ctx) return;

    const { pattern, selectedColorCode, showSymbol } = this.data;
    const { scale, offsetX, offsetY } = this;
    const size = pattern.width;
    const grid = pattern.grid;

    // 清空并绘制高阶磨砂拟态透明棋盘格背景
    ctx.clearRect(0, 0, canvasWidth, canvasWidth);
    const checkSize = 12;
    for (let py = 0; py < canvasWidth; py += checkSize) {
      for (let px = 0; px < canvasWidth; px += checkSize) {
        ctx.fillStyle = ((px / checkSize + py / checkSize) % 2 === 0) ? '#1f222e' : '#0b0c10';
        ctx.fillRect(px, py, checkSize, checkSize);
      }
    }

    // 保存当前变换矩阵
    ctx.save();
    
    // 应用平移与缩放 (以中心点为基础变换)
    ctx.translate(canvasWidth / 2 + offsetX, canvasWidth / 2 + offsetY);
    ctx.scale(scale, scale);
    ctx.translate(-canvasWidth / 2, -canvasWidth / 2);

    // 单元格规格计算
    const baseCellSize = canvasWidth / size;

    // 1. 绘制网格辅助线（背景网格）
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= size; i++) {
      ctx.beginPath();
      // 横线
      ctx.moveTo(0, i * baseCellSize);
      ctx.lineTo(canvasWidth, i * baseCellSize);
      ctx.stroke();
      
      // 竖线
      ctx.moveTo(i * baseCellSize, 0);
      ctx.lineTo(i * baseCellSize, canvasWidth);
      ctx.stroke();
    }

    // 2. 每5格 and 每10格绘制粗的网格对齐分割线
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
    ctx.lineWidth = 1.2;
    for (let i = 0; i <= size; i += 5) {
      if (i === 0 || i === size) continue;
      // 横线
      ctx.beginPath();
      ctx.moveTo(0, i * baseCellSize);
      ctx.lineTo(canvasWidth, i * baseCellSize);
      ctx.stroke();
      
      // 竖线
      ctx.beginPath();
      ctx.moveTo(i * baseCellSize, 0);
      ctx.lineTo(i * baseCellSize, canvasWidth);
      ctx.stroke();
    }

    // 3. 绘制拼豆颗粒
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const cell = grid[y][x];
        const cx = x * baseCellSize + baseCellSize / 2;
        const cy = y * baseCellSize + baseCellSize / 2;
        const radius = (baseCellSize / 2) - 0.5;

        if (cell) {
          // 判断是否处于“单色高亮临摹模式”
          const isTracingActive = selectedColorCode !== null;
          const isTargetColor = cell.code === selectedColorCode;

          if (isTracingActive) {
            if (isTargetColor) {
              // 高亮展示目标颜色
              ctx.globalAlpha = 1.0;
              ctx.beginPath();
              ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
              ctx.fillStyle = cell.hex;
              ctx.fill();

              // 自动感知底色亮度并动态调整临摹文本与中心孔对比度
              const r = cell.rgb ? cell.rgb[0] : 255;
              const g = cell.rgb ? cell.rgb[1] : 255;
              const b = cell.rgb ? cell.rgb[2] : 255;
              const isLight = (0.299 * r + 0.587 * g + 0.114 * b) > 135;

              // 绘制高亮豆子的中心孔 (浅色豆子使用白色孔，深色豆子使用黑色孔)
              ctx.beginPath();
              ctx.arc(cx, cy, radius / 3, 0, 2 * Math.PI);
              ctx.fillStyle = isLight ? '#ffffff' : '#0b0c10';
              ctx.fill();

              // 绘制临摹用高Legibility辅助字符 (浅色豆用黑字、深色豆用白字)
              // 实际渲染单元格尺寸 (baseCellSize * scale) 大于等于 10 像素时才进行绘制，防止小尺寸拥挤变形
              if (baseCellSize * scale >= 10) {
                ctx.fillStyle = isLight ? '#111111' : '#ffffff';
                const symbolLen = cell.symbol.length;
                const fontScale = symbolLen === 1 ? 0.55 : (symbolLen === 2 ? 0.45 : 0.35);
                ctx.font = `bold ${Math.max(10, baseCellSize * fontScale)}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(cell.symbol, cx, cy);
              }
            } else {
              // 其它颜色大幅淡化 (仅保留 faint 虚影防迷路)
              ctx.globalAlpha = 0.08;
              ctx.beginPath();
              ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
              ctx.fillStyle = cell.hex;
              ctx.fill();
            }
          } else {
            // 普通模式：所有豆子正常彩色绘制
            ctx.globalAlpha = 1.0;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
            ctx.fillStyle = cell.hex;
            ctx.fill();

            // 自动感知底色亮度并动态调整小孔对比度
            const r = cell.rgb ? cell.rgb[0] : 255;
            const g = cell.rgb ? cell.rgb[1] : 255;
            const b = cell.rgb ? cell.rgb[2] : 255;
            const isLight = (0.299 * r + 0.587 * g + 0.114 * b) > 135;

            // 绘制中心孔
            ctx.beginPath();
            ctx.arc(cx, cy, radius / 3.5, 0, 2 * Math.PI);
            ctx.fillStyle = isLight ? '#ffffff' : '#0b0c10';
            ctx.fill();

            // 若放大倍率足够高且手动开启了“显示代号”，在豆子中心清晰显示对比字符
            // 要求实际格尺寸大于等于 12 像素，从根本上杜绝极小字号下由于字体渲染产生的白斑和变形
            if (scale >= 1.5 && showSymbol && (baseCellSize * scale >= 12)) {
              ctx.fillStyle = isLight ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)';
              const symbolLen = cell.symbol.length;
              const fontScale = symbolLen === 1 ? 0.55 : (symbolLen === 2 ? 0.45 : 0.35);
              ctx.font = `${baseCellSize * fontScale}px sans-serif`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(cell.symbol, cx, cy);
            }
          }
        } else {
          // 空插齿
          ctx.globalAlpha = 0.15;
          ctx.beginPath();
          ctx.arc(cx, cy, 1, 0, 2 * Math.PI);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
      }
    }

    // 4. 绘制网格坐标文字（每隔5格在边缘绘制数字以指示行列）
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = '#00f2fe';
    ctx.font = '9px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 5; i < size; i += 5) {
      // 顶部刻度
      ctx.fillText(i.toString(), i * baseCellSize, 10);
      // 左侧刻度
      ctx.fillText(i.toString(), 10, i * baseCellSize);
    }

    ctx.restore();
  },

  /**
   * 手势事件：触控开始
   */
  onTouchStart(e) {
    if (e.touches.length === 1) {
      // 单指开始拖拽
      this.lastTouchX = e.touches[0].clientX;
      this.lastTouchY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      // 双指开始缩放
      const x1 = e.touches[0].clientX;
      const y1 = e.touches[0].clientY;
      const x2 = e.touches[1].clientX;
      const y2 = e.touches[1].clientY;
      
      const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      this.lastTouchDistance = distance;
    }
  },

  /**
   * 手势事件：触控平移与缩放拖动
   */
  onTouchMove(e) {
    if (e.touches.length === 1 && this.lastTouchX) {
      // 单指拖拽平移
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      
      const dx = touchX - this.lastTouchX;
      const dy = touchY - this.lastTouchY;
      
      this.offsetX += dx;
      this.offsetY += dy;
      this.lastTouchX = touchX;
      this.lastTouchY = touchY;
      
      // 直接执行同步底层重绘，没有任何 setData 线程间复制的开销，达到 60fps 极限丝滑！
      this.drawGrid();
    } else if (e.touches.length === 2 && this.lastTouchDistance) {
      // 双指捏合缩放
      const x1 = e.touches[0].clientX;
      const y1 = e.touches[0].clientY;
      const x2 = e.touches[1].clientX;
      const y2 = e.touches[1].clientY;
      
      const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      const factor = distance / this.lastTouchDistance;
      
      let newScale = this.scale * factor;
      
      // 限制缩放区间为 0.7x 到 4.5x
      newScale = Math.max(0.7, Math.min(4.5, newScale));
      
      this.scale = newScale;
      this.lastTouchDistance = distance;
      
      this.drawGrid();
    }
  },

  /**
   * 手势事件：触控结束
   */
  onTouchEnd() {
    this.lastTouchX = 0;
    this.lastTouchY = 0;
    this.lastTouchDistance = 0;
  },

  /**
   * 双击/重置视图：居中对齐、缩放归一
   */
  resetZoom() {
    this.scale = 1.0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.drawGrid();
  },

  /**
   * 放大视口
   */
  zoomIn() {
    let s = this.scale + 0.3;
    if (s > 4.5) s = 4.5;
    this.scale = s;
    this.drawGrid();
  },

  /**
   * 缩小视口
   */
  zoomOut() {
    let s = this.scale - 0.3;
    if (s < 0.7) s = 0.7;
    this.scale = s;
    this.drawGrid();
  },

  /**
   * 临摹功能：选择底部色卡色号以进行“单色高亮”或退出
   */
  selectColor(e) {
    const code = e.currentTarget.dataset.code;
    const currentSelected = this.data.selectedColorCode;

    if (currentSelected === code) {
      // 再次点击取消高亮，回到常规全彩色视图
      this.setData({ selectedColorCode: null }, () => { this.drawGrid(); });
    } else {
      // 激活该颜色的临摹高亮模式
      this.setData({ selectedColorCode: code }, () => { this.drawGrid(); });
      
      // 轻微震动反馈（增强实体感）
      wx.vibrateShort({ type: 'light' });
      
      wx.showToast({
        title: `临摹模式: ${code}`,
        icon: 'none',
        duration: 1000
      });
    }
  },

  /**
   * 标记某一颜色状态为已备齐/已完成
   */
  toggleCheck(e) {
    const code = e.currentTarget.dataset.code;
    const checked = { ...this.data.checkedCodes };
    
    checked[code] = !checked[code];
    
    this.setData({
      checkedCodes: checked
    });
    
    // 如果勾选备齐，给予震动反馈
    if (checked[code]) {
      wx.vibrateShort({ type: 'medium' });
    }
  },

  /**
   * 切换普通查看模式下的色号显示状态
   */
  toggleSymbol() {
    const showSymbol = !this.data.showSymbol;
    this.setData({ showSymbol }, () => {
      this.drawGrid();
    });
    // 轻微震动反馈
    wx.vibrateShort({ type: 'light' });
  },

  /**
   * 一键导出高清带水印图纸并保存至手机相册
   */
  savePatternImage() {
    if (!this.data.pattern) return;

    wx.showLoading({
      title: '正在生成超清图纸...'
    });

    const that = this;
    const { pattern } = this.data;
    const size = pattern.width;
    const grid = pattern.grid;

    // 1. 获取用于离屏导出的隐藏高解析度 Canvas
    const query = wx.createSelectorQuery();
    query.select('#exportCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0] || !res[0].node) {
          wx.hideLoading();
          wx.showToast({ title: '导出画布失败', icon: 'error' });
          return;
        }

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');

        // 【重磅升级】设置图纸为超清解析度尺寸：3600x3960 像素，确保放大看每颗豆子都无比清晰！
        const exportWidth = 3600;
        const exportHeight = 3960;
        canvas.width = exportWidth;
        canvas.height = exportHeight;

        // A. 绘制纯白纸张背景
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, exportWidth, exportHeight);

        // B. 计算格子物理大小 (3600 像素宽平均分配)
        const baseCellSize = exportWidth / size;

        // C. 绘制网格背景细线 (线宽调粗至 2.5 像素)
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 2.5;
        for (let i = 0; i <= size; i++) {
          ctx.beginPath();
          ctx.moveTo(0, i * baseCellSize);
          ctx.lineTo(exportWidth, i * baseCellSize);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(i * baseCellSize, 0);
          ctx.lineTo(i * baseCellSize, exportWidth);
          ctx.stroke();
        }

        // D. 每 5 格绘制稍微明显的辅助粗线 (线宽调粗至 6 像素)
        ctx.strokeStyle = '#94A3B8';
        ctx.lineWidth = 6;
        for (let i = 0; i <= size; i += 5) {
          if (i === 0 || i === size) continue;
          ctx.beginPath();
          ctx.moveTo(0, i * baseCellSize);
          ctx.lineTo(exportWidth, i * baseCellSize);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(i * baseCellSize, 0);
          ctx.lineTo(i * baseCellSize, exportWidth);
          ctx.stroke();
        }

        // E. 绘制 1:1 的高清拼豆圆颗粒和专属标记符号 (3倍缩放)
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            const cell = grid[y][x];
            const cx = x * baseCellSize + baseCellSize / 2;
            const cy = y * baseCellSize + baseCellSize / 2;
            const radius = (baseCellSize / 2) - 1.5;

            if (cell) {
              // 1. 绘制拼豆彩色圆身
              ctx.beginPath();
              ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
              ctx.fillStyle = cell.hex;
              ctx.fill();

              // 自动感知底色亮度并动态调整导出时的代号颜色与小孔对比度，以保证全色系绝对清晰可见
              const r = cell.rgb ? cell.rgb[0] : 255;
              const g = cell.rgb ? cell.rgb[1] : 255;
              const b = cell.rgb ? cell.rgb[2] : 255;
              const isLight = (0.299 * r + 0.587 * g + 0.114 * b) > 135;

              // 2. 绘制仿真中心孔洞 (浅色豆子使用白色孔，深色豆子使用黑色孔)
              ctx.beginPath();
              ctx.arc(cx, cy, radius / 3.5, 0, 2 * Math.PI);
              ctx.fillStyle = isLight ? '#FFFFFF' : '#050608';
              ctx.fill();

              // 3. 绘制清晰的临摹大代号 (浅色豆用黑字、深色豆用白字)
              // 动态调整字号以完美适配 1、2 或 3 个字符的色号 (如 A1, H7, D15)
              ctx.fillStyle = isLight ? '#000000' : '#FFFFFF';
              const symbolLen = cell.symbol.length;
              const fontScale = symbolLen === 1 ? 0.55 : (symbolLen === 2 ? 0.45 : 0.35);
              ctx.font = `bold ${baseCellSize * fontScale}px monospace`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(cell.symbol, cx, cy);
            } else {
              // 空定位插齿点
              ctx.beginPath();
              ctx.arc(cx, cy, 3.5, 0, 2 * Math.PI);
              ctx.fillStyle = '#CBD5E1';
              ctx.fill();
            }
          }
        }

        // F. 绘制外边界坐标尺数字 (字号根据单元格大小动态调整，确保完美契合第一行列)
        ctx.fillStyle = '#475569';
        const rulerFontSize = Math.max(20, Math.floor(baseCellSize * 0.5));
        ctx.font = `bold ${rulerFontSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let i = 5; i < size; i += 5) {
          ctx.fillText(i.toString(), i * baseCellSize, baseCellSize / 2);
          ctx.fillText(i.toString(), baseCellSize / 2, i * baseCellSize);
        }

        // G. 绘制底部品牌版权 Banner (3倍字号放大)
        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 84px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('Visio Studio', 100, 3720);

        ctx.fillStyle = '#64748B';
        ctx.font = '500 52px sans-serif';
        ctx.fillText(`图纸规格: ${size}x${size} 单板 | 豆子用量: ${pattern.totalBeads} 颗`, 100, 3820);

        // H. 建立 1.5 秒安全导出机制 (Safety Timeout Fallback)
        let hasExported = false;
        
        const executeExport = (watermarkImg = null) => {
          if (hasExported) return;
          hasExported = true;

          if (watermarkImg) {
            // 在右下角绘制高清大水印 Logo (尺寸调大至 280x280 像素)
            const wSize = 280;
            const wx = exportWidth - wSize - 100;
            const wy = exportWidth + (360 - wSize) / 2;
            ctx.drawImage(watermarkImg, wx, wy, wSize, wSize);
          }

          // I. 将离屏 Canvas 导出为超清临时图片路径
          wx.canvasToTempFilePath({
            canvas: canvas,
            x: 0,
            y: 0,
            width: exportWidth,
            height: exportHeight,
            destWidth: exportWidth,
            destHeight: exportHeight,
            fileType: 'png',
            success(tempRes) {
              // J. 保存图片到手机系统相册
              wx.saveImageToPhotosAlbum({
                filePath: tempRes.tempFilePath,
                success() {
                  wx.hideLoading();
                  wx.showModal({
                    title: '图纸已保存',
                    content: '超高清图纸已成功保存至您的系统相册！' + (watermarkImg ? '（已自动嵌入 Visio Studio 水印）' : '（水印文件未同步，已启用无水印保底导出）'),
                    showCancel: false
                  });
                },
                fail(err) {
                  wx.hideLoading();
                  console.error("保存相册失败", err);
                  if (err.errMsg.indexOf('auth') > -1) {
                    wx.showModal({
                      title: '保存失败',
                      content: '需要系统相册访问权限才能保存图纸，请前往设置开启。',
                      showCancel: false
                    });
                  } else {
                    wx.showToast({ title: '保存失败', icon: 'error' });
                  }
                }
              });
            },
            fail(err) {
              wx.hideLoading();
              console.error("导出图片失败", err);
              wx.showToast({ title: '导出失败', icon: 'error' });
            }
          });
        };

        // 设定 1.5 秒超时安全网
        const exportTimeoutId = setTimeout(() => {
          console.warn("水印加载超时，启用无水印高清降级导出");
          executeExport(null);
        }, 1500);

        // K. 载入本地专享的水印图片 assets/watermark.png
        const img = canvas.createImage();
        img.onload = () => {
          clearTimeout(exportTimeoutId);
          executeExport(img);
        };
        img.onerror = (e) => {
          clearTimeout(exportTimeoutId);
          console.error("加载水印图片失败，启用降级无水印导出", e);
          executeExport(null);
        };
        img.src = '/assets/watermark.png'; // 包内根绝对路径
      });
  }
});
