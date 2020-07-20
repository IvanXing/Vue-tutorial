// vue2的特点：如果是对象会使用Object.defineProperty
// 但是不支持数组，会把数组的方法重写

function render() {
  console.log('模拟视图渲染');
}

let obj = {
  name: 'jw',
  location: {x: 100, y: 100},
}

function observer(obj) { // 把所有的属性定义成set/get的方式
  if(typeof obj == 'object') { // 判断是否对象
      for(let key in obj) {
        defineReactive(obj, key, obj[key]);  // 内置指令如Vue.$set()也会改，单独封装
      }
  }
}

// 定义响应式数据变化 or 数据劫持 把所有的属性 都劫持到set和get中

function defineReactive(data, key, value) {  // get返回value set修改value
  observer(value);  // 对象包对象 处理第二层 保证触发render
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      observer(newValue);  // 处理改第一层对象
      if(newValue !== value) {
        render();
        value = newValue;
      }
    },
  })
}

observer(obj);
obj.name = 'zf';
obj.loaction = {x: 10010, y: 10086}; 
// 第一层的newValue直接改对象，改变了指向，没有get和set，再修改x或者y不更新
obj.a = 'add'; // 如果直接给对象新增属性，是不会被监控的
// $set原理
function $set(data, key, value) {
  defineReactive(data, key, value)
}
$set(obj, 'a', 1);
obj.a = 100;
// 如果像给对象增加一个不存在的属性，obj.loaction = {...obj.location, a: 1}重新定义，会走set 或 手动调用$set