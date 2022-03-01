
var util = require('../util/util.js');

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
  //通过id获取对应文章的评论内容
  getCommentData(postId) {
    var postData = this.getPostItemById(postId).data;
    postData.comments.sort(this.compareWithTime);
    var len = postData.comments.length,
        comment;
    for (var i = 0; i < len; i++) {
      comment = postData.comments[i];
      comment.create_time = util.getDiffTime(comment.create_time,true);
    }
    return postData.comments;
  }
  //评论时间排序
  compareWithTime(value1,value2){
    var flag = parseFloat(value1.create_time) - parseFloat(value2.create_time);
    if (flag < 0) {
      return 1;
    }else if (flag > 0) {
      return -1;
    } else {
      return 0;
    }
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
  //收藏
  collect(postId){
    return this.updataPostData(postId,'collect');
  }

  //点赞
  upAction(postId){
    return this.updataPostData(postId,'up');
  }

  //更新本地缓存，传入id及操作类型 点赞 收藏 评论
  updataPostData(postId,stats) {
    var post = this.getPostItemById(postId);
    var itemPost = post.data;
    var allPostData = this.getAllPostData();
    switch(stats){
      case 'collect':
        //处理收藏
        if (itemPost.collectStatus) {
          itemPost.collectStatus = false;
          itemPost.collectionNum --;
        }else {
          itemPost.collectStatus = true;
          itemPost.collectionNum ++;
        }
        break;
        case 'up':
          if (itemPost.upStatus) {
            itemPost.upStatus = false;
            itemPost.upNum --;
          }else {
            itemPost.upStatus = true;
            itemPost.upNum ++;
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
