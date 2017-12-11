//searchMovies.js
var util = require('../../utils/util.js')
Page({
  data: {
searchMovies:[]
  },
  onLoad: function () {

  },
  searchMovies: function (event) {
    var that = this;
    var keyword = event.currentTarget.dataset.keyword;
    console.log(keyword);
    // var url = "https://api.douban.com/v2/movie/in_theaters";
    var url = 'https://api.douban.com/v2/movie/search?q=' + keyword;
    wx.request({
      url: url,
      data: '',
      header: {
        'content-type': 'json',
      },
      success: function (res) {
        console.log(res);
        that.setData({
          searchMovies: res.data.subjects
        });
      }
    });
  },
  keyword: function (event) {
    var keyword = event.detail.value;/**获取input输入的值并设置到搜索值 */
    this.setData({
      keyword: keyword
    });
  },
  toDetail: function (event) {
    console.log(event.currentTarget.id);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.id,
    });
  }
})