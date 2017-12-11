// pages/page3/page3.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlName: '',
    movies: [],
    nowPage: 1,
    total: 0,
    netToggle: "none",
    arr1: {},
    arr: [{
      url: "../../images/p2502474177.jpg",

    }, {
      url: "../../images/p2502474177.jpg",

    }]
  },
  getCache() {
    return new Promise((resolve, reject) => {
      //  app.wxapis.
      app.wxapis.getStorage('list_data' + this.data.urlName).then((storage_res) => {
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

    // var url = "../../new_file"
    var url = "https://api.douban.com/v2/movie/" + this.data.urlName;
    var start = (this.data.nowPage - 1) * 10;



    // var url = "https://api.douban.com/v2/movie/top250";
    app.wxapis.getNetJson(url, { count: 10, start: start }).then((res) => { //第二个参数为data:params
      wx.setStorage({
        key: 'list_data' + this.data.urlName, //设置存储的标头
        data: { // 存储数据,过期时间的设置
          // movies: res.data.subjects,
          movies: this.data.movies.concat(res.data.subjects),
          total: res.data.total,
          expires: Date.now() + 1000 * 3600 * 24
        },
      });
      this.setData({
        movies: this.data.movies.concat(res.data.subjects),
        total: res.data.total
      });
    }).catch(function (err) {
      console.log(err);
    })

    // Promise.all(promises).then((infos) => {
    //   // console.log(infos);
    //   wx.setStorage({
    //     key: 'board_data', //设置存储的标头
    //     data: { // 存储数据,过期时间的设置
    //       movie: this.data.movie.concat(res.data.subjects),
    //       expires: Date.now() + 1000 * 3600 * 24
    //     },
    //   });
    //   this.setData({
    //     movie: res.data.subjects
    //   });
    // }).catch(function (err) {

    //   console.log(err);
    // })


  },
  content: function (e) {
    console.log(e.currentTarget.dataset);
    var arr1 = e.currentTarget.dataset;
    let str = JSON.stringify(arr1);
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType;
        if (networkType != "wifi") {
          wx.showModal({
            title: '温馨提示',
            content: '你当前的网络状态不在wifi,会产生流量费用',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
                wx.navigateTo({
                  url: '../comtent/comtent?arr1=' + str,
                })
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          })

        } else {
          wx.navigateTo({
            url: '../comtent/comtent?arr1=' + str,
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.wxapis.loading(2000);
    console.log(options.requesturl)
    this.setData({
      urlName: options.requesturl
    });
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
    this.setData({
      nowPage: ++this.data.nowPage
    });
    this.getNextDate();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log(555555555555);
    // var that = this;
    // this.getNextDate();
    this.setData({
      nowPage: ++this.data.nowPage
    });
    var end = this.data.nowPage * 10;
    if (this.data.netToggle) {
      this.getNextDate();
      wx.showLoading({
        title: '加载中',
      });

      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    };

    if (end >= this.data.total) {
      console.log(end)
      // this.data.netToggle = false;
      this.setData({
        netToggle: "block"
      });
    
    };
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})