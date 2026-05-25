/**
 * Visio Studio 拼豆工坊 Web版 - 拼豆色卡数据库与感知配色算法 (ES Module)
 */

// Artkal C系列 2.6mm 软豆 核心色卡数据库
const ARTKAL_C_COLORS = [
  // 基础单色 / 黑白灰
  { code: 'C01', name: '白色', enName: 'White', hex: '#FFFFFF', rgb: [255, 255, 255], category: 'monochrome' },
  { code: 'C02', name: '黑色', enName: 'Black', hex: '#111111', rgb: [17, 17, 17], category: 'monochrome' },
  { code: 'C19', name: '浅灰', enName: 'Light Grey', hex: '#B2BABB', rgb: [178, 186, 187], category: 'monochrome' },
  { code: 'C12', name: '中灰', enName: 'Grey', hex: '#7F8C8D', rgb: [127, 140, 141], category: 'monochrome' },
  { code: 'C20', name: '深灰', enName: 'Dark Grey', hex: '#424949', rgb: [66, 73, 73], category: 'monochrome' },
  { code: 'C68', name: '极深灰', enName: 'Slate Grey', hex: '#2C3E50', rgb: [44, 62, 80], category: 'monochrome' },

  // 红色 / 粉色系 (Furry 设定常用：耳朵内侧、肉垫、舌头、腮红)
  { code: 'C03', name: '大红', enName: 'Red', hex: '#C0392B', rgb: [192, 57, 43], category: 'red' },
  { code: 'C16', name: '西瓜红', enName: 'Watermelon Red', hex: '#E74C3C', rgb: [231, 76, 60], category: 'red' },
  { code: 'C33', name: '暗红', enName: 'Dark Red', hex: '#7B241C', rgb: [123, 36, 28], category: 'red' },
  { code: 'C04', name: '柔粉', enName: 'Pastel Pink', hex: '#F5B7B1', rgb: [245, 183, 177], category: 'pink' },
  { code: 'C24', name: '艳粉', enName: 'Hot Pink', hex: '#F48FB1', rgb: [244, 143, 177], category: 'pink' },
  { code: 'C52', name: '芭比粉', enName: 'Barbie Pink', hex: '#FF4081', rgb: [255, 64, 129], category: 'pink' },
  { code: 'C77', name: '樱花粉', enName: 'Sakura Pink', hex: '#FDEDEC', rgb: [253, 237, 236], category: 'pink' },

  // 橙色 / 黄色系 (Furry 设定常用：金毛、狐狸、猫科眼眸)
  { code: 'C05', name: '橙色', enName: 'Orange', hex: '#E67E22', rgb: [230, 126, 34], category: 'orange' },
  { code: 'C22', name: '橘红', enName: 'Mandarin Orange', hex: '#CA6F1E', rgb: [202, 111, 30], category: 'orange' },
  { code: 'C06', name: '亮黄', enName: 'Yellow', hex: '#F1C40F', rgb: [241, 196, 15], category: 'yellow' },
  { code: 'C14', name: '淡黄', enName: 'Cream Yellow', hex: '#F9E79F', rgb: [249, 231, 159], category: 'yellow' },
  { code: 'C15', name: '柠檬黄', enName: 'Lemon Yellow', hex: '#F7DC6F', rgb: [247, 220, 111], category: 'yellow' },
  { code: 'C45', name: '金黄', enName: 'Gold', hex: '#D4AC0D', rgb: [212, 172, 13], category: 'yellow' },

  // 绿色系
  { code: 'C07', name: '深绿', enName: 'Dark Green', hex: '#1B5E20', rgb: [27, 94, 32], category: 'green' },
  { code: 'C13', name: '草绿', enName: 'Grass Green', hex: '#4CAF50', rgb: [76, 175, 80], category: 'green' },
  { code: 'C28', name: '薄荷绿', enName: 'Mint Green', hex: '#A9DFBF', rgb: [169, 223, 191], category: 'green' },
  { code: 'C37', name: '荧光绿', enName: 'Neon Green', hex: '#69F0AE', rgb: [105, 240, 174], category: 'green' },
  { code: 'C58', name: '军绿', enName: 'Olive Green', hex: '#556B2F', rgb: [85, 107, 47], category: 'green' },

  // 蓝色系 (Furry 设定常用：哈士奇眼睛、水系兽设)
  { code: 'C09', name: '宝蓝', enName: 'Dark Blue', hex: '#0D47A1', rgb: [13, 71, 161], category: 'blue' },
  { code: 'C17', name: '天蓝', enName: 'Sky Blue', hex: '#2196F3', rgb: [33, 150, 243], category: 'blue' },
  { code: 'C08', name: '浅天蓝', enName: 'Pastel Blue', hex: '#90CAF9', rgb: [144, 202, 249], category: 'blue' },
  { code: 'C27', name: '冰蓝', enName: 'Ice Blue', hex: '#E3F2FD', rgb: [227, 242, 253], category: 'blue' },
  { code: 'C49', name: '湖蓝', enName: 'Cyan', hex: '#00BCD4', rgb: [0, 188, 212], category: 'blue' },
  { code: 'C66', name: '藏青', enName: 'Navy Blue', hex: '#1A237E', rgb: [26, 35, 126], category: 'blue' },

  // 紫色系
  { code: 'C10', name: '罗兰紫', enName: 'Purple', hex: '#4A148C', rgb: [74, 20, 140], category: 'purple' },
  { code: 'C26', name: '丁香紫', enName: 'Lavender', hex: '#9C27B0', rgb: [156, 39, 176], category: 'purple' },
  { code: 'C36', name: '浅紫', enName: 'Pastel Violet', hex: '#E1BEE7', rgb: [225, 190, 231], category: 'purple' },
  { code: 'C63', name: '暗紫', enName: 'Grape Purple', hex: '#311B92', rgb: [49, 27, 146], category: 'purple' },

  // 棕色 / 大地色系 (Furry 兽设最核心色彩：熊、狼、狗、鹿的毛色)
  { code: 'C11', name: '咖啡色', enName: 'Brown', hex: '#5D4037', rgb: [93, 64, 55], category: 'brown' },
  { code: 'C21', name: '焦糖色', enName: 'Caramel', hex: '#8D6E63', rgb: [141, 110, 99], category: 'brown' },
  { code: 'C23', name: '土黄', enName: 'Ochre', hex: '#BCAAA4', rgb: [188, 170, 164], category: 'brown' },
  { code: 'C31', name: '红棕', enName: 'Red Brown', hex: '#4E342E', rgb: [78, 52, 46], category: 'brown' },
  { code: 'C41', name: '沙滩黄', enName: 'Sand', hex: '#D7CCC8', rgb: [215, 204, 200], category: 'brown' },
  { code: 'C59', name: '奶茶色', enName: 'Beige', hex: '#E5D3B3', rgb: [229, 211, 179], category: 'brown' },
  { code: 'C60', name: '黑巧克力', enName: 'Dark Chocolate', hex: '#3E2723', rgb: [62, 39, 35], category: 'brown' },

  // 荧光与特殊色彩系
  { code: 'C18', name: '青绿', enName: 'Teal', hex: '#008080', rgb: [0, 128, 128], category: 'teal' },
  { code: 'C30', name: '翡翠绿', enName: 'Jade', hex: '#00A86B', rgb: [0, 168, 107], category: 'green' },
  { code: 'C42', name: '珊瑚粉', enName: 'Coral Pink', hex: '#F08080', rgb: [240, 128, 128], category: 'pink' },
  { code: 'C50', name: '极光绿', enName: 'Aurora Teal', hex: '#20B2AA', rgb: [32, 178, 170], category: 'teal' },
  { code: 'C55', name: '亮肉色', enName: 'Peach Cream', hex: '#FFD1A9', rgb: [255, 209, 169], category: 'brown' }
];

// 分类名称映射表 (用于在色卡字典中分类显示)
const CATEGORY_MAP = {
  'all': '全部',
  'monochrome': '黑白灰',
  'red': '红色',
  'pink': '粉色',
  'orange': '橙色',
  'yellow': '黄色',
  'green': '绿色',
  'blue': '蓝色',
  'purple': '紫色',
  'brown': '棕褐/毛色',
  'teal': '青/荧光'
};

/**
 * redmean 算法 - 一种极高精度且快速的感知色彩距离算法
 * 相比纯 RGB 欧氏距离，它更能体现人类肉眼对红绿蓝三色明度变化的敏感度
 */
function getPerceptualDistance(rgb1, rgb2) {
  const r1 = rgb1[0], g1 = rgb1[1], b1 = rgb1[2];
  const r2 = rgb2[0], g2 = rgb2[1], b2 = rgb2[2];
  
  const rMean = (r1 + r2) / 2;
  const deltaR = r1 - r2;
  const deltaG = g1 - g2;
  const deltaB = b1 - b2;
  
  // redmean 权重加成公式
  const weightR = 2 + rMean / 256;
  const weightG = 4;
  const weightB = 2 + (255 - rMean) / 256;
  
  return Math.sqrt(
    weightR * deltaR * deltaR +
    weightG * deltaG * deltaG +
    weightB * deltaB * deltaB
  );
}

/**
 * 将给定的 RGB 颜色匹配到 Artkal 色卡数据库中最接近的颜色
 * @param {Array} rgb - 目标 RGB 颜色 [R, G, B]
 * @returns {Object} 匹配到的色卡数据对象
 */
function matchBeadColor(rgb) {
  let minDistance = Infinity;
  let bestMatch = ARTKAL_C_COLORS[0];
  
  for (let i = 0; i < ARTKAL_C_COLORS.length; i++) {
    const bead = ARTKAL_C_COLORS[i];
    const dist = getPerceptualDistance(rgb, bead.rgb);
    if (dist < minDistance) {
      minDistance = dist;
      bestMatch = bead;
    }
  }
  
  return bestMatch;
}

/**
 * 辅助函数：十六进制 Hex 转 RGB
 */
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0];
}

/**
 * 辅助函数：RGB 转 十六进制 Hex
 */
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// 兼容性挂载至 window 全局对象，支持本地双击 file:/// 直接免服务完美运行！
window.ARTKAL_C_COLORS = ARTKAL_C_COLORS;
window.CATEGORY_MAP = CATEGORY_MAP;
window.getPerceptualDistance = getPerceptualDistance;
window.matchBeadColor = matchBeadColor;
window.hexToRgb = hexToRgb;
window.rgbToHex = rgbToHex;
