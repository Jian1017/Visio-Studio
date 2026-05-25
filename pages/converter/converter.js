const app = getApp();
const { processPixelData } = require('../../utils/pixelator.js');

Page({
  data: {
    statusBarHeight: 20,
    navBarHeight: 44,
    imagePath: '',
    colorMode: 'color', // 颜色模式: 'color' 为多彩色，'bw' 为黑白双色
    gridSize: 29, // 默认 29x29 网格 (单板)
    gridSizeOptions: [
      { value: 29, label: '单板 (29x29)' },
      { value: 58, label: '四联板 (58x58)' },
      { value: 87, label: '九联大板 (87x87)' }
    ],
    maxColors: 16, // 默认限制 16 色
    maxColorsOptions: [
      { value: 0, label: '不限' },
      { value: 8, label: '8色' },
      { value: 12, label: '12色' },
      { value: 16, label: '16色' },
      { value: 24, label: '24色' }
    ],
    contrast: 0, // 默认对比度不增强
    contrastOptions: [
      { value: 0, label: '原图效果' },
      { value: 45, label: '中度增强' },
      { value: 100, label: '强力去模糊 (适合标志)' }
    ],
    isProcessing: false,
    hasResult: false,
    totalBeads: 0,
    uniqueColorCount: 0,
    beadCounts: [],
    // 暂存转换结果，待跳转详情时传参
    pixelResult: null
  },

  onLoad() {
    this.setData({
      statusBarHeight: app.globalData.statusBarHeight,
      navBarHeight: app.globalData.navBarHeight
    });
  },

  /**
   * 返回首页
   */
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 用户选择上传图片
   */
  selectImage() {
    const that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        that.setData({
          imagePath: tempFilePath,
          hasResult: false
        }, () => {
          that.runPixelation();
        });
      },
      fail(err) {
        console.error("选取图片失败", err);
      }
    });
  },

  /**
   * 规格滑块改变
   */
  onGridSizeChange(e) {
    const size = parseInt(e.currentTarget.dataset.value);
    this.setData({
      gridSize: size
    }, () => {
      if (this.data.imagePath) {
        this.runPixelation();
      }
    });
  },

  /**
   * 色数限制改变
   */
  onMaxColorsChange(e) {
    const max = parseInt(e.currentTarget.dataset.value);
    this.setData({
      maxColors: max
    }, () => {
      if (this.data.imagePath) {
        this.runPixelation();
      }
    });
  },

  /**
   * 对比度/清晰度变动
   */
  onContrastChange(e) {
    const value = parseInt(e.currentTarget.dataset.value);
    this.setData({
      contrast: value
    }, () => {
      if (this.data.imagePath) {
        this.runPixelation();
      }
    });
  },

  /**
   * 切换颜色模式（多彩 vs 黑白）
   */
  onColorModeChange(e) {
    const mode = e.currentTarget.dataset.value;
    this.setData({
      colorMode: mode
    }, () => {
      if (this.data.imagePath) {
        this.runPixelation();
      }
    });
  },

  /**
   * 执行核心像素化算法
   */
  runPixelation() {
    if (!this.data.imagePath) return;

    this.setData({ isProcessing: true });
    wx.showLoading({ title: '拼豆像素化中...' });

    const that = this;
    const { gridSize, maxColors, imagePath, colorMode } = this.data;

    // 1. 获取用于图像压缩与导出的隐藏小 Canvas
    const query = wx.createSelectorQuery();
    query.select('#pixelCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0] || !res[0].node) {
          wx.hideLoading();
          that.setData({ isProcessing: false });
          wx.showToast({ title: '画布载入失败', icon: 'error' });
          return;
        }

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');

        // 设置隐藏小 Canvas 尺寸与目标像素格子一致
        canvas.width = gridSize;
        canvas.height = gridSize;

        // 创建 Image 实例，在小程序 Canvas 环境下渲染
        const img = canvas.createImage();
        img.onload = () => {
          // 【超轻无损自适应缩放】保持图片的原始物理宽高比进行居中自适应缩放（防止拉伸变形且不裁剪边缘）（失真与显示不全双重修复）
          const imgWidth = img.width;
          const imgHeight = img.height;
          let dx = 0, dy = 0;
          let dWidth = gridSize;
          let dHeight = gridSize;

          if (imgWidth > imgHeight) {
            // 横向图：宽度贴边，上下留白（透明边框）
            dHeight = gridSize * (imgHeight / imgWidth);
            dy = (gridSize - dHeight) / 2;
          } else if (imgHeight > imgWidth) {
            // 纵向图：高度贴边，左右留白（透明边框）
            dWidth = gridSize * (imgWidth / imgHeight);
            dx = (gridSize - dWidth) / 2;
          }

          // 【无损降采样】禁用所有抗锯齿模糊过滤，使用纯最近邻无损缩放
          ctx.clearRect(0, 0, gridSize, gridSize);
          ctx.imageSmoothingEnabled = false;
          ctx.mozImageSmoothingEnabled = false;
          ctx.webkitImageSmoothingEnabled = false;
          ctx.msImageSmoothingEnabled = false;

          // 将图片完整居中且按原比例缩放到小 Canvas 上，超出区域留白（保持透明，自动识别为不需放拼豆的插孔）
          ctx.drawImage(img, 0, 0, imgWidth, imgHeight, dx, dy, dWidth, dHeight);

          // 执行像素重映射核心
          try {
            const result = processPixelData(canvas, ctx, gridSize, gridSize, gridSize, maxColors, this.data.contrast, colorMode);
            
            that.setData({
              totalBeads: result.totalBeads,
              uniqueColorCount: result.beadCounts.length,
              beadCounts: result.beadCounts,
              pixelResult: result,
              hasResult: true,
              isProcessing: false
            });
            
            // 绘制精美的拼豆仿真效果图
            that.drawPreview(result);
          } catch (err) {
            console.error(err);
            wx.showToast({ title: '图像解析失败', icon: 'none' });
            that.setData({ isProcessing: false });
          } finally {
            wx.hideLoading();
          }
        };
        img.onerror = (e) => {
          console.error("加载图片失败", e);
          wx.hideLoading();
          that.setData({ isProcessing: false });
          wx.showToast({ title: '图片加载失败', icon: 'error' });
        };
        img.src = imagePath;
      });
  },

  /**
   * 绘制 1:1 的拟真 2D 拼豆仿真预览图
   */
  drawPreview(pixelData) {
    const query = wx.createSelectorQuery();
    query.select('#previewCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0] || !res[0].node) return;

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio;

        // 设定显示大小 (例如固定的 300x300 物理像素)
        const displaySize = 300;
        canvas.width = displaySize * dpr;
        canvas.height = displaySize * dpr;
        ctx.scale(dpr, dpr);

        // 绘制高阶磨砂拟态透明棋盘格背景 (alternating checkerboard squares)
        const checkSize = 10;
        for (let py = 0; py < displaySize; py += checkSize) {
          for (let px = 0; px < displaySize; px += checkSize) {
            ctx.fillStyle = ((px / checkSize + py / checkSize) % 2 === 0) ? '#1f222e' : '#0b0c10';
            ctx.fillRect(px, py, checkSize, checkSize);
          }
        }

        const grid = pixelData.grid;
        const size = pixelData.width;
        const cellSize = displaySize / size;

        // 绘制每一个格子
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            const cell = grid[y][x];
            const cx = x * cellSize + cellSize / 2;
            const cy = y * cellSize + cellSize / 2;

            if (cell) {
              const radius = (cellSize / 2) - 0.5;

              // 1. 绘制圆形豆子身体
              ctx.beginPath();
              ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
              ctx.fillStyle = cell.hex;
              ctx.fill();

              // 2. 仿真内缩发光（高光效果，增强质感）
              ctx.beginPath();
              ctx.arc(cx, cy, radius - 0.5, 0, 2 * Math.PI);
              ctx.strokeStyle = 'rgba(255,255,255,0.15)';
              ctx.lineWidth = 1;
              ctx.stroke();

              // 3. 绘制豆子中心的熔融小黑孔
              ctx.beginPath();
              ctx.arc(cx, cy, radius / 3, 0, 2 * Math.PI);
              ctx.fillStyle = '#050608'; // 内部板孔底色
              ctx.fill();
            } else {
              // 空白齿位：绘制一个小灰点表示空插齿
              ctx.beginPath();
              ctx.arc(cx, cy, 1, 0, 2 * Math.PI);
              ctx.fillStyle = 'rgba(255,255,255,0.1)';
              ctx.fill();
            }
          }
        }
      });
  },

  /**
   * 一键生成图纸，保存全局数据并跳转
   */
  generatePattern() {
    if (!this.data.pixelResult) return;

    // 存储当前像素图纸结果到全局，以便详情页获取
    app.globalData.activePattern = {
      ...this.data.pixelResult,
      // 附带转换设定参数
      gridSize: this.data.gridSize,
      maxColors: this.data.maxColors
    };

    wx.navigateTo({
      url: '/pages/detail/detail'
    });
  }
});
