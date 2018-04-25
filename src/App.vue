<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
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
</style>
