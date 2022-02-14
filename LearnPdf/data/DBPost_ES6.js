//使用ES6写缓存类
class DBPost_ES6 {
  constructor(url){
    this.storageKeyName = 'postList';
  }

  //获取全量的缓存文章
  getAllPostData(){
    var res = wx.getStorageSync(this.storageKeyName);
    if(!res){
      res = require('../data/data.js').postList;
      // this.initPostList(res); pdf-错误代码
      this.execSetStorageSync(res);
    }
    return res;
  }
  execSetStorageSync(data){
    wx.setStorageSync(this.storageKeyName, data);
  }
}

export{DBPost_ES6}
