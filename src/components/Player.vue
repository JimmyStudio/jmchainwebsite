/**
 * Created by Jimmy on 2018/5/7.
 */
<template>
  <div class="player">
    <div class="line"></div>
    <div class="content">
      <div class="op" @click="backward">
        <font-awesome-icon :icon="['fas','step-backward']" class="op-item"></font-awesome-icon>
      </div>
      <div class="op" @click="play">
        <div v-if="isPlaying">
          <font-awesome-icon :icon="['fas','pause']" class="op-item"></font-awesome-icon>
        </div>
        <div v-else>
          <font-awesome-icon :icon="['fas','play']" class="op-item"></font-awesome-icon>
        </div>
      </div>
      <div class="op" @click="forward">
        <font-awesome-icon :icon="['fas','step-forward']" class="op-item"></font-awesome-icon>
      </div>
      <div class="op nodo" v-bind:class="{doit: randomsound}" @click="randomPlay">
        <font-awesome-icon :icon="['fas','random']" class="op-item"></font-awesome-icon>
      </div>
      <div class="op nodo" v-bind:class="{doit: repeatsound}" @click="loopPlay">
        <font-awesome-icon :icon="['fas','retweet']" class="op-item"></font-awesome-icon>
      </div>
      <div class="start">
        {{currentTime}}
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
        {{duration}}
      </div>
      <div class="op sound">
        <font-awesome-icon :icon="['fas','volume-off']" class="op-item"></font-awesome-icon>
      </div>
      <div class="sound-info" v-if="loaded">
        <div class="cover sound-info-item">
          <img :src="this.domain + works[index2].cover_image_path"/>
          <!--<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1922365848,85870530&fm=27&gp=0.jpg"/>-->
        </div>
        <div class="sound-name sound-info-item">{{works[index2].name}}</div>
        <div class="author-name sound-info-item">{{works[index2].author_name}}</div>
      </div>
      <div class="op">
        <font-awesome-icon :icon="['fas','heart']" class="op-item"></font-awesome-icon>
      </div>
    </div>
    <audio ref="myplayer"></audio>
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
    works: Array
  },
  data () {
    return {
      currentTime: '00:00',
      duration: 0,
      inter: null,
      isPlaying: true,
      loaded: false,
      index2: -1, // 子组件不能修改父组件的值 用index2间接传递 用loaded判断是否需要渲染dom 避免由于index2=-1造成的报错
      repeatsound: false,
      randomsound: false
    }
  },
  watch: {
    index (newvar, oldvar) {
      this.loaded = true
      this.index2 = newvar
    },
    index2 (newvar) {
      let work = this.works[newvar]
      let player = this.$refs.myplayer
      player.src = this.domain + work.local_path
      player.load()
      let that = this
      player.oncanplay = function () {
        that.duration = that.converTime(player.duration)
        player.play()
        that.moveSlider()
      }
      player.onended = function () {
        that.isPlaying = false
      }
    }
  },
  mounted: function () {
    let d1 = this.$refs.wrapper
    let d2 = this.$refs.slider
    let d3 = this.$refs.fill
    this.move(d1, d2, d3)
  },
  methods: {
    randomPlay () {
      var audio = this.$refs.myplayer
      var that = this
      if (this.randomsound) {
        this.randomsound = false
        audio.onended = function () {
          that.isPlaying = false
        }
      } else {
        this.randomsound = true
        audio.onended = function () {
          that.isPlaying = false
          that.index2 = Math.floor(Math.random() * 12)
        }
      }
    },
    loopPlay () {
      var audio = this.$refs.myplayer
      if (this.repeatsound) {
        this.repeatsound = false
      } else {
        this.repeatsound = true
      }
      audio.loop = this.repeatsound
    },
    backward () {
      if (this.index2 > 0) {
        this.index2--
      } else {
        this.$message.warning('已经是第一条')
      }
      console.log(this.index2)
    },
    forward () {
      if (this.index2 < this.works.length - 1) {
        this.index2++
      } else {
        this.$message.warning('已经是最后一条')
      }
      console.log(this.index2)
    },
    play () {
      let player = this.$refs.myplayer
      if (this.isPlaying) {
        clearInterval(this.inter)
        player.pause()
        this.isPlaying = false
      } else {
        player.play()
        this.moveSlider()
        this.isPlaying = true
      }
    },
    moveSlider () {
      let dom2 = this.$refs.slider
      let dom3 = this.$refs.fill
      let audio = this.$refs.myplayer
      let that = this
      this.inter = setInterval(function () {
        that.currentTime = that.converTime(audio.currentTime)
        var offset = parseInt((audio.currentTime / audio.duration) * 600)
        dom2.style.left = offset - 4 + 'px'
        dom3.style.width = offset + 'px'
      }, 100)
    },
    converTime (sec) {
      var h = parseInt(sec / 3600)
      var mleft = sec % 3600
      var m = parseInt(mleft / 60)
      var sleft = parseInt(mleft % 60)
      if (sleft < 10) {
        sleft = '0' + sleft
      }
      if (m < 10) {
        m = '0' + m
      }
      if (h === 0) {
        return m + ':' + sleft
      } else {
        if (m < 10) {
          m = '0' + m
        }
        return h + ':' + m + ':' + sleft
      }
    },
    move (dom1, dom2, dom3) {
      // drag用来存储滑块允许拖拽和不允许拖拽的状态
      var that = this
      let player = this.$refs.myplayer
      var drag = 0
      var currentTime = 0
      // 在滑动条上绑定click事件以实现点击任意位置,自动调整滑块和填充块的效果
      dom1.addEventListener('click', function (e) {
        if (e.target === dom2) {
          // 点击滑块自身不做任何事情
        } else {
          clearInterval(that.inter)
          if (e.offsetX > 600) {
            dom2.style.left = '596px'
            dom3.style.width = '600px'
            currentTime = 600
          } else if (e.offsetX < 0) {
            dom2.style.left = '-4px'
            dom3.style.width = '0px'
            currentTime = 0
          } else {
            dom2.style.left = e.offsetX - 4 + 'px'
            dom3.style.width = e.offsetX + 'px'
            currentTime = e.offsetX
          }
          player.currentTime = (currentTime / 600) * player.duration
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
            clearInterval(that.inter)
            if (e.offsetX > 600) {
              dom2.style.left = '596px'
              dom3.style.width = '600px'
              currentTime = 600
            } else if (e.offsetX < 0) {
              dom2.style.left = '-4px'
              dom3.style.width = '0px'
              currentTime = 600
            } else {
              dom2.style.left = e.offsetX - 4 + 'px'
              dom3.style.width = e.offsetX + 'px'
              currentTime = e.offsetX
            }
            player.currentTime = (currentTime / 600) * player.duration
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
  .nodo{
    color: #888;
  }
  .doit{
    color: #333333;
  }
</style>
