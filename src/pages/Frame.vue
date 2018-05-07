/**
 * Created by Jimmy on 2018/5/7.
 */
<template>
  <div>
    <div class="frame">
      <div class="head">
        <mynav :iswhite="iswhite" :token="hasToken" :user="user" v-on:login="doLogin" v-on:register="doRegister" v-on:logout="doLogout"></mynav>
      </div>
      <div class="content">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      <el-dialog
        title="注册"
        :visible.sync="registerVisible"
        width="30%"
        :center="dialogCenter">
        <el-form :model="registerForm" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="left">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.number="registerForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="pass">
            <el-input type="password" v-model="registerForm.pass" auto-complete="off">
              <el-button slot="append" type="primary">发送验证码</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pw">
            <el-input v-model.number="registerForm.pw"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="pwa">
            <el-input v-model.number="registerForm.pwa"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">注 册</el-button>
          </span>
      </el-dialog>
      <el-dialog
        title="登录"
        :visible.sync="loginVisible"
        width="30%"
        :center="dialogCenter">
        <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="left">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.number="loginForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passv">
            <el-input type="password" v-model="loginForm.passv" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="goLogin">登 录</el-button>
          </span>
      </el-dialog>
    </div>
    <myplayer></myplayer>
  </div>
</template>

<script>
import mynav from '../components/Nav.vue'
import myplayer from '../components/Player.vue'

var checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('手机号不能为空'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('请输入正确的手机号'))
    }
  }, 1000)
}
var validatePass = (rule, value, callback) => {
  if (value === '') {
    return callback(new Error('请输入验证码'))
  }
}
var validatePass3 = (rule, value, callback) => {
  if (value === '') {
    return callback(new Error('请输入密码'))
  }
}
var validatePass1 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (this.rules.pwa !== '') {
      this.$refs.rules.validateField('pwa')
    }
    callback()
  }
}
var validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== this.ruleForm2.pass) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
export default {
  components: {
    mynav,
    myplayer
  },
  data () {
    return {
      hasToken: false,
      user: {},
      iswhite: true,
      loginForm: {
        phone: '',
        passv: ''
      },
      registerForm: {
        phone: '',
        pass: '',
        pw: '',
        pwa: ''
      },
      rules: {
        passv: [
          { validator: validatePass3, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pw: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        pwa: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      registerVisible: false,
      loginVisible: false,
      dialogCenter: true
    }
  },
  mounted: function () {
    let user = localStorage.getItem('user_info')
    if (user) {
      this.hasToken = true
      this.user = JSON.parse(user)
    } else {
      this.hasToken = false
    }
  },
  watch: {
    $route (to, from) {
      let tos = to.fullPath.split('/')
      this.iswhite = true
      if (tos.includes('management')) {
        this.iswhite = false
      }
    }
  },
  methods: {
    doLogin () {
      this.loginVisible = true
    },
    doRegister () {
      this.registerVisible = true
    },
    goLogin () {
      this.$http.post(this.domain + '/login', {phone: this.loginForm.phone, password: this.loginForm.passv})
        .then((response) => {
          let user = response.data
          if (user.err === '100') {
            localStorage.setItem('user_info', JSON.stringify(user))
            this.loginVisible = false
            this.$notify.success({
              title: '成功',
              message: '登录成功'
            })
            this.hasToken = true
            this.user = JSON.parse(user)
          } else {
            this.$message.error(user.message)
          }
        })
        .catch(function (response) {
          console.log(response)
        })
    },
    doLogout () {
      localStorage.clear()
      this.hasToken = false
      this.user = {}
    }
  }
}
</script>

<style scoped>
  .frame{
    position: relative;
    width: 1240px;
    margin: 0 auto;
  }
  .head{
    position: absolute;
    z-index: 200;
    width: 100%;
    height: 60px;
  }
  .content{
    position: absolute;
    z-index: 100;
    margin-bottom: 50px;
  }
  .fade-enter {
    opacity:0;
  }
  .fade-leave{
    opacity:1;
  }
  .fade-enter-active{
    transition:opacity .2s;
  }
  .fade-leave-active{
    opacity:0;
    transition:opacity .2s;
  }
</style>
