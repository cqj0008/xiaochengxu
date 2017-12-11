// pages/sou/sou.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: true,
    movies: [],
    netToggle:true,
    inputValue:'',
    mobile:"",
   
  },
  getCache() {
    return new Promise((resolve, reject) => {
      //  app.wxapis.
      app.wxapis.getStorage('sousuo').then((storage_res) => {
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
    var url = "https://api.douban.com/v2/movie/in_theaters";
    var start = (this.data.nowPage - 1) * 20;



    // var url = "https://api.douban.com/v2/movie/top250";
    app.wxapis.getNetJson(url, { start: start }).then((res) => { //第二个参数为data:params
      wx.setStorage({
        key: 'sousuo', //设置存储的标头
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

  },
 
  chazhao:function (e){
    console.log(e)
    this.setData({
      inputValue: e.detail.value
    });
 
    // console.log(this.data.inputValue)
  },
  find:function () {
    var that = this;
    if (this.data.inputValue) {
      app.wxapis.loading(2000);
      var url = 'https://api.douban.com/v2/movie/search?q=' + this.data.inputValue;
      wx.request({
        url: url,
        data: '',
        header: {
          'content-type': 'json',
        },
        success: function (res) {
          console.log(res);
          that.setData({
            movies: res.data.subjects,

          });

        }
      });
    }
    // var inputValue = event.currentTarget.dataset.inputValue;
    // console.log(keyword);
    // console.log(e.currentTarget.dataset);
    // var tid = e.currentTarget.dataset.tid;
    // var arr1 = this.data. movies.filter(function (aaa) {
    //   return aaa.id == tid;
    // });
    // console.log(arr1)
    // let str = JSON.stringify(arr1);
    // wx.navigateTo({
    //   url: '../pingjia/pingjia?arr2=' + str,
    // })
    // var url = "https://api.douban.com/v2/movie/in_theaters";
   
  },
  content: function (e) {
   
    console.log(e.currentTarget.dataset);
    var tid = e.currentTarget.dataset.id;
    var arr1 = this.data.movies.filter(function (aaa) {
      return aaa.id == tid;
    });
    console.log(arr1);
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
                  url: '../bbb/bbb?arr1=' + str,
                })
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          })

        } else {
         
          wx.navigateTo({
            url: '../bbb/bbb?arr1=' + str,
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
    var that = this;
    this.getCache().then((result) => { // 成功的回调函数,参数中是上一步的返回值
      if (!result) { // 判断本地缓存是否存在
        this.getNextDate();
      } else {
        console.log(this.data.inputValue)
        if (that.data.inputValue) {
          this.setData({ // 逻辑层改变视图层
            movies: result.filter((s) => {
              return s.title == that.data.inputValue
            })
            
          });
        } else {
          this.setData({ // 逻辑层改变视图层
            movies: result

          });
        }
       
        console.log(this.data.movies)
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