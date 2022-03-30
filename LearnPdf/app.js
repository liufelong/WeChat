// app.js
App({
  onLaunch() {
    this.getUserInfo();
  },
  globalData:{
    baseUrl:"http://127.0.0.1:8080/",
    userInfo:null
  },

 getUserInfo:function(){
   
   var userInfor = wx.getStorageSync('user');
   console.log("调起了userInfo的get方法" + userInfor);
   if (!userInfor) {
     var that = this;
     wx.login({
       success:function(res){
        console.log("login");
         wx.getUserInfo({
           success:function(res){
              that.globalData.userInfo = res.userInfo;
              wx.setStorageSync('user', res.userInfo)
           },
           fail:function(err){
             console.log(err);
           }
         })
       },
       fail:function(err){
        console.log(err);
       }
     })
   }else {
     this.globalData.userInfo = userInfor;
   }

 }
  
})
