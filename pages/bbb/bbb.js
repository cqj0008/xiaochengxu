// pages/bbb/bbb.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  id:'',
  comtent:[],
  inputValue:''

  },
  // getNextDate() { // 在app中已经封装好
  //   //  var promises = this.aaa;

  //   // var url = "../../new_file"
  //   var url = "https://api.douban.com/v2/movie/search?";
  //   console.log(url)
  //   // var id = this.data.id;
  //   // console.log(id)

  //   // var url = "https://api.douban.com/v2/movie/top250";
  //   app.wxapis.getNetJson(url, { id: this.data.id }).then((res) => {
  //     console.log(res) //第二个参数为data:params
  //     //  var  comtent = res.data.subjects;
  //     // wx.setStorage({
  //     //   key: 'comment' + this.data.ss, //设置存储的标头
  //     //   data: { // 存储数据,过期时间的设置
  //     //     comtent: res.data.subjects,

  //     //     expires: Date.now() + 1000 * 3600 * 24
  //     //   },
  //     // });
  //     // var arr6 = this.data.comtent;
  //     // console.log(arr6)
  //     // var comtents = this.data.comtent.filter(function (s) {
  //     //   return s.id == this.data.id;
  //     // });
  //     // console.log(comtents)
  //     this.setData({
  //       comtent: res.data.subjects.filter((s) => {
  //         return s.id == this.data.id;
  //       }),

  //     });
  //   }).catch(function (err) {
  //     console.log(err);
  //   })

  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.wxapis.loading(2000);
    let item = JSON.parse(options.arr1);
    console.log(item)
    this.setData({
      comtent:item
      
    });
    // this.getNextDate();
  
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