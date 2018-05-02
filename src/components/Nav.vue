/**
 * Created by Jimmy on 2018/5/2.
 */
<template>
  <div class="nav">
    <div class="logo big">J&M Chain</div>
    <div class="logo small">Beta</div>
    <div class="left" @click="openHome">首页</div>
    <div class="left">音效库</div>
    <div class="op">
      <el-badge :value="200" :max="99" class="item">
        <i class="el-icon-message" ></i>
      </el-badge>
      <el-dropdown class="user" placement="top-start">
          <span class="el-dropdown-link">
            <el-button type="success" circle>
              <font-awesome-icon :icon="['fas','user']"></font-awesome-icon>
            </el-button>
            <span class="username">用户138****7241</span>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .nav{
    width: 1240px;
    height: 60px;
    /*background: white;*/
    margin: 0 auto;
  }
  .logo{
    float: left;
    color: #ff5622;
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
    font-weight: 500;
  }
  .left{
    margin-left: 40px;
    float: left;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    color: #5e5e5e;
    font-weight: 500;
  }
  .op{
    float: right;
    height: 60px;
    margin-right: 20px;
    /*width: 180px;*/
    /*background: red;*/
  }
  .op .item{
    margin-top: 10px;
    color: #5e5e5e;
  }
  .op .item, .left, .el-dropdown-link:hover{
    cursor: pointer;
  }
  .el-icon-message{
    font-size: 20px;
  }
  .user{
    margin-top: 10px;
    margin-left: 40px;
  }
  .username{
    color: #5e5e5e;
  }
</style>
