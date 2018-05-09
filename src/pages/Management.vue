/**
 * Created by Jimmy on 2018/4/27.
 */
<template>
  <div>
    <div class="main-content">
      <div class="sep"></div>
      <div class="content">
        <div class="left-content">
          <el-menu
            :default-active="active"
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: '1'
    }
  },
  mounted: function () {
    let rtn = this.$router.currentRoute.name
    switch (rtn) {
      case 'Upload':
        this.active = '3'
        break
      case 'Account':
        this.active = '1'
        break
      case 'MyWorks':
        this.active = '2'
        break
      default:
        break
    }
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
  .main-content{
    /*position: relative;*/
    width: 1240px;
    margin:  0 auto;
    /*background: red;*/
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
    margin-top: 60px;
  }
  .content{
    /*width: 1240px;*/
    /*height: 900px;*/
    background: white;
    /*margin: 0 auto;*/
  }
</style>
