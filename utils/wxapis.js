// // 封装Promise函数
function getStorage(key) {
  return new Promise(function (resolve, reject) { // 涉及到this问题时,用箭头函数
    wx.getStorage({ //本地保存
      key: key, // 标题
      success: resolve,
      fail: reject
    });
  });
};

function getNetJson(url, params) {
  return new Promise((resolve, reject) => {
    wx.request({  // 发起请求
      url: url,
      data: params,
      header: {
        'content-type': 'json' // 设置请求格式
      },
      success: resolve,
      fail: reject

    })
  }) ;

};

function loading (time) {
  wx.showLoading({
    title: '加载中',
  });
  setTimeout(function () {
    wx.hideLoading()
  }, time);
};

module.exports = { // 返回出去数据
  getStorage, // 属性名和属性值一致,可缩写
  getNetJson,
  loading
}