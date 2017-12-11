// pages/home1/home1.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeigh:0,
    windowWidth:0,
    movies:[],
    imgUrls: [
      '../../images/u=1069004421,3278853244&fm=27&gp=0.jpg',
      '../../images/u=1594744378,321897086&fm=27&gp=0.jpg',
      '../../images/u=3238653276,3437896681&fm=27&gp=0.jpg'
    ]
  },
  getCache() {
    return new Promise((resolve, reject) => {
      //  app.wxapis.
      app.wxapis.getStorage('inedx_data').then((storage_res) => {
        if (storage_res.data.expires < Date.now()) { // 判断设置的过期时间与当前时间的比较
          return resolve(null); // return 代表退出程序,resolve是返回数值
        } else {
          return resolve(storage_res.data.movies); // 存在,返回数值
        }
      }).catch(function (err) { // 所有的错误都能检测到,属于链式操作
        return resolve(null);
      });
    });

  },

  getNextDate() { // 在app中已经封装好

    var url = "https://api.douban.com/v2/movie/in_theaters";
    app.wxapis.getNetJson(url, { count: 3 }).then( (res) => { //第二个参数为data:params
      wx.setStorage({
        key: 'inedx_data', //设置存储的标头
        data: { // 存储数据,过期时间的设置
          movies: res.data.subjects,
          expires: Date.now() + 1000 * 3600 * 24
        },
      });
      this.setData({
        movies: res.data.subjects
      });
    }).catch(function (err) {
      console.log(err);
    })
  },
  shouye:function (){
    console.log(55555555555);
  
    wx.switchTab({
      url: '../deta/deta',
    })
  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.wxapis.loading(2000);
    var res = wx.getSystemInfoSync();
    var windowHeight = res.windowHeight;
    var windowWidth = res.windowWidth;
    console.log(windowWidth)
    this.getCache().then((result) => { // 成功的回调函数,参数中是上一步的返回值
      if (!result) { // 判断本地缓存是否存在
        this.getNextDate();
      } else {
        this.setData({ // 逻辑层改变视图层
          movies: result
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})