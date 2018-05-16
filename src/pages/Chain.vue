/**
 * Created by Jimmy on 2018/5/16.
 */
<template>
  <div>
    <div class="main-content">
      <div class="sep"></div>
      <div class="search"></div>
      <div class="titles">
        <div class="item b-h">
          <font-awesome-icon :icon="['fab','staylinked']"></font-awesome-icon> 区块高度
        </div>
        <div class="item b-t">
          <font-awesome-icon :icon="['far','clock']"></font-awesome-icon> 发布时间
        </div>
        <div class="item b-a">
          <font-awesome-icon :icon="['fas','map-marker-alt']"></font-awesome-icon> 区块地址
        </div>
        <div class="item b-n">
          <font-awesome-icon :icon="['fas','chart-bar']"></font-awesome-icon> 条目数量
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  .b-h, .b-t, .b-n{
    width: 200px;
  }
  .b-a{
    width: 400px;
  }
  .titles{
    width: 1000px;
    margin: 0 auto;
  }
  .titles .item{
    float: left;
    height: 50px;
    line-height: 50px;
    color: #5e5e5e;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }
  .main-content{
    width: 1240px;
    background-color: white;
    margin: 0 auto;
    height: 500px;
  }
  .sep{
    background-color: #f2f2f2;
    height: 64px;
    width: 100%;
  }
</style>
