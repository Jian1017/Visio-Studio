App({
  onLaunch() {
    // 获取胶囊按钮和系统信息，计算完美的自定义状态栏与导航栏高度
    try {
      const systemInfo = wx.getSystemInfoSync();
      const menuButtonInfo = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
      
      let statusBarHeight = systemInfo.statusBarHeight || 20;
      let navBarHeight = 44; // 默认导航栏高度
      
      if (menuButtonInfo) {
        // 导航栏高度计算公式：(胶囊顶部距离 - 状态栏高度) * 2 + 胶囊高度
        navBarHeight = (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height;
      }
      
      this.globalData.statusBarHeight = statusBarHeight;
      this.globalData.navBarHeight = navBarHeight;
      this.globalData.menuButtonInfo = menuButtonInfo;
      this.globalData.systemInfo = systemInfo;
    } catch (e) {
      console.error("初始化系统参数失败", e);
    }
  },
  globalData: {
    statusBarHeight: 20,
    navBarHeight: 44,
    menuButtonInfo: null,
    systemInfo: null,
    // 用于页面间共享当前生成的图纸详情
    activePattern: null
  }
})
