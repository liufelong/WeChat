//使用ES6写缓存类
class DBPost_ES6 {
  constructor(){
    this.storageKeyName = 'postList';
    // this.postId = postId;
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

  //使用有参数的方法获取文章
  getPostItemById(postId){
    var postData = this.getAllPostData();
    var len = postData.length;
    console.log("获取的文章数量="+len)
    for(var i = 0; i < len; i++){
      console.log("循环的文章id="+postData[i].postId)
      if(postData[i].postId == postId) {
        return {
          index:i,
          data:postData[i]
        }
      }
    }
  }

  execSetStorageSync(data){
    wx.setStorageSync(this.storageKeyName, data);
  }
}

export{DBPost_ES6}
