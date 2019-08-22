class EventHub {
  private cache = {};

  on(eventName: string, fn: (data: string) => void) {
    // 把 fn 推进 this.cache[eventName] 数组里
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }

  emit(eventName: string, data?: string) {
    // 把 this.cache[eventName] 数组里的 fn 全部依次调用
    if (this.cache[eventName] === undefined) return;
    this.cache[eventName].forEach(fn => fn(data));
  }

  off(eventName: string, fn: () => void) {
    // 把 fn 从 this.cache[eventName] 数组里删掉
    let index = indexOf(this.cache[eventName], fn);
    if (index === -1) return;
    this.cache[eventName].splice(index, 1);
  }
}

export default EventHub;

/**
 * 帮助函数 indexOf
 * @param array 数组
 * @param item 需要匹配的项目
 */
function indexOf(array, item) {
  if (array === undefined) return -1;
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      index = i;
      break;
    }
  }
  return index;
}
