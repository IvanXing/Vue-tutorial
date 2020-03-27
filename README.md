## Vue 起步

- `v-model`绑定值，`v-for`循环 item，`v-on`绑定事件
  - v-on:click 简写为 @click
- MVVM 模式

  - MVP（控制器大量 DOM 操作 + 调用 Model 发请求）
    - Model：模型层
    - Presenter：控制器，业务逻辑相关控制层，可以调用模型层发 ajax 请求，
    - View：视图层，页面上的 DOM 展示
  - MVVM（VM 层由框架提供映射 Object.defineProperty + 虚拟 DOM）

    - View（DOM）+ ViewModel（DOM Listener + Data Bindings = Vue）+ Modle（Plain JS Objects）

  - 组件间传值
    - 父组件向子组件传值：v-bind:xxx = data => props:['xxx']
