/**
 * Created by Jimmy on 2018/5/2.
 */
<template>
  <div class="sale-item">
    <div class="cover item">
      <div class="mask" v-on:click="showDetail"></div>
      <img :src="work.coverUrl"/>
    </div>
    <div class="desc item">
      <div class="name">{{ work.name }}</div>
      <div class="tags">
        <el-tag class="tag" size="medium" :key="index" v-for="(item , index) in work.tags">{{item}}</el-tag>
      </div>
    </div>
    <div class="duration item">{{work.duration}}</div>
    <div class="price item">{{work.price}} Token</div>
    <div class="amount item">{{work.amount}}</div>
    <div class="like item">
      <font-awesome-icon :icon="['far','heart']"></font-awesome-icon>
    </div>
    <div class="buy item">
      <el-button>
        <font-awesome-icon :icon="['fas','shopping-cart']"></font-awesome-icon>  加入购物车
      </el-button>
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
  .like {
    margin-top: 30px;
  }
  .buy{
    margin-left: 60px;
    margin-top: 20px;
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
    background-color: red;
    margin: 15px;
    position: relative;
  }
  .item {
    float: left;
  }
  .sale-item{
    width: 100%;
    height: 90px;
    /*padding: 20px;*/
    /*background-color: yellow;*/
    border-bottom: 1px solid #f2f2f2;
    color: #5e5e5e;
    font-weight: 500;
    background-color: white;
  }
  .buy{
    margin-left: 60px;
    margin-top: 20px;
  }
</style>
