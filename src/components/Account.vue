/**
 * Created by Jimmy on 2018/4/28.
 */
<template>
  <div class="account">
    <div class="title">我的账户</div>
    <div class="top">
      <div class="left">
        <font-awesome-icon :icon="['far','user']"></font-awesome-icon>
      </div>
      <div class="right">
        <el-form ref="form1" :model="form1" label-width="60px" label-position="left">
          <el-form-item label="用户名">
            <el-tooltip class="item" effect="dark" content="修改" placement="right">
            <el-input v-model="form1.name"><el-button slot="append" icon="el-icon-setting"></el-button></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="form1.brief" type="textarea" :rows="2"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="bottom">
      <el-form ref="form2" :model="form2" label-width="60px" label-position="left">
        <el-form-item label="地址">
          <el-tooltip class="item" effect="dark" content="复制" placement="right">
          <el-input v-model="form2.address" disabled>
            <!--<el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">-->
              <el-button slot="append" icon="el-icon-document"></el-button>
            <!--</el-tooltip>-->
          </el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="JMT">
          <el-tooltip class="item" effect="dark" content="转账" placement="right">
            <el-input v-model="form2.coin" disabled>
              <!--<el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">-->
              <el-button slot="append" icon="el-icon-sort"></el-button>
              <!--</el-tooltip>-->
            </el-input>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
//    user () {
//      if (this.$store.getters.user.token) {
//        return this.$store.getters.user
//      } else {
//        return this.$store.state.account.user
//      }
//    },
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters(['user']),
    form1 () {
      return {name: this.user.username, brief: this.user.brief}
    },
    form2 () {
      return {address: this.user.eth_address, coin: this.user.coin}
    }
  },
  methods: {
    ...mapActions(['changeUser'])
  },
  mounted: function () {
    let tk = this.user.token
    this.$http.post(this.domain + '/userinfo', {token: tk})
      .then((response) => {
        if (response.data.err === '100') {
          localStorage.setItem('user_info', JSON.stringify(response.data.user))
          this.changeUser(response.data.user)
        } else {
          this.$message.error(response.data.message)
        }
      })
      .catch(function (response) {
        console.log(response)
      })
  }
}
</script>

<style scoped>
  .title{
    width: 100%;
    margin-left: 15px;
    /*margin-top: 20px;*/
    color: #5e5e5e;
    font-size: 16px;
    font-weight: 500;
    height: 40px;
    line-height: 40px;
  }
  .bottom{
    position: absolute;
    width: 523px;
    height: 200px;
    /*background-color: green;*/
    left: 20px;
    top: 190px;
  }
  .top{
    margin-top: 20px;
  }
  .left{
    margin-left: 20px;
    width: 100px;
    height: 100px;
    /*background-color: red;*/
    color: #58c247;
    float: left;
    text-align: center;
    line-height: 100px;
    font-size: 50px;
    border: 1px solid #f2f2f2;
  }
  .right{
    margin-left: 20px;
    float: left;
    width: 400px;
    /*height: 100px;*/
    /*background-color: yellow;*/
  }
  .account{
    width: 100%;
    height: 340px;
    position: relative;
    color: #5e5e5e;
    /*background: blanchedalmond;*/
  }
</style>
