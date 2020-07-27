<template>
  <div>
    hello {{msg}}
  </div>
</template>

<script>
// 第一步 需要安装两个插件
// yarn add @vue/cli @vue/cli-service-global -g
// vue serve or + xxx.vue
// 创建项目  vue create vue-lesson-project
export default {
  data() {
    return {msg: 'message'}
  }
}
</script>

<style>
div {
  color: red;
}
</style>