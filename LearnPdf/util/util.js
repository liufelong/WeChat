/*
 *拓展Date方法，得到格式化的日期形式
  date.formart('yyyy-MM-dd'),date.formart('yyyy/MM/dd'),date.formart('yyyy.MM.dd'),
  date.formart('dd.MM.yy'),date.formart('yyyy.dd.MM'),date.formart('yyyy-MM-dd HH:mm')

  使用方式
  var date = new Date();
  var todayFormart = date.formart('yyyy-MM-dd');
*/ 
(
  function initTimeFormart(){
    Date.prototype.formart = function (formart){
      var o = {
        'M+':this.getMonth() + 1,
        'd+':this.getDay(),
        'h+':this.getHours(),
        'm+':this.getMinutes(),
        's+':this.getSeconds(),
        'q+':Math.floor((this.getMonth + 3) / 3),//季度
        'S+':this.getMilliseconds() //milliseconds 毫秒
      }
      if(/(y+)/.test(formart)){       
        formart=formart.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));       
      }       
      for(var k in o){       
        if(new RegExp("("+ k +")").test(formart)){       
          formart = formart.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));       
        }       
      }
      return formart;  
    }
  }
)()

/**
 * 根据客户端发布的时间获得时间格式
 * 多少分钟前，多少小时前，昨天，月日
 * recordTime-(float) 时间戳
 * yearsFlag-(bool) 是否需要年
 * */ 
function getDiffTime(recordTime,yearsFlag){
  if (recordTime) {
    recordTime = new Date(parseFloat(recordTime) * 1000);
    var minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        now = new Date(),
        diff = now - recordTime;

    var result = '';
    if (diff < 0) {
      return result;
    }
    var weekR = diff / (7 * day);
    var dayC = diff / day;
    var hourC = diff / hour;
    var minC = diff / minute;
    
    if (weekR >= 1) {
      var formart = 'MM-dd hh:mm'
      if (yearsFlag) {
        formart = 'yyyy-MM-dd hh:mm'
      }
      return recordTime.formart(formart);
    }else if (dayC == 1 || ((hourC < 24) && (recordTime.getDate()!=now.getDate()))) {
      result = '昨天' + recordTime.formart('hh:mm');
      return result;
    }
    else if (dayC > 1) {
      var formart = 'MM-dd hh:mm'
      if (yearsFlag) {
        formart = 'yyyy-MM-dd hh:mm'
      }
      return recordTime.formart(formart);
    } 
    else if (hourC >= 1) {
      result = parseInt(hourC) + '小时前'
      return result;
    }
    else if (minC >= 1) {
      result = parseInt(minC) + '分钟前'
      return result;
    } else {
      return '刚刚';
    }
  }
}

function httpPostRequest(url,data,callBack){
  url = "http://127.0.0.1:8080/" + url;
  wx.request({
    url: url,
    data:data,
    method:"POST",
    header:{
      "content-type":"application/json"
    },
    success:function(res){
      callBack(res.data);
    },
    fail:function(error){
      console.log(error);
    }
  })
}

module.exports = {
  getDiffTime:getDiffTime,
  httpPostRequest:httpPostRequest
}