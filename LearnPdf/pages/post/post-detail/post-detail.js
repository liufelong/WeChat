// pages/post/post-detail/post-detail.js
import{DBPost_ES6} from '../../../data/DBPost_ES6.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        postId:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //使用URL接收参数
        // var postId = options.tempid;
        // console.log("收到的文章ID是"+postId)

        // this.dbPost = new DBPost_ES6();
        // this.postData = this.dbPost.getPostItemById(postId).data;
        // console.log("获取到的文章详情是"+this.postData);
        // this.setData({
        //     post:this.postData,
        //     postId:postId
        // })

        //使用eventChannel接收参数
        let eventChannel = this.getOpenerEventChannel();
        eventChannel.on('postData',(postData)=> {
            this.postData = postData;
            this.dbPost = new DBPost_ES6();
            this.setData({
                post:postData,
                postId:postData.postId
            })
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.setNavigationBarTitle({
          title: this.postData.title,
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

    onUpTap: function (e){
        var postId = e.currentTarget.dataset.postId;
        console.log('点赞的ID：' + postId);
        var newData = this.dbPost.upAction(postId);
        this.setData({
            'post.upStatus':newData.upStatus,
            'post.upNum':newData.upNum
        });
        this.reloadListData();
        wx.showToast({
            title: newData.upStatus ? '点赞成功' : '取消成功',
            duration: 1000,
            icon: 'success',
            mask: true
        })
    },
    onCollectionTap: function(){
        console.log('文章id' + this.data.postId);
        var newData = this.dbPost.collect(this.data.postId);
        console.log('点击数量' + newData.collectionNum);
        //重新绑定数据。注意，不要将整个newData全部作为setData的参数
        //应当选择更新部分
        //更新全部 也有效果
        this.setData({
            'post.collectStatus':newData.collectStatus,
            'post.collectionNum':newData.collectionNum
        });
        this.reloadListData();
        wx.showToast({
          title: newData.collectStatus ? '收藏成功' : '取消成功',
          icon: 'success',
          duration: 1500,
          mask: true
        })
    },
    reloadListData: function(){
        const eventChannel = this.getOpenerEventChannel();

        //eventChannel调用在列表页面注册的方法 第一个参数是方法名，第二个参数是传递对象
        eventChannel.emit('reloadItem',{postId:this.data.postId});
    }
})