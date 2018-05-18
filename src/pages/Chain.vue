/**
 * Created by Jimmy on 2018/5/16.
 */
<template>
  <div>
    <div class="main-content">
      <div class="sep"></div>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
  .main-content{
    width: 1240px;
    background-color: white;
    margin: 0 auto;
    padding-bottom: 20px;
    /*height: 500px;*/
  }
  .sep{
    background-color: #f2f2f2;
    height: 64px;
    width: 100%;
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
