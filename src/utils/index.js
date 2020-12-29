export function continuousDetect() {
  var count = 1; // 连续点击次数
  var lastTime = new Date().getTime(); // 上次点击时间
  var timer = null;

  return callback => {
    var waitTime = 600;
    var currentTime = new Date().getTime();
    // 计算2次点击的间隔时间
    count = currentTime - lastTime < waitTime ? count + 1 : 1;
    lastTime = new Date().getTime();
    clearTimeout(timer);

    timer = setTimeout(() => {
      clearTimeout(timer);
      if (count >= 2) {
        callback();
      }
    }, waitTime);
  };
}
// 节流： 一段时间内，只执行一次
export function throttle (fn, wait) {
  return function() {
    const args = arguments;
    if (fn.id) return;
    fn.id = setTimeout(() => {
      fn.apply(this, args);
      fn.id = null;
    }, wait);
  };
}
// 防抖：一定时间内，触发多次，执行一次
export function debounce(fn, delay) {
  return function() {
    const args = arguments;
    clearTimeout(fn.id);
    fn.id = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
