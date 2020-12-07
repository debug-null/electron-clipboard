export function continuousDetect() {
  var count = 0; // 连续点击次数
  var lastTime = new Date().getTime(); //上次点击时间
  var timer = null;

  return callback => {
    var waitTime = 1000;
    var currentTime = new Date().getTime();
    //计算2次点击的间隔时间
    count = currentTime - lastTime < waitTime ? count + 1 : 1;
    lastTime = new Date().getTime();
    clearTimeout(timer);

    timer = setTimeout(() => {
      clearTimeout(timer);
      if (count > 2) {
        callback();
      }
    }, waitTime);
  };
}
