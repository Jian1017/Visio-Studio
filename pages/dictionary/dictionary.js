const app = getApp();
const { ARTKAL_C_COLORS, CATEGORY_MAP } = require('../../utils/colors.js');

Page({
  data: {
    statusBarHeight: 20,
    navBarHeight: 44,
    searchQuery: '',
    activeCategory: 'all',
    categories: [],
    colors: [],
    filteredColors: []
  },

  onLoad() {
    // 1. 初始化系统导航栏高度
    this.setData({
      statusBarHeight: app.globalData.statusBarHeight,
      navBarHeight: app.globalData.navBarHeight
    });

    // 2. 载入分类数据
    const categoryList = Object.keys(CATEGORY_MAP).map(key => ({
      id: key,
      name: CATEGORY_MAP[key]
    }));

    // 3. 载入原始色卡
    this.setData({
      categories: categoryList,
      colors: ARTKAL_C_COLORS,
      filteredColors: ARTKAL_C_COLORS
    });
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
   * 切换分类过滤
   */
  selectCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({
      activeCategory: categoryId
    }, () => {
      this.filterColors();
    });
  },

  /**
   * 搜索框输入事件
   */
  onSearchInput(e) {
    const query = e.detail.value;
    this.setData({
      searchQuery: query
    }, () => {
      this.filterColors();
    });
  },

  /**
   * 清空搜索内容
   */
  clearSearch() {
    this.setData({
      searchQuery: ''
    }, () => {
      this.filterColors();
    });
  },

  /**
   * 色彩综合过滤器 (基于分类 + 搜索关键词)
   */
  filterColors() {
    const { colors, activeCategory, searchQuery } = this.data;
    
    let result = colors;

    // 1. 按分类过滤
    if (activeCategory !== 'all') {
      result = result.filter(color => color.category === activeCategory);
    }

    // 2. 按关键词过滤 (支持色号、中文名、英文名模糊匹配，不区分大小写)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(color => 
        color.code.toLowerCase().includes(q) ||
        color.name.toLowerCase().includes(q) ||
        color.enName.toLowerCase().includes(q) ||
        color.hex.toLowerCase().includes(q)
      );
    }

    this.setData({
      filteredColors: result
    });
  },

  /**
   * 点击复制色号和色值
   */
  copyColorCode(e) {
    const color = e.currentTarget.dataset.color;
    const textToCopy = `Artkal 2.6mm C系列 - 色号: ${color.code}, 品名: ${color.name}, Hex: ${color.hex}`;
    
    wx.setClipboardData({
      data: textToCopy,
      success() {
        wx.showToast({
          title: `${color.code} 已复制`,
          icon: 'success',
          duration: 1500
        });
      }
    });
  }
});
