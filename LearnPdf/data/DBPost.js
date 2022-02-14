//普通的缓存类
var DBPost = function(){
  //缓存存储键值，构造函数里面增加一个变量
  this.storageKeyName = 'postList'
}

//prototype 构造函数原型链上增加一个对象，对象的属性和方法都被构造函数的实例继承
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