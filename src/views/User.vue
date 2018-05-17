<!-- 用户详情 -->
<template>
  <section class="mi-page">
    <div class="mi-page--user-info">
      <p>
        <i class="fa fa-id-card"></i>
        <span>用户ID：{{ userId }}</span>
      </p>
      <p>
        <i class="fa fa-user"></i>
        <span>用户名：{{ userName }}</span>
      </p>
    </div>
  </section>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    data() {
      return {}
    },
    computed: {
      // Vuex状态整合到计算属性
      ...mapState({
        userId: state => state.userId,
        userName: state => state.userName
      })
    }
  }

</script>

<style lang='scss'>


</style>
