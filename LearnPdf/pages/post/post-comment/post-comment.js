// pages/post/post-comment/post-comment.js

import{DBPost_ES6} from "../../../data/DBPost_ES6.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    console.log('评论详情接收到的id：' + postId);
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
  }
})