/**
 * Created by Jimmy on 2018/4/25.
 */
<template>
  <div>
    <div class="cover">
      <div class="mask" v-on:click="showDetail"></div>
      <img :src="this.domain + work.cover_image_path"/>
    </div>
    <div class="desc">
      <div class="name">{{work.name}}</div>
      <div class="author">{{work.author_name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
    work: Object
  },
  methods: {
    showDetail: function () {
      this.$emit('showDetail', this.index)
    }
  }
}
</script>

<style scoped>
  .cover{
    width: 180px;
    height: 180px;
    /*background: red;*/
    position: relative;
  }
  .mask{
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0;
    position: absolute;
    left:0;
    top:0;
    z-index: 2;
  }
  .mask:hover{
    opacity: 0.4;
    cursor: pointer;
  }
  .desc{
    width: 180px;
    height: 40px;
  }
  .name{
    margin-top: 3px;
    width: 180px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    color: #333;
    font-weight: 500;
  }
  .author{
    width: 180px;
    height: 13px;
    font-size: 12px;
    line-height: 13px;
    color: #999;
  }
  .cover img{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    /*border: none;*/
  }
</style>
