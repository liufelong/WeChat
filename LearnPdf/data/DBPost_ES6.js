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
    console.log('获取的文章Id = ' + postId);
    for(var i = 0; i < len; i++){
      if(postData[i].postId == postId) {
        return {
          index:i,
          data:postData[i]
        }
      }
    }
  }

  collect(postId){
    return this.updataPostData(postId,1);
  }

  //更新本地缓存，传入id及操作类型 点赞 收藏 评论
  updataPostData(postId,stats) {
    var post = this.getPostItemById(postId);
    var itemPost = post.data;
    var allPostData = this.getAllPostData();
    switch(stats){
      case 1:
        //处理收藏
        if (itemPost.collectStatus) {
          itemPost.collectStatus = false;
          itemPost.collectionNum --;
        }else {
          itemPost.collectStatus = true;
          itemPost.collectionNum ++;
        }
        break;
        default:
          break;
    }
    allPostData[itemPost.index] = itemPost;
    this.execSetStorageSync(allPostData);
    return itemPost;
  }

  execSetStorageSync(data){
    wx.setStorageSync(this.storageKeyName, data);
  }
}

export{DBPost_ES6}
