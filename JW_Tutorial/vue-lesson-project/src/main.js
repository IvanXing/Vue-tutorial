import Vue from 'vue'
import App from './App.vue'

new Vue({
  // 渲染函数
  // 默认main文件中只支持render方法

  methods:{
    say(){
      alert(1)
    }
  },


  render: h => h(App),
  // render: createElement => createElement('h1', {}, 'hello'), //渲染元素
  // render: createElement => createElement(App), //渲染组件

  // render:function(h){
  //   return <h1 
  //     on-click={()=>this.say()} 
  //     class="a"
  //     style={{color:'red'}}
  //   >点我啊</h1>
  // }

}).$mount('#app')
