/**
 * Created by Jimmy on 2018/5/2.
 */
<template>
  <div class="sale-item">
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
    <div class="like item" @click="like">
      <div v-if="work.like">
        <font-awesome-icon class="liked" :icon="['fas','heart']"></font-awesome-icon>
      </div>
      <div v-else>
        <font-awesome-icon :icon="['far','heart']"></font-awesome-icon>
      </div>
    </div>
    <div class="buy item">
      <el-button @click="buy">
        <font-awesome-icon :icon="['fab','ethereum']"></font-awesome-icon>       购 买
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
    },
    like () {
      this.$emit('like', this.index)
    },
    buy () {
      this.$emit('buy', this.index)
    }
  }
}
</script>

<style scoped>
  .liked{
    color: #ff5622;
  }
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
    /*background-color: red;*/
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
  .like{
    cursor: pointer;
  }
  .buy{
    margin-left: 75px;
    margin-top: 20px;
  }
</style>
