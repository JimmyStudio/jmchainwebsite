/**
 * Created by Jimmy on 2018/5/7.
 */
<template>
  <div class="player">
    <div class="line"></div>
    <div class="content">
      <div class="op">
        <font-awesome-icon :icon="['fas','step-backward']" class="op-item"></font-awesome-icon>
      </div>
      <div class="op">
        <font-awesome-icon :icon="['fas','play']" class="op-item"></font-awesome-icon>
        <!--<font-awesome-icon :icon="['fas','pause']" class="op-item"></font-awesome-icon>-->
      </div>
      <div class="op">
        <font-awesome-icon :icon="['fas','step-forward']" class="op-item"></font-awesome-icon>
      </div>
      <div class="op">
        <font-awesome-icon :icon="['fas','random']" class="op-item"></font-awesome-icon>
      </div>
      <div class="op">
        <font-awesome-icon :icon="['fas','retweet']" class="op-item"></font-awesome-icon>
      </div>
      <div class="start">
        00:00
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  .player{
    width: 100%;
    position: fixed;
    z-index: 300;
    background-color: #f2f2f2;
    left: 0;
    bottom: 0;
    /*top: 2000px;*/
  }
  .line{
    width: 100%;
    height: 1px;
    background-color: #cecece;
  }
  .content{
    width: 1240px;
    height: 50px;
    margin: 0 auto;
  }
  .op, .start{
    color: #333333;
    float: left;
    font-size: 12px;
    width: 40px;
    height: 50px;
    line-height: 50px;
  }
  .op-item{
    margin: 20px 10px;
  }
  .op:hover{
    cursor: pointer;
  }
  .start{
    margin-left: 30px;
    color: #ff5622;
  }
</style>
