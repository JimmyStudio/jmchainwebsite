/**
 * Created by Jimmy on 2018/4/27.
 */
<template>
  <div>
    <div class="header">
      <mynav></mynav>
    </div>
    <div class="sep"></div>
    <div class="content">
      <div class="left-content">
        <el-menu
          default-active="1"
          class="el-menu-vertical"
          @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-news"></i>
            <span slot="title">账户</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">作品</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-upload"></i>
            <span slot="title">上传</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right-content">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import mynav from '../components/Nav.vue'

export default {
  components: {
    mynav
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1') {
        this.$router.push('/management/account')
      } else if (key === '2') {
        this.$router.push('/management/works')
      } else {
        this.$router.push('/management/upload')
      }
    }
  }
}
</script>

<style scoped>
  .fade-enter {
    opacity:0;
  }
  .fade-leave{
    opacity:1;
  }
  .fade-enter-active{
    transition:opacity .3s;
  }
  .fade-leave-active{
    opacity:0;
    transition:opacity .3s;
  }
  .left-content{
    width: 120px;
    float: left;
  }
  .right-content{
    margin-left: 4px;
    float: left;
    width: 1116px;
    background: white;
  }
  .el-menu-vertical{
    border: none;
  }
  .sep{
    width: 100%;
    height: 4px;
  }
  .content{
    width: 1240px;
    /*height: 900px;*/
    background: white;
    margin: 0 auto;
  }
  .header{
    width: 1240px;
    height: 60px;
    background: white;
    margin: 0 auto;
  }
  /*.logo{*/
    /*float: left;*/
    /*color: #ff5622;*/
  /*}*/
  /*.big{*/
    /*font-size: 18px;*/
    /*font-weight: 500;*/
    /*line-height: 60px;*/
    /*margin-left: 30px;*/
    /*margin-right: 5px;*/
  /*}*/
  /*.small{*/
    /*font-size: 12px;*/
    /*margin-top: 15px;*/
    /*font-weight: 500;*/
  /*}*/
  /*.left{*/
    /*margin-left: 40px;*/
    /*float: left;*/
    /*height: 60px;*/
    /*line-height: 60px;*/
    /*font-size: 16px;*/
    /*color: #5e5e5e;*/
    /*font-weight: 500;*/
  /*}*/
  /*.op{*/
    /*float: right;*/
    /*height: 60px;*/
    /*margin-right: 20px;*/
    /*!*width: 180px;*!*/
    /*!*background: red;*!*/
  /*}*/
  /*.op .item{*/
    /*margin-top: 10px;*/
    /*color: #5e5e5e;*/
  /*}*/
  /*.op .item, .left, .el-dropdown-link:hover{*/
    /*cursor: pointer;*/
  /*}*/
  /*.el-icon-message{*/
    /*font-size: 20px;*/
  /*}*/
  /*.user{*/
    /*margin-top: 10px;*/
    /*margin-left: 40px;*/
  /*}*/
  /*.username{*/
    /*color: #5e5e5e;*/
  /*}*/
</style>
