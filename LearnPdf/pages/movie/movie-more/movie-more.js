// pages/movie/movie-more/movie-more.js
var util = require('../../../util/util.js');
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
    var catergroy = options.catergory;
    var listType = "";
    switch (catergroy) {
      case "正在热映":
        listType = "hostMovie"
        break;
      case "即将上映":
        listType = "commingSoon"
        break;
      case "top250":
        listType = "top250"
        break;
      default:
        break;
    }
    this.setData({
      title:catergroy
    });
    this.requestData(listType);
  },
  requestData: function(listType){
    var data = {"listType":listType};
    util.httpPostRequest("more",data,this.createShowData);
  },
  createShowData:function (movies){
    this.setData({
      movies:movies
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: that.data.title,
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

  }
})