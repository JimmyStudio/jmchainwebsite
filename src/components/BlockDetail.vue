/**
 * Created by Jimmy on 2018/5/18.
 */
<template>
  <div>
    <div class="main">
      <div class="lr">
        {{$route.params.hash}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  .lr{
    padding: 20px;
  }
  .main{
    /*width: 1000px;*/
    height: 500px;
    /*background-color: red;*/
    /*padding-top: 20px;*/
    margin: 0 auto;
  }
</style>
