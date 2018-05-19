<!-- 注册 -->
<template>
  <section class="mi-page">
    <header class="mi-page--head">
      <h3 class="mi-page--title">注册</h3>
    </header>
    <div class="mi-page--body">
      <el-form class="mi-page--form" label-width="80px" :model="registForm" :rules="registRule" ref="registForm">
        <el-form-item label="用户名" prop="username">
          <el-input size="medium" v-model="registForm.username" placeholder="请设置用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input size="medium" v-model="registForm.password" placeholder="请设置密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input size="medium" v-model="registForm.repassword" placeholder="请再次确认密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" class="el-button el-button--primary mi-button" :disabled="registForm.isRegist" @click="submitForm('registForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        registForm: {
          // 用户名
          username: '',
          // 密码
          password: '',
          // 确认密码
          repassword: '',
          // 是否注册中
          isRegist: false
        },
        registRule: {
          // 用户名的校验规则
          username: [{
            validator: this.checkUsername,
            trigger: 'blur'
          }],
          // 密码的校验规则
          password: [{
            validator: this.checkPassword,
            trigger: 'blur'
          }],
          // 确认密码的校验规则
          repassword: [{
            validator: this.checkRepassword,
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      // 校验用户名
      checkUsername(rule, value, callback) {
        if (!value) {
          callback(new Error('请设置用户名！'))
        } else {
          callback()
        }
      },
      // 校验密码
      checkPassword(rule, value, callback) {
        if (!value) {
          callback(new Error('请设置密码！'))
        } else {
          callback()
        }
      },
      // 校验确认密码
      checkRepassword(rule, value, callback) {
        if (!value) {
          callback(new Error('请再次确认密码！'))
        } else if (value !== this.registForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      // 提交表单
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            // 注册事件(后台交互)！
            this.registForm.isRegist = true
            this.$axios.post('/user/regist', {
              username: this.registForm.username,
              password: this.registForm.password
            }).then((res) => {
              let result = res.data
              let title, msg, path

              if (result.code > 0) {
                title = '注册成功'
                msg = '您已注册成功！'
                path = '/login'
              }
              else {
                title = '注册失败'
                msg = result.msg
              }

              this.registForm.isRegist = false

              this.$alert(msg, title, {
                showClose: false,
                showCancelButton: false
              }).then(() => {
                if (path) {
                  this.$router.push(path)
                }
              })
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
