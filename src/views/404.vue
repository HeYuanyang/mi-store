<!-- 404页面 -->
<template>
  <div class="mi-page mi-page--style-error">
    <h4 class="mi-page--title">404</h4>
    <p>您所访问的页面不存在！</p>
    <button type="button" class="el-button el-button--primary mi-button" @click="$router.push('/home')">返回首页</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }

</script>

<style lang='scss'>


</style>
