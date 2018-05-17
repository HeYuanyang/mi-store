<!-- 登录 -->
<template>
  <section class="mi-page">
    <header class="mi-page--head">
      <h3 class="mi-page--title">登录</h3>
    </header>
    <div class="mi-page--body">
      <el-form class="mi-page--form" label-width="80px" :model="loginForm" :rules="loginRule" ref="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input size="medium" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input size="medium" v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" class="el-button el-button--primary mi-button" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
  import {
    mapActions
  } from 'vuex'

  export default {
    data() {
      return {
        loginForm: {
          // 用户名
          username: '',
          // 密码
          password: ''
        },
        loginRule: {
          // 用户名的校验规则
          username: [{
            validator: this.checkUsername,
            trigger: 'blur'
          }],
          // 密码的校验规则
          password: [{
            validator: this.checkPassword,
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      // Vuex事件整合到方法中
      ...mapActions([
        // 设置用户ID
        'setUserId',
        // 设置用户名
        'setUserName'
      ]),
      // 校验用户名
      checkUsername(rule, value, callback) {
        if (!value) {
          callback(new Error('请输入用户名！'))
        } else {
          callback()
        }
      },
      // 校验密码
      checkPassword(rule, value, callback) {
        if (!value) {
          callback(new Error('请输入密码！'))
        } else {
          callback()
        }
      },
      // 提交表单
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            // 登录事件(后台交互)！
            this.$alert('登录成功！', '提示信息', {
              showClose: false,
              showCancelButton: false
            }).then(() => {
              this.setUserId('10056')
              this.setUserName(this.loginForm.username)
              this.$cookies.set('__mi_store_userid__', '10056')
              this.$cookies.set('__mi_store_username__', this.loginForm.username)
              this.$router.push('/home')
            })
          } else {
            return false
          }
        })
      }
    }
  }

</script>

<style lang='scss'>


</style>
