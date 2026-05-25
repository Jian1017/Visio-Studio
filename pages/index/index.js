const app = getApp();

Page({
  data: {
    statusBarHeight: 20,
    navBarHeight: 44,
  },

  onLoad() {
    this.setData({
      statusBarHeight: app.globalData.statusBarHeight,
      navBarHeight: app.globalData.navBarHeight
    });
  },

  /**
   * 跳转至图片像素化转换器
   */
  goToConverter() {
    wx.navigateTo({
      url: '/pages/converter/converter',
      fail(err) {
        console.error("跳转失败", err);
      }
    });
  },

  /**
   * 跳转至色卡字典页
   */
  goToDictionary() {
    wx.navigateTo({
      url: '/pages/dictionary/dictionary',
      fail(err) {
        console.error("跳转失败", err);
      }
    });
  },

  /**
   * 分享设置
   */
  onShareAppMessage() {
    return {
      title: 'Visio Studio 拼豆工坊 - 智能拼豆临摹助手',
      path: '/pages/index/index',
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400&auto=format&fit=crop'
    };
  }
});
