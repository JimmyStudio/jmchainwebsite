/**
 * Created by Jimmy on 2018/4/24.
 */
<template>
  <div class="main">
    <div class="line"></div>
    <div class="banner">
      <div class="head">
        <mynav :iswhite="iswhite" :token="hasToken" :user="user" v-on:login="doLogin" v-on:register="doRegister" v-on:logout="doLogout"></mynav>
      </div>
      <div class="car">
        <el-carousel trigger="click" height="450px" :interval=car_interval>
          <el-carousel-item>
            <div class="car-item car-1">
              <p class="title">致力于泛文娱区块链的场景实现和价值挖掘</p>
              <p class="detail">围绕数字媒体，新媒体，在版权，云分发交易，共识机制，应用等环节打造去中心化的区块链。</p>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="car-item car-2">
              <p class="title">J&M区块链引擎</p>
              <p class="detail">自主研发的基于区块链开发引擎，重构泛娱乐价值、重构网络生态。</p>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="car-item car-3">
              <p class="title">J&M泛娱乐分发平台</p>
              <p class="detail">在基础结构和协议层面上完美解决泛娱乐IP的所有权和交易分享。</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="op">
      <div class="search">
        <input class="input" placeholder="搜索作品、作者、类型..."/>
        <i class="el-icon-search"></i>
      </div>
      <div class="upload" v-on:click="upload">上传</div>
    </div>
    <div class="recommend">
      <div class="rec-title"> —— 热门推荐 —— </div>
      <div class="rec-content">
        <work class="rec-work" v-for="(item,index) in works" :key="index" :index="index" :work="item" v-on:showDetail="showWorkDetail"></work>
      </div>
      <div class="explore">
        <div class="more" @click="openSounds">发现更多</div>
      </div>
    </div>
    <div class="bot-line"></div>
    <div class="bottom">
      <div class="bot-item bot-left">
        <div class="left-item left-title">J&M Chain</div>
        <div class="left-item">
          <i class="el-icon-location-outline"></i><span>上海市浦东新区浦东南路3456号江天大厦</span>
        </div>
        <div class="left-item">
          <i class="el-icon-message"></i><span>hezuo@jinmiok.com</span>
        </div>
        <div class="left-item">
          <i class="el-icon-phone-outline"></i><span>400-9659600</span>
        </div>
      </div>
      <div class="bot-item bot-right">
        <div class="right-item">
          <div class="left-item left-title">条款声明</div>
          <div class="left-item">
            <span>网站条款</span>
          </div>
          <div class="left-item">
            <span>版权声明</span>
          </div>
        </div>
        <div class="right-item">
          <div class="left-item left-title">关于我们</div>
          <div class="left-item">
            <span>关于J&M</span>
          </div>
          <div class="left-item">
            <span>产品服务</span>
          </div>
          <div class="left-item">
            <span>联系我们</span>
          </div>
        </div>
        <div class="right-item">
          <div class="left-item left-title">帮助信息</div>
          <div class="left-item">
            <span>常见问题</span>
          </div>
          <div class="left-item">
            <span>授权查询</span>
          </div>
          <div class="left-item">
            <span>意见反馈</span>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="bot-line"></div>-->
    <div class="copyright">
      © 2018 劲米科技
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
</template>

<script>
import work from '../components/Work.vue'
import mynav from '../components/Nav.vue'

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
    work,
    mynav
  },
  name: 'home',
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
      dialogCenter: true,
      car_interval: 3000,
      works: []
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
    this.$http.post(this.domain + '/recommend', {token: ''})
      .then((response) => {
        this.works = response.data.list
      })
      .catch(function (response) {
        console.log(response)
      })
  },
  methods: {
    showWorkDetail: function (index) {
      console.log(index)
    },
    upload: function () {
      if (this.user) {
        this.$router.push({path: '/management/upload'})
      } else {
        this.$message.error('请登录后再进行操作！')
      }
    },
    openSounds () {
      this.$router.push('/sounds')
    },
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
  .main{
    background: #f2f2f2;
  }
  .line{
    width: 1240px;
    height: 4px;
    background: #ff5622;
    margin: 0 auto;
  }
  .banner{
    width: 1240px;
    height: 450px;
    margin: 0 auto;
    position: relative;
  }
  .head{
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 60px;
  }
  .car{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    left: 0;
    top:0;
  }
  .car-1{
    background: url("../assets/car_1.jpeg");
  }
  .car-2{
    background: url("../assets/car_2.jpeg");
  }
  .car-3{
    background: url("../assets/car_3.jpeg");
  }
  .car-item{
    width: 100%;
    height: 100%;
  }
  .btn{
    float: right;
    height: 30px;
    width: 80px;
    color: white;
    line-height: 30px;
    font-size: 14px;
    border-radius: 4px;
    text-align: center;
    margin-top: 15px;
  }
  .btn:hover{
    cursor: pointer;
  }
  .register{
    background-color: #ff5622;
    margin-right: 30px;
  }
  .login{
    margin-right: 15px;
    border: 1px solid #e5e5e5;
    height: 28px;
  }
  .login:hover{
    border-color: white;
    cursor: pointer;
  }
  .register:hover, .upload:hover, .more:hover{
    background-color: #ff6000;
    cursor: pointer;
  }
  .car-item p {
    color: white;
    text-align: center;
    width: 100%;
  }
  .car-item .title{
    position: absolute;
    font-size: 30px;
    line-height: 30px;
    margin-top: 200px;
    font-weight: 500;
  }
  .car-item .detail{
    position: absolute;
    margin-top: 240px;
  }
  .logo{
    float: left;
    color: white;
  }
  .big{
    font-size: 18px;
    font-weight: 500;
    line-height: 60px;
    margin-left: 30px;
    margin-right: 5px;
  }
  .small{
    font-size: 12px;
    margin-top: 15px;
    color: #ff5622;
    font-weight: 500;
  }
  .op{
    background: white;
    margin: 0 auto;
    width: 1240px;
    height: 110px;
    position: relative;
  }
  .search{
    background: #f2f2f2;
    width: 600px;
    height: 50px;
    margin-left: 245px;
    margin-top: 40px;
    position: absolute;
    border-radius: 6px;
  }
  .input{
    border: 0;
    outline: none;
    width: 550px;
    height: 50px;
    background: #f2f2f2;
    border-radius: 6px;
    color: #666674;
    font-size: 16px;
    font-weight: 500;
    padding-left: 20px;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #aab0ad; opacity:1;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #aab0ad;opacity:1;
  }

  input:-ms-input-placeholder{
    color: #aab0ad;opacity:1;
  }

  input::-webkit-input-placeholder{
    color: #aab0ad;opacity:1;
  }
  .el-icon-search{
    color: #666674;
  }
  .el-icon-search:hover{
    cursor: pointer;
  }
  .upload{
    background-color: #ff5622;
    width: 100px;
    height: 50px;
    position: absolute;
    margin-top: 40px;
    margin-left: 895px;
    line-height: 50px;
    color: white;
    text-align: center;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
  }
  .recommend{
    width: 1240px;
    background: white;
    margin: 0 auto;
  }
  .rec-title{
    text-align: center;
    color: #333;
    font-size: 20px;
    font-weight: 500;
    height: 50px;
    line-height: 50px;
  }
  .rec-content{
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .rec-work{
    flex: 0 0 auto;
  }
  .explore{
    width: 100%;
    height: 90px;
    padding-top: 10px;
  }
  .more{
    margin: 0 auto;
    background-color: #ff5622;
    width: 120px;
    height: 50px;
    color: white;
    line-height: 50px;
    text-align: center;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
  }
  .bot-line{
    width: 1140px;
    height: 1px;
    background-color: #f2f2f2;
    margin: 0 auto;
  }
  .bottom{
    width: 1240px;
    /*height: 250px;*/
    margin: 0 auto;
    background-color: white;
    display: flex;
    color: #5e5e5e;
    padding-top: 40px;
  }
  .bot-item{
    flex: 0 0 auto;
    width: 580px;
    padding: 0 20px 0 20px;
  }
  .bot-left{
    /*background-color: red;*/
  }
  .bot-right{
    display: flex;
    justify-content: space-around;
    /*background-color: yellow;*/
  }
  .left-item{
    height: 40px;
    font-size: 14px;
    line-height: 40px;
  }
  .left-item:hover{
    cursor: pointer;
  }
  .left-item i {
    margin-right: 10px;
  }
  .left-title{
    height: 50px;
    font-size: 18px;
    font-weight: 700;
    line-height: 50px;
  }
  .right-item{
    flex: 0 0 auto;
    width: 160px;
    /*background: red;*/
  }
  .copyright{
    margin: 0 auto;
    width: 1240px;
    height: 20px;
    /*background-color: #5e5e5e;*/
    color: #5e5e5e;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    line-height: 20px;
  }
</style>
