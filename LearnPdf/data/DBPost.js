//普通的缓存类
var DBPost = function(){
  //缓存存储键值，构造函数里面增加一个变量
  this.storageKeyName = 'postList'
}

DBPost.prototype = {

  //获取全量的文章信息
  getAllPostData:function(){
    var res = wx.getStorageSync(this.storageKeyName);
    if(!res) {
      res = require('../data/data.js').postList;
      this.exceSetStorageSync(res)
    }
    return res;
  },

  //缓存文章信息
  exceSetStorageSync:function(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }
};

module.exports={
  DBPost:DBPost
}