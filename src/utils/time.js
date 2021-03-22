export function timeQuantum(time){
  time=new Date(parseInt(time));//获取传入时间 并将其转化为date型
  var nowTime=new Date();//获取当前时间
  var timeDifference=time.getTime()-nowTime.getTime();//时间差的毫秒数
  if(timeDifference<0){
    return '超过规定处理时间';
  }else{
    var days=Math.floor(timeDifference/(24*3600*1000));//计算出相差天数
    var leave1=timeDifference%(24*3600*1000); //计算天数后剩余的毫秒数
    var hours=Math.floor(leave1/(3600*1000)); //计算出小时数
    return hours
  }
}
