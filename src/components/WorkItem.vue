/**
 * Created by Jimmy on 2018/4/28.
 */
<template>
  <div class="work-item">
    <div class="cover item">
      <div class="mask" v-on:click="showDetail"></div>
      <img :src="this.domain + work.cover_image_path"/>
    </div>
    <div class="desc item">
      <div class="name">{{ work.name }}</div>
      <div class="tags">
        <el-tag class="tag" size="medium" :key="index" v-for="(item , index) in work.tags">{{item.name}}</el-tag>
      </div>
    </div>
    <div class="duration item">{{work.duration}}</div>
    <div class="price item">{{work.price}} JMT</div>
    <div class="amount item">{{work.use_sell_count}}</div>
    <div class="download item" @click="downloadWork">
      <el-tooltip class="item" effect="dark" content="下载" placement="right">
        <el-button type="primary" size="mini" icon="el-icon-download"></el-button>
      </el-tooltip>
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
    showDetail (index) {
      console.log(index)
    },
    downloadWork () {
      this.$emit('downloadWork', this.index)
    }
  }
}
</script>

<style scoped>
  .cover img{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
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
  .price, .amount{
    width: 200px;
    height: 60px;
    /*background-color: red;*/
    margin: 15px 15px 15px 0;
    text-align: center;
    line-height: 60px;
  }
  .download {
    margin-top: 30px;
  }
  .duration{
    width: 60px;
    height: 60px;
    /*background-color: red;*/
    margin: 15px 15px 15px 0;
    text-align: center;
    line-height: 60px;
  }
  .tag{
    margin-right: 10px;
  }
  .name{
    height: 30px;
    line-height: 30px;
    font-weight: 400;
  }
  .tags{
    height: 30px;
    /*width: 100px;*/
    /*background-color: red;*/
  }
  .desc{
    width: 400px;
    height: 60px;
    /*background-color: yellow;*/
    margin: 15px 15px 15px 0;
  }
  .cover{
    width: 60px;
    height: 60px;
    /*background-color: red;*/
    margin: 15px;
    position: relative;
  }
  .item {
    float: left;
  }
  .work-item{
    width: 100%;
    height: 90px;
    /*padding: 20px;*/
    /*background-color: yellow;*/
    border-bottom: 1px solid #f2f2f2;
  }
</style>
