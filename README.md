## Vue 起步

- 1.基本指令

  - `v-model` input textarea checkbox radio 绑定值
  - `v-for`循环 item
  - `v-on`绑定事件, `v-on:click` 简写为 `@click`
  - `v-bind:content` 简写为 `:content`
  - `v-text="name"` === {{name}}
  - `v-html="name"` => 可以解析 HTML
  - `v-if`每次隐藏显示相当于删除 DOM，增加 DOM，性能比 v-show 差
  - `v-show`在页面上存在，被设置为 display:none
  - `v-for`v-for="(item ,inde) of list"

- 2.MVVM 模式

  - MVP（控制器大量 DOM 操作 + 调用 Model 发请求）
    - Model：模型层
    - Presenter：控制器，业务逻辑相关控制层，可以调用模型层发 ajax 请求，
    - View：视图层，页面上的 DOM 展示
  - MVVM（VM 层由框架提供映射 Object.defineProperty + 虚拟 DOM）

    - View（DOM）+ ViewModel（DOM Listener + Data Bindings = Vue）+ Modle（Plain JS Objects）

- 3.组件间传值

  - 父组件向子组件传值：v-bind:xxx = data => props:['xxx']
  - 子组件向父组件传值：通过\$emit 向上一层触发事件 => 父组件监听

- 4.模板占位符
  - <template v-for="..."><div>{{xxx}}</div><span>{{xxx}}</span></template>
  - 可以用来包裹元素，渲染时，并不会占位

## Vue 基础

- 1.Vue 实例

  - 通过 new Vue()创建一个 vue 实例，每一个组件都是一个 vue 实例，每一个实例都有若干方法，just like `vm.$el`, `vm.$data`, `vm.$destory()`, `vm.$data.message`

- 2.Vue 生命周期

  - vue 实例在某一个时间点会自动执行的函数
  - init -> beforeCreate -> created -> el ? template( if none complie el's outerHTML as template ) -> beforeMount -> 挂载到页面 -> mounted( this.$el ) -> beforeDestory ( if $destory() )-> destoryed( if \$destory() )
  - 更新：beforeUpdate -> update

- 3.计算属性( get set )，方法，侦听器

  - 计算属性缓存机制：计算属性依赖的值没有发生变化就不会重新计算，{{}}里直接调用
  - 方法没有缓存机制，函数，需要()调用
  - 侦听器也有缓存机制，watch 的语法比 computed 复杂了很多

- 4.样式绑定

  - class 的对象绑定

  ```js
  <div @click="changeClass" :class="{{activated: isActivated}}"></div>
  ```

  - class 和数组绑定，数组内是一个变量

  ```js
  <div @click="changeClass" :class="[activated，other]"></div>
  data:{activated: '', other: 'red'}
  changeClass:function(){this.activated = 'activated'}
  ```

  - style 的对象绑定

  ```js
  <div @click="changeClass" :style="styleObj"></div>
  data:{styleObj: {color: "black"}}
  changeClass:function(){this.styleObj.color = 'red'}
  ```

  - style 的数组绑定

  ```js
  <div @click="changeClass" :style="[styleObj, {fontSize: "20px"}]"></div>
  data:{styleObj: {color: "black"}}
  changeClass:function(){this.styleObj.color = 'red'}
  ```

- 5.条件渲染

  ```js
  <div v-if="show">{{content}}</div>
  <div v-else>{{nocontent}}</div>
  ```

  ```js
  <div v-if="show === a">{{content}}</div>
  <div v-else-if="show === b">{{content}}</div>
  <div v-else>{{nocontent}}</div>
  ```

  - 在页面渲染过程中，Vue 会尽量不渲染已有的 DOM，元素标签加 key 值，Vue 会识别出不一样
  - 虚拟 DOM diff 算法中用到

  ```js
  <div v-if="show">用户名：<input key="username"/></div>
  <div v-else>邮箱名：<input key="email"/></div>
  ```

- 6.列表循环

  - 数组循环

    ```js
    <div v-for="(item ,index) of list" :key="item.id">{{item.text}}</div>
    ```

    - 直接操作数组下标不生效，操作方法：push pop shift unshift splice sort reverse
    - 改变数组引用地址，也可以修改数据触发页面更改
    - set 方法：
      - 全局方法：`Vue.set(vm.Array, 1, "beijing")`
      - 实例方法：`vm.$set(vm.Array, 2, "beijing")`

  - 对象循环

    ```js
    // item 值 key键名 index
    <div v-for="(item ,key, index) of list" :key="item.id">{{item.text}}</div>
    ```

    - 更改对象引用地址，页面跟着修改
    - set 方法：
      - 全局方法：`Vue.set(vm.Object, "address", "beijing")`
      - 实例方法：`vm.$set(vm.Object, "address", "beijing")`

- 7.事件绑定

  - 传递 e 以及参数，不写默认传 e

  ```js
  <button @click="handleClick($event, 1, 2)"></button>
  handleClick(e, para1, para2){}
  ```

  - 阻止默认事件

  ```js
  <form action="/abc" @click="handleClick">
    <button @click="handleClick"></button>
  </form>
  handleClick(e){ e.preventDefault() }
  ```

  - 普通修饰符

    - .prevent 修饰符阻止默认行为
    - .stop 阻止向外冒泡

    ```js
    <form action="/abc" @click.prevent="handleClick">
      <button @click="handleClick"></button>
    </form>
    ```

    - .self 修饰符

    ```js
    // 点击hello world 就会触发handleClick
    <div @click="handleClick">
      <div>hello world</div>
    </div>
    ```

    ```js
    // 点击hello world 不会触发，点击nice才会触发
    <div @click.self="handleClick">
      nice
      <div>hello world</div>
    </div>
    ```

    - .once 只执行一次
    - .capture 事件捕获（从外部到内部）

    ```js
    // 事件冒泡，从内向往，捕获从外向内
    <div @click.capture="handleClick">
      <div @click.capture="handleClick2">hello world</div>
    </div>
    handleClick:function(){console.log(1)}
    handleClick2:function(){console.log(1)}
    ```

  - 按键修饰符
    - `@keydowm.enter` => enter 触发 keydown （.tab .delete）
  - 系统修饰符
    - `@click.ctrl` => 同时按住 ctrl 才会触发
  - 鼠标修饰符
    - `@click.right` => 鼠标右键点击
