## Vue 起步

- 1.基本指令
  - `v-model`绑定值
  - `v-for`循环 item
  - `v-on`绑定事件, `v-on:click` 简写为 `@click`
  - `v-bind:content` 简写为 `:content`
  - `v-text="name"` === {{name}}
  - `v-html="name"` => 可以解析 HTML
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
