// pages/deta/deta.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    toView: 'red',
    scrollTop: 100,
    isshow:false,
    all_info: [{
      title: "",
      requestUrl: "in_theaters"
    }, {
      title: "即将上映的电影-北京",
      requestUrl: "in_theaters"
    }, {
        title: "正在热映的电影",
      requestUrl: "coming_soon"
    }, {
      title: "top250",
      requestUrl: "top250"
    }],
  },
  getCache() {
    return new Promise((resolve, reject) => {
      //  app.wxapis.
      app.wxapis.getStorage('board_data').then((storage_res) => {
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
  //  var promises = this.aaa;
    var promises = this.data.all_info.map(function (info) {
      // var url = "../../new_file"
      var url = "https://api.douban.com/v2/movie/" + info.requestUrl;
      return app.wxapis.getNetJson(url, { count: 10 }).then((res) => {
        info.movies = res.data.subjects;
        return info;

      });
      // var url = "https://api.douban.com/v2/movie/top250";
      // app.wxapis.getNetJson(url, { count: 10 }).then(function (res) { //第二个参数为data:params
      //   wx.setStorage({
      //     key: 'inedx_data', //设置存储的标头
      //     data: { // 存储数据,过期时间的设置
      //       movies: res.data.subjects,
      //       expires: Date.now() + 1000 * 3600 * 24
      //     },
      //   });
      //   this.setData({
      //     movies: res.data.subjects
      //   });
      // }).catch(function (err) {
      //   console.log(err);
      // })
    });
    Promise.all(promises).then( (infos) => {
      console.log(infos);
      wx.setStorage({
        key: 'board_data', //设置存储的标头
        data: { // 存储数据,过期时间的设置
          all_info: infos,
          expires: Date.now() + 1000 * 3600 * 24
        },
      });
      this.setData({
        all_info: infos,
        isshow: true
      });
      
    })
    // .catch(function (err) {
    //   console.log(err);
    // })

 
  },
  detail: function (e) {
    console.log(e.currentTarget.dataset.ss);
    var ss = e.currentTarget.dataset.ss;
    wx.navigateTo({
      url: '../detail/detail?requesturl=' + ss,
    })
  },

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  app.wxapis.loading(2000);
  this.getCache().then((result) => { // 成功的回调函数,参数中是上一步的返回值
    if (!result) { // 判断本地缓存是否存在
      this.getNextDate();
    } else {
      this.setData({ // 逻辑层改变视图层
        movies: result,
        isshow:true
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
  this.getNextDate();
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