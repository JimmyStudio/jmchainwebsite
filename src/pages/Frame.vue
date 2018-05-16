/**
 * Created by Jimmy on 2018/5/7.
 */
<template>
  <div>
    <div class="frame">
      <div class="head">
        <mynav :iswhite="iswhite" :token="hasToken" :user="user_" v-on:login="doLogin" v-on:register="doRegister" v-on:logout="doLogout"></mynav>
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
        <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm" label-position="left">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.number="registerForm.phone"></el-input>
          </el-form-item>
          <!--<el-form-item label="验证码" prop="pass">-->
            <!--<el-input type="password" v-model="registerForm.pass" auto-complete="off">-->
              <!--<el-button slot="append" type="primary">发送验证码</el-button>-->
            <!--</el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="密码" prop="pw">
            <el-input type="password" v-model.number="registerForm.pw"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="pwa">
            <el-input type="password" v-model.number="registerForm.pwa"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="goregister">注 册</el-button>
          </span>
      </el-dialog>
      <el-dialog
        title="登录"
        :visible.sync="loginVisible"
        width="30%"
        :center="dialogCenter">
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm" label-position="left">
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
    <!--<myplayer></myplayer>-->
  </div>
</template>

<script>
import mynav from '../components/Nav.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
    mynav
  },
  data () {
    var checkPhone = (rule, value, callback) => {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(value)) {
        return callback(new Error('请输入正确的手机号'))
      }
      setTimeout(() => {
        if (!myreg.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      setTimeout(() => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validatePwa = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.pw) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      user_: {},
      hasToken: false,
      iswhite: true,
      loginForm: {
        phone: '',
        passv: ''
      },
      registerForm: {
        phone: '',
        pw: '',
        pwa: ''
      },
      rules: {
        passv: [
          { validator: validatePass, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        pw: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pwa: [
          { validator: validatePwa, trigger: 'blur' }
        ]
      },
      registerVisible: false,
      loginVisible: false,
      dialogCenter: true
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted: function () {
    this.user_ = this.user
    if (this.user_.token) {
      this.hasToken = true
    } else {
      this.hasToken = false
    }
    this.checkRoute(this.$route)
  },
  watch: {
    $route (to, from) {
      this.checkRoute(to)
    }
  },
  methods: {
    ...mapActions(['changeUser']),
    checkRoute (to) {
      let tos = to.fullPath.split('/')
      this.iswhite = true
      if (tos.includes('management') || tos.includes('chain')) {
        this.iswhite = false
      }
    },
    doLogin () {
      this.loginVisible = true
    },
    doRegister () {
      this.registerVisible = true
    },
    goregister () {
      this.registerVisible = false
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(this.registerForm.phone)) {
        this.$message.error('请输入正确的手机号码')
      } else {
        if (this.registerForm.pw !== '') {
          if (this.registerForm.pwa !== '') {
            if (this.registerForm.pw === this.registerForm.pwa) {
              this.$http.post(this.domain + '/register', {phone: this.registerForm.phone, password: this.registerForm.pw})
                .then((response) => {
                  let res = response.data
                  if (res.err === '100') {
                    localStorage.setItem('user_info', JSON.stringify(res.user))
                    this.loginVisible = false
                    this.changeUser(res.user)
                    this.user_ = res.user
                    this.$notify.success({
                      title: '成功',
                      message: '注册成功'
                    })
                    this.hasToken = true
                  } else {
                    this.$message.error(res.message)
                  }
                })
                .catch(function (response) {
                  console.log(response)
                })
            } else {
              this.$message.error('两次输入密码不一致!')
            }
          } else {
            this.$message.error('请确认密码')
          }
        } else {
          this.$message.error('请输入密码')
        }
      }
    },
    goLogin () {
      this.$http.post(this.domain + '/login', {phone: this.loginForm.phone, password: this.loginForm.passv})
        .then((response) => {
          let user = response.data
          if (user.err === '100') {
            localStorage.setItem('user_info', JSON.stringify(user))
            this.loginVisible = false
            this.changeUser(user)
            this.user_ = user
            this.$notify.success({
              title: '成功',
              message: '登录成功'
            })
            this.hasToken = true
          } else {
            this.$message.error(user.message)
          }
        })
        .catch(function (response) {
          console.log(response)
        })
    },
    doLogout () {
      this.$http.post(this.domain + '/logout', {token: this.user.token})
        .then((response) => {
          let res = response.data
          if (res.err === '100') {
            localStorage.clear()
            this.hasToken = false
            this.changeUser({})
            this.user_ = {}
            this.$router.push({path: ''})
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(function (response) {
          console.log(response)
        })
    }
  }
}
</script>

<style scoped>
  .frame{
    position: relative;
    /*width: 1240px;*/
    /*margin: 0 auto;*/
  }
  .head{
    position: absolute;
    z-index: 200;
    width: 100%;
    height: 60px;
    /*background: red;*/
  }
  .content{
    position: absolute;
    z-index: 100;
    width: 100%;
    /*background: red;*/
    /*margin:  0 auto;*/
    /*margin-bottom: 50px;*/
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
