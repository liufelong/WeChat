// pages/movie/movie.js
var app = getApp();
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
    var url = app.globalData.baseUrl + "list"

    this.getMovieList();
  },

  getMovieList:function(){
    var that = this;
    
    wx.request({
      url: "http://127.0.0.1:8080/list",
      method:"POST",
      header:{
        "content-type":"application/json"
      },
      data:{
        "listType":"hostMovie"
      },
      success:function(res){
        console.log("请求成功");
        console.log(res.data)
        that.setData({
          "inTheaters":{
            "categoryTitle":"正在热映",
            "movies":res.data.inTheaters
          },
          "commingSoon":{
            "categoryTitle":"即将上映",
            "movies":res.data.commingSoon
          },
          "top250":{
            "categoryTitle":"top250",
            "movies":res.data.top250
          }
        });
      },
      fail:function(error){
        console.log(error);
      }
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