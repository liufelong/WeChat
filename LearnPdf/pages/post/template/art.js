// pages/post/template/art.js

// var dataObj = require('../../../data/data.js');
//直接引用js数据
var dataObj = require("../../../data/data.js");

//使用缓存类
var DBPost = require('../../../data/DBPost.js').DBPost;

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
    //直接引用js数据
    // this.setData({
    //   postList:dataObj.postList
    // })

    //使用缓存类
    var dbPost = new DBPost();
    this.setData({
      postList:dbPost.getAllPostData()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})