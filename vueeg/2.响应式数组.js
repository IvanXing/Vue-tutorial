// vue2的特点：如果是对象会使用Object.defineProperty
// 但是不支持数组，会把数组的方法重写

function render() {
  console.log('模拟视图渲染');
}

let obj = [1, 2, 3];

// 数组调用methods中的方法触发视图更新
let methods = ['pop', 'shift', 'unshift', 'sort', 'reverse', 'splice', 'push'];
// 先获取到原来的原型上的方法
let arrayProto = Array.prototype; // 取数组的原型链
let proto = Object.create(arrayProto); // 创建一个自己的原型，生成新对象，不改原原型链

// 重写数组方法加render渲染
methods.forEach(method => {
  proto[method] = function() {
    arrayProto[method].call(this, ...arguments);
    render();
  }
})

function observer(obj) { 
  if(Array.isArray(obj)) {  // 处理数组
    obj.__proto__ = proto;
    return;
  }
  if(typeof obj == 'object') { 
      for(let key in obj) {
        defineReactive(obj, key, obj[key]); 
      }
  }
}


function defineReactive(data, key, value) { 
  observer(value);  
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      observer(newValue); 
      if(newValue !== value) {
        render();
        value = newValue;
      }
    },
  })
}

observer(obj);
function $set(data, key, value) {
  if(Array.isArray(data)) {
    return data.splice(key, 1, value); // splice重写过会触发视图更新
  }
  defineReactive(data, key, value)
}
obj.push(123);
console.log(obj); 
$set(obj, 0, 100)  //$set触发数组更新
// 不支持数组的长度变化，不支持数组的内容发生变化，必须通过上述方法触发更新，或者替换一个新的数组