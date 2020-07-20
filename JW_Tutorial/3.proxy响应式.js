// 可以使用proxy来实现数据的响应式变化
// 不用区分数对象还是数组，本身就支持数组
// 兼容性有问题

function render() {
  console.log('模拟视图更新');
}

let obj = {
  name: 'jw',
  age: {age: 100},
  arr: [],
}

let handler = {
  get(target, key) {
    // 处理第二层对象 代理对象
    if(typeof target[key] == 'object' && target[key] !== null) {
      return new Proxy(target[key], handler);
    }
    // return target[key]; //不够直观
    return Reflect.get(target.key);

  },
  set(target, key, value) {  // 给target设置key属性值是value
    if(key === 'length') return true; // 如果赋值是数组的长度，不处理，会重复渲染
    render();
    return Reflect.set(target, key, value);
  },
};


let proxy = new Proxy(obj, handler);
// Object.defineProperty => proxy => 中间层
proxy.name = 'zf'; 
proxy.age.age = 10010;
proxy.arr.push(123);
proxy.arr[0] = 100;
console.log(proxy.arr)