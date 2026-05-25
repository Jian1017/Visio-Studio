/**
 * Visio Studio 拼豆工坊 Web版 - 像素网格处理核心算法 (ES Module)
 */

// 采用全局 window 属性访问，支持本地双击 file:/// 直接免服务运行！
// (移除了顶层解构以完全避免某些浏览器环境下的加载顺序问题)

/**
 * 核心：像素化并映射到拼豆色卡
 * @param {Object} canvas - HTML5 Canvas 实例
 * @param {Object} ctx - Canvas 渲染上下文
 * @param {Number} sourceWidth - 原始图像宽
 * @param {Number} sourceHeight - 原始图像高
 * @param {Number} targetSize - 目标网格边长（如 29 表示 29x29 网格）
 * @param {Number} maxColors - 最大允许颜色数（0表示不限制）
 * @param {Number} contrast - 对比度增强比例 (0-100)
 * @param {String} colorMode - 颜色模式 ('color' | 'bw')
 * @returns {Object} 像素网格和色彩统计清单
 */
function processPixelData(canvas, ctx, sourceWidth, sourceHeight, targetSize, maxColors = 0, contrast = 0, colorMode = 'color') {
  // 动态读取 window 的核心配置与算法函数，确保绝对安全的加载顺序
  const { ARTKAL_C_COLORS, matchBeadColor, getPerceptualDistance } = window;

  if (!ARTKAL_C_COLORS || !matchBeadColor || !getPerceptualDistance) {
    throw new Error("关键色号数据库及算法组件 (colors.js) 加载异常！请检查控制台错误。");
  }

  // 1. 获取小 Canvas 的像素数据
  const imgData = ctx.getImageData(0, 0, targetSize, targetSize);
  const data = imgData.data;
  
  const width = targetSize;
  const height = targetSize;
  
  let rawGrid = []; // 临时一维数组保存每个点的匹配色彩
  let beadHistogram = {}; // 颜色出现次数统计表
  
  // 2. 第一次遍历：执行色彩距离映射，统计色号出现频次
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      let r = data[idx];
      let g = data[idx + 1];
      let b = data[idx + 2];
      const a = data[idx + 3];
      
      // 透明度过低视为空白（不放置拼豆）
      if (a < 100) {
        rawGrid.push(null);
        continue;
      }

      // 对比度增强算法 (Push pixels to extreme states to avoid gray blur)
      if (contrast > 0) {
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        r = Math.max(0, Math.min(255, factor * (r - 128) + 128));
        g = Math.max(0, Math.min(255, factor * (g - 128) + 128));
        b = Math.max(0, Math.min(255, factor * (b - 128) + 128));
      }
      
      let matchedBead;
      if (colorMode === 'bw') {
        // 计算亮度 (Luminance)
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        // 如果亮度大于 127，映射为 C01 白色，否则为 C02 黑色
        const beadCode = (gray > 127) ? 'C01' : 'C02';
        matchedBead = ARTKAL_C_COLORS.find(c => c.code === beadCode);
      } else {
        // 寻找最接近的拼豆颜色
        matchedBead = matchBeadColor([r, g, b]);
      }
      
      rawGrid.push({ ...matchedBead });
      
      // 统计频次
      if (!beadHistogram[matchedBead.code]) {
        beadHistogram[matchedBead.code] = {
          bead: matchedBead,
          count: 0
        };
      }
      beadHistogram[matchedBead.code].count++;
    }
  }
  
  let finalGrid = [];
  
  // 3. 颜色数量合并与削减算法 (Color Reduction Limit)
  const detectedCodes = Object.keys(beadHistogram);
  if (colorMode !== 'bw' && maxColors > 0 && detectedCodes.length > maxColors) {
    // 按频次从高到低排序，保留前 maxColors 个最高频颜色
    const sortedBeads = Object.values(beadHistogram)
      .sort((a, b) => b.count - a.count);
    
    const allowedBeads = sortedBeads.slice(0, maxColors).map(item => item.bead);
    const allowedCodes = new Set(allowedBeads.map(b => b.code));
    
    beadHistogram = {}; // 重新计算频次
    
    for (let i = 0; i < rawGrid.length; i++) {
      const currentCell = rawGrid[i];
      if (currentCell === null) {
        finalGrid.push(null);
        continue;
      }
      
      if (allowedCodes.has(currentCell.code)) {
        finalGrid.push(currentCell);
        
        if (!beadHistogram[currentCell.code]) {
          beadHistogram[currentCell.code] = { bead: currentCell, count: 0 };
        }
        beadHistogram[currentCell.code].count++;
      } else {
        // 重新计算跟 allowedBeads 中哪一个最接近
        let minDistance = Infinity;
        let bestReMatch = allowedBeads[0];
        
        for (let j = 0; j < allowedBeads.length; j++) {
          const allowed = allowedBeads[j];
          const dist = getPerceptualDistance(currentCell.rgb, allowed.rgb);
          if (dist < minDistance) {
            minDistance = dist;
            bestReMatch = allowed;
          }
        }
        
        finalGrid.push({ ...bestReMatch });
        
        if (!beadHistogram[bestReMatch.code]) {
          beadHistogram[bestReMatch.code] = { bead: bestReMatch, count: 0 };
        }
        beadHistogram[bestReMatch.code].count++;
      }
    }
  } else {
    finalGrid = rawGrid;
  }
  
  // 4. 将一维数组重构成二维网格 grid[y][x]
  const grid2D = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push(finalGrid[y * width + x]);
    }
    grid2D.push(row);
  }
  
  // 5. 整理最终的色彩清单数据
  const beadCounts = Object.values(beadHistogram)
    .sort((a, b) => b.count - a.count)
    .map((item, index) => {
      // 顺便给每种颜色指定一个临摹专用的单字符符号 (比如 A, B, C... 数字 1, 2, 3... 符号 ★, ✦...)
      let symbol = String.fromCharCode(65 + (index % 26)); // A-Z 循环
      if (index >= 26) {
        symbol = String.fromCharCode(48 + (index - 26) % 10); // 0-9 循环
      }
      return {
        ...item.bead,
        count: item.count,
        symbol: symbol
      };
    });
    
  // 在 2D 网格上附加符号
  const symbolMap = {};
  beadCounts.forEach(bc => {
    symbolMap[bc.code] = bc.symbol;
  });
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid2D[y][x] !== null) {
        grid2D[y][x].symbol = symbolMap[grid2D[y][x].code];
      }
    }
  }
  
  return {
    grid: grid2D,
    beadCounts: beadCounts,
    width: width,
    height: height,
    totalBeads: finalGrid.filter(cell => cell !== null).length
  };
}

// 兼容性挂载全局对象，支持本地双击 file:/// 直接免服务完美运行！
window.processPixelData = processPixelData;
