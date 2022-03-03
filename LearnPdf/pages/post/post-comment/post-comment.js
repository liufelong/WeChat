// pages/post/post-comment/post-comment.js

import data from "../../../data/data.js";
import{DBPost_ES6} from "../../../data/DBPost_ES6.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    useKeyBoardFlag:true,
    keyBoardInputValue:'',
    sendMoreMsgFlag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    console.log('评论详情接收到的id：' + postId);
    this.postId = postId;
    this.dbPost = new DBPost_ES6();
    var comments = this.dbPost.getCommentData(postId);
    
    this.setData({
      comments:comments
    });
    console.log(comments);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '评论详情',
    })
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

  },
  /**
   * 点击查看评论大图
   * */ 
  previewImg:function(event){
    var commentIdx = event.currentTarget.dataset.commentIdx,
        imgIdx = event.currentTarget.dataset.imgIdx,
        imgs = this.data.comments[commentIdx].content.img;
        wx.previewImage({
          urls: imgs,//图片地址数组，只能展示网络地址图片，不能展示本地的
          current:imgs[imgIdx] //当前展示的大图地址
        })
  },
  /**
   * 切换语音和键盘输入
   * */ 
  switchInputType:function(event) {
    this.setData({
      useKeyBoardFlag:!this.data.useKeyBoardFlag
    });
  },
  /**
   * 评论文本输入的bindinput事件
   * */ 
  bindCommentInput:function(event){
    var val = event.detail.value;
    console.log(val);
    this.data.keyboardInputValue = val;
    //用来屏蔽文字
    return val.replace(/qq/g,'*');
  },
  /**
   * 提交评论
   * */ 
  submitComment:function(){

    var newData = {
      username:'青石',
      avater:'/images/avatar/avatar-3.png',
      //评论时间
      create_time:new Date().getTime() / 1000,
      content:{
        txt:this.data.keyboardInputValue,
        }
    };

    if (!newData.content.txt) {
      //评论文字验空
      return
    }
    //缓存评论
    this.dbPost.newComment(this.postId,newData);
    //重新绑定数据
    this.bindCommentData();
    //清空输入文本
    this.resetAllDefaultStatus();
    //弹出成功提示
    this.showCommintSuccesToast();
  },

  /**
   * 重新绑定页面数据  刷新
   * */ 
  bindCommentData:function(){
    var comments = this.dbPost.getCommentData(this.postId);
    this.setData({
      comments:comments
    });
  },

  /**
   * 清空输入的内容
   * */ 
  resetAllDefaultStatus:function(){
    this.setData({
      keyBoardInputValue:''
    });
  },

  /**
   * 提交评论成功的提示
   * */ 
  showCommintSuccesToast:function(){
    wx.showToast({
      title: '评论成',
      icon: 'success',
      duration: 1000,
      mask: true
    })
  }
})