// pages/shouye/shouye.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    toView: 'red',
    scrollTop: 100,
    shouYeUrls: [
      '../../images/u=1483397992,2152186760&fm=27&gp=0.jpg',
      '../../images/u=2790070855,2906005125&fm=15&gp=0.jpg',
      '../../images/u=4080764404,2435276247&fm=15&gp=0.jpg'

    ],
    tuPainUrl: [{
      url:"../../images/u=3306828783,41182264&fm=27&gp=0.jpg",
      name:"密战",
      id:1
    },
      {
        url: "../../images/u=3306828783,41182264&fm=27&gp=0.jpg",
        name: "密战",
        id: 1
      },
      {
        url: "../../images/u=3306828783,41182264&fm=27&gp=0.jpg",
        name: "密战",
        id: 1
      },
      {
        url: "../../images/u=3306828783,41182264&fm=27&gp=0.jpg",
        name: "密战",
        id: 1
      },
      {
        url: "../../images/u=3306828783,41182264&fm=27&gp=0.jpg",
        name: "密战",
        id: 1
      },
      {
        url: "../../images/u=3228273538,3408730480&fm=27&gp=0.jpg",
        name: "密战",
        id: 1
      }
      
    ],
    
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  // _getStorage(key) {
  //   return new Promise(function (resolve, reject) {
  //     wx.getStorage({
  //       key: 'key',
  //       success: resolve,
  //       fail: reject
  //     });
  //   });
  // },

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
  // getCache() { // 设置缓存
  //   // var that = this;
  //   wx.getStorage({
  //     key: 'inedx_data', // 查询有没有这个标题存储的信息
  //     success: (res) => {  // 成功的
  //       if (res.data.expires < Date.now()) { // 判断过期时间和当前时间的比较
  //         console.log('时间过期了')
  //       } else { // 没有过期,赋值给一个变量
  //         var movie = res.data.movies;
  //         this.setData({ // 逻辑改变视图
  //           movies: movie
  //         });
  //       }
  //     },
  //     fail: (err) => { //没有标题的
  //       this.getNextDate();
  //     }
  //   })
  // },
  // 网络请求数据
  getNextDate() {  // 网络请求数据
    // wx.request({
    //   // https://api.douban.com/v2/movie/top250
    //   url:'', //先请求一次再关闭
    //   data: {
    //     count: 2
    //   },
    //   header: {
    //     'content-type': 'json'
    //   },
    // success: function (res) {
    console.log(8888);
    wx.setStorage({

      key: 'inedx_data', //设置存储的标头
      data: { // 存储数据,过期时间的设置
        movies: [2, 5, 6],
        expires: Date.now() + 1000 * 3600 * 24
      },
    });
    this.setData({
      movies: [2, 5, 6]
    });
    // },
    //   fail: function (err) {
    //     console.log(555555555)
    //   }
    // });
  }, // /v2/movie/in_theaters   /v2/movie/coming_soon
  // getNextDate() { // 在app中已经封装好

  //   var url = "https://api.douban.com/v2/movie/top250";
  //   app.wxapis.getNetJson(url, { count: 10 }).then(function (res) { //第二个参数为data:params
  //     wx.setStorage({
  //       key: 'inedx_data', //设置存储的标头
  //       data: { // 存储数据,过期时间的设置
  //         movies: res.data.subjects,
  //         expires: Date.now() + 1000 * 3600 * 24
  //       },
  //     });
  //     this.setData({
  //       movies: res.data.subjects
  //     });
  //   }).catch(function (err) {
  //     console.log(err);
  //   })
  // },
  // 中间部分的滚动图
  // tap: function (e) {
  //   for (var i = 0; i < order.length; ++i) {
  //     if (order[i] === this.data.toView) {
  //       this.setData({
  //         toView: order[i + 1]
  //       })
  //       break
  //     }
  //   }
  // },
  // tapMove: function (e) {
  //   this.setData({
  //     scrollTop: this.data.scrollTop + 10
  //   })
  // },
  detail: function (e) {
    console.log(e.currentTarget.dataset.tid);
    // var tid = e.currentTarget.dataset.tid;
    wx.navigateTo({
      url: '../detail/detail?',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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