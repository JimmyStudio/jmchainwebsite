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
      <div class="wrapper" ref="wrapper">
        <div class="center-line"></div>
        <div class="fill" ref="fill">
          <div class="cover-line"></div>
        </div>
        <div class="slider" ref="slider">
        </div>
      </div>
      <div class="start">
        04:30
      </div>
      <div class="op sound">
        <font-awesome-icon :icon="['fas','volume-off']" class="op-item"></font-awesome-icon>
      </div>
      <div class="sound-info">
        <div class="cover sound-info-item">
          <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1922365848,85870530&fm=27&gp=0.jpg"/>
        </div>
        <div class="sound-name sound-info-item">片头曲</div>
        <div class="author-name sound-info-item">admin</div>
      </div>
      <div class="op">
        <font-awesome-icon :icon="['fas','heart']" class="op-item"></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentTime: 0
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      let d1 = this.$refs.wrapper
      let d2 = this.$refs.slider
      let d3 = this.$refs.fill
      this.move(d1, d2, d3)
    })
  },
  methods: {
    move (dom1, dom2, dom3) {
      // drag用来存储滑块允许拖拽和不允许拖拽的状态
      var drag = 0
      // 在滑动条上绑定click事件以实现点击任意位置,自动调整滑块和填充块的效果
      dom1.addEventListener('click', function (e) {
        if (e.target === dom2) {
          // 点击滑块自身不做任何事情
        } else {
          if (e.offsetX > 600) {
            dom2.style.left = '596px'
            dom3.style.width = '600px'
            this.currentTime = 600
          } else if (e.offsetX < 0) {
            dom2.style.left = '-4px'
            dom3.style.width = '0px'
            this.currentTime = 0
          } else {
            dom2.style.left = e.offsetX - 4 + 'px'
            dom3.style.width = e.offsetX + 'px'
            this.currentTime = e.offsetX
          }
        }
      })
      // 修改drag的状态
      dom1.addEventListener('mousedown', function () {
        drag = 1
      })
      // 释放按钮绑定在document上, 保证在整个页面容器里面任何地方松开按钮都能修改drag的状态
      document.addEventListener('mouseup', function () {
        drag = 0
      })
      // 使滑块和填充块跟随移动,这里使用的pageX,需要计算和视窗左侧的距离而不是和滑动块左侧的距离
      dom1.addEventListener('mousemove', function (e) {
        if (drag === 1) {
          if (e.target === dom2) {
            // 点击滑块自身不做任何事情
          } else {
            if (e.offsetX > 600) {
              dom2.style.left = '596px'
              dom3.style.width = '600px'
              this.currentTime = 600
            } else if (e.offsetX < 0) {
              dom2.style.left = '-4px'
              dom3.style.width = '0px'
              this.currentTime = 600
            } else {
              dom2.style.left = e.offsetX - 4 + 'px'
              dom3.style.width = e.offsetX + 'px'
              this.currentTime = e.offsetX
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
  .cover img{
    width: 40px;
    height: 40px;
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
  }
  .sound-info-item{
    float: left;
  }
  .sound-name{
    margin-top: 8px;
    margin-left: 5px;
    height: 20px;
    width: 120px;
    /*background-color: yellow;*/
    color: #333;
    font-size: 14px;
    line-height: 20px;
  }
  .author-name{
    position: relative;
    margin-left: 5px;
    color: #999;
    height: 14px;
    width: 120px;
    /*background-color: blue;*/
    font-size: 12px;
    line-height: 14px;
  }
  .cover{
    width: 40px;
    height: 40px;
    margin: 5px 5px;
    background-color: red;
  }
  .sound-info{
    position: relative;
    float: left;
    width: 175px;
    height: 50px;
  }
  .wrapper{
    float: left;
    position: relative;
    margin-left: 20px;
    /*margin-top: 100px;*/
    width:600px;
    height:50px;
    cursor:pointer;
    /*background: red;*/
    /*border:1px solid darkgray;*/
  }
  /*将滑块和填充块设置成inline-block,保证他们在同一行内*/
  .slider{
    position: absolute;
    left: -4px;
    top: 21px;
    width:8px;
    height:8px;
    border-radius: 4px;
    background-color: #ff5622;
    cursor:pointer;
  }
  .fill{
    position: absolute;
    width:0;
    height:50px;
    /*background-color: #ff5622;*/
  }
  .center-line{
    width: 600px;
    height: 1px;
    position: absolute;
    background-color: #cecece;
    left: 0;
    top: 24px;
  }
  .cover-line{
    width: 100%;
    height: 1px;
    position: absolute;
    background-color: #ff5622;
    left: 0;
    top: 24px;
  }
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
  .sound{
    margin-left: 25px;
  }
</style>
