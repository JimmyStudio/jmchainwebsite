<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <!--<div class="copyright">-->
      <!--© 2018 劲米科技-->
    <!--</div>-->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, /* structural elements 结构元素 */
  dl, dt, dd, ul, ol, li, /* list elements 列表元素 */
  pre, /* text formatting elements 文本格式元素 */
  form, fieldset, legend, button, input, textarea, /* form elements 表单元素 */
  th, td /* table elements 表格元素 */ {
    margin: 0;
    padding: 0;
  }

  li{
    list-style: none;
  }

  a{
    text-decoration: none;
  }
  html{
    background-color: #f2f2f2;
  }
  #app {
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
  /*.app{*/
    /*position: relative;*/
  /*}*/
  /*.copyright{*/
    /*margin: 0 auto;*/
    /*width: 100%;*/
    /*height: 20px;*/
    /*!*background-color: #5e5e5e;*!*/
    /*color: #5e5e5e;*/
    /*font-size: 12px;*/
    /*font-weight: 500;*/
    /*text-align: center;*/
    /*line-height: 20px;*/
    /*position: absolute;*/
    /*left: 0;*/
    /*bottom: 0;*/
  /*}*/
</style>
