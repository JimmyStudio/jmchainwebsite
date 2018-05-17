/**
 * Created by Jimmy on 2018/5/17.
 */
<template>
  <div class="block">
    <div class="b-item b-item-1">{{block.number}}</div>
    <div class="b-item b-item-2">{{block.timestamp}}</div>
    <div class="b-item b-item-3">{{block.hash}}</div>
    <div class="b-item b-item-4">{{block.transactions.length}}</div>
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
    block: Object
  }
}
</script>

<style scoped>
  .block{
    width: 1000px;
    height: 60px;
    margin: 10px 0;
    /*border: 1px solid #5e5e5e;*/
    /*background-color: #22252f;*/
    font-size: 14px;
    text-align: center;
    line-height: 60px;
    color: #5e5e5e;
    font-weight: 500;
    cursor: pointer;
    -webkit-box-shadow:0 0 2px 2px #5e5e5e;
    -moz-box-shadow:0 0 2px 2px #5e5e5e;
    box-shadow:0 0 2px 2px #5e5e5e;
  }
  .b-item{
    float: left;
  }
  .b-item-1, .b-item-2, .b-item-4{
    width: 150px;
  }
  .b-item-3{
    width: 550px;
  }
  .b-item-1{
    /*color: #57a3fb;*/
  }
</style>
