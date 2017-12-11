// pages/page3/page3.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlName: '',
    movies: [2, 4, 5, 6],
    nowPage: 1,
    total:0,
    netToggle:true
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
    // var url = "https://api.douban.com/v2/movie/" + this.data.urlName;
    var start = (this.data.nowPage - 1) * 20;



    // var url = "https://api.douban.com/v2/movie/top250";
    app.wxapis.getNetJson(url, { count: 20 }).then(function (res) { //第二个参数为data:params
      wx.setStorage({
        key: 'list_data' + this.data.urlName, //设置存储的标头
        data: { // 存储数据,过期时间的设置
          movies: res.data.subjects,
          total:res.data.total,
          expires: Date.now() + 1000 * 3600 * 24
        },
      });
      this.setData({
        movies: res.data.subjects,
        total: res.data.total
      });
    }).catch(function (err) {
      console.log(err);
    })

    Promise.all(promises).then(function (infos) {
      console.log(infos);
      wx.setStorage({
        key: 'board_data', //设置存储的标头
        data: { // 存储数据,过期时间的设置
          movie: this.data.movie.concat(res.data.subjects),
          expires: Date.now() + 1000 * 3600 * 24
        },
      });
      this.setData({
        movie: res.data.subjects
      });
    })
      .catch(function (err) {
        this.getNextDate();
        console.log(err);
      })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      nowPage: ++this.data.nowPage
    });
    var end = this.data.nowPage * 20;
    if(this.data.netToggle){
      this.getNextDate();
    };
    if(end > this.data.total) {
      this.data.netToggle = false;
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})