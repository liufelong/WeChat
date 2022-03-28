// pages/movie/movie.js
var app = getApp();
var util = require('../../util/util.js');
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
    var data = {"listType":"hostMovie"};
    //将网络请求方法进行剥离
    util.httpPostRequest("list",data,this.createShowData);

    // wx.request({
    //   url: "http://127.0.0.1:8080/list",
    //   method:"POST",
    //   header:{
    //     "content-type":"application/json"
    //   },
    //   data:{
    //     "listType":"hostMovie"
    //   },
    //   success:function(res){
    //     console.log("请求成功");
    //     console.log(res.data)
    //     var arr = res.data;
    //     that.createShowData(res.data);
    //   },
    //   fail:function(error){
    //     console.log(error);
    //   }
    // })
  },
  createShowData:function(movies){
    var hot = movies[0];
    var other = movies[1];
    
    this.setData({
      "inTheaters":{
        "categoryTitle":"正在热映",
        "movies":hot
      },
      "commingSoon":{
        "categoryTitle":"即将上映",
        "movies":other
      },
      "top250":{
        "categoryTitle":"top250",
        "movies":other
      }
    });
  },

  //点击了更多
  onMoreTap:function(event){
    var catergory = event.currentTarget.dataset.category;
    console.log(catergory);
    wx.navigateTo({
      url: 'movie-more/movie-more?catergory=' + catergory,
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