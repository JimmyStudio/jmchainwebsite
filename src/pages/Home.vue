/**
 * Created by Jimmy on 2018/4/24.
 */
<template>
  <div class="main">
    <div class="main-content" v-bind:class="{mb: showPlayer}">
      <div class="banner">
        <div class="car">
          <el-carousel trigger="click" height="450px" :interval=car_interval>
            <el-carousel-item>
              <div class="car-item car-1">
                <p class="title">致力于泛文娱区块链的场景实现和价值挖掘</p>
                <p class="detail">围绕数字媒体，新媒体，在版权，云分发交易，共识机制，应用等环节打造去中心化的区块链。</p>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="car-item car-2">
                <p class="title">J&M区块链引擎</p>
                <p class="detail">自主研发的基于区块链开发引擎，重构泛娱乐价值、重构网络生态。</p>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="car-item car-3">
                <p class="title">J&M泛娱乐分发平台</p>
                <p class="detail">在基础结构和协议层面上完美解决泛娱乐IP的所有权和交易分享。</p>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="op">
        <div class="search">
          <input class="input" placeholder="搜索作品、作者、类型..."/>
          <i class="el-icon-search"></i>
        </div>
        <div class="upload" v-on:click="upload">上传</div>
      </div>
      <div class="recommend">
        <div class="rec-title"> —— 热门推荐 —— </div>
        <div class="rec-content-wrap">
          <div class="rec-content">
            <work class="rec-work" v-for="(item,index) in works" :key="index" :index="index" :work="item" v-on:showDetail="showWorkDetail"></work>
          </div>
        </div>
        <div class="explore">
          <div class="more" @click="openSounds">发现更多</div>
        </div>
      </div>
      <div class="bot-line"></div>
      <div class="bottom">
        <div class="bot-item bot-left">
          <div class="left-item left-title">J&M Chain</div>
          <div class="left-item">
            <i class="el-icon-location-outline"></i><span>上海市浦东新区浦东南路3456号江天大厦</span>
          </div>
          <div class="left-item">
            <i class="el-icon-message"></i><span>hezuo@jinmiok.com</span>
          </div>
          <div class="left-item">
            <i class="el-icon-phone-outline"></i><span>400-9659600</span>
          </div>
        </div>
        <div class="bot-item bot-right">
          <div class="right-item">
            <div class="left-item left-title">条款声明</div>
            <div class="left-item">
              <span>网站条款</span>
            </div>
            <div class="left-item">
              <span>版权声明</span>
            </div>
          </div>
          <div class="right-item">
            <div class="left-item left-title">关于我们</div>
            <div class="left-item">
              <span>关于J&M</span>
            </div>
            <div class="left-item">
              <span>产品服务</span>
            </div>
            <div class="left-item">
              <span>联系我们</span>
            </div>
          </div>
          <div class="right-item">
            <div class="left-item left-title">帮助信息</div>
            <div class="left-item">
              <span>常见问题</span>
            </div>
            <div class="left-item">
              <span>授权查询</span>
            </div>
            <div class="left-item">
              <span>意见反馈</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      © 2018 劲米科技
    </div>
    <div class="player-content" v-show="showPlayer">
      <myplayer :index="index" :works="works"></myplayer>
    </div>
  </div>
</template>

<script>
import work from '../components/Work.vue'
import myplayer from '../components/Player.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    work,
    myplayer
  },
  data () {
    return {
      index: -1,
      car_interval: 3000,
      showPlayer: false,
      works: [{}]
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted: function () {
    var tk = this.user.token
    this.$http.post(this.domain + '/recommend', {token: tk})
      .then((response) => {
        this.works = response.data.list
      })
      .catch(function (response) {
        console.log(response)
      })
  },
  methods: {
    showWorkDetail: function (index) {
      this.index = index
      this.showPlayer = true
    },
    upload: function () {
      let user = localStorage.getItem('user_info')
      if (user) {
        this.$router.push({path: '/management/upload'})
      } else {
        this.$message.error('请登录后再进行操作！')
      }
    },
    openSounds () {
      this.$router.push('/sounds')
    }
  }
}
</script>

<style scoped>
  .main{
    /*background: red;*/
    /*width: 1240px;*/
    /*margin: 0 auto;*/
  }
  .main-content{
    /*position: relative;*/
    width: 1240px;
    margin:  0 auto;
    /*background: red;*/
  }
  .mb{
    margin-bottom: 50px;
  }
  .banner{
    width: 100%;
    height: 450px;
    margin: 0 auto;
    position: relative;
  }
  .car{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    left: 0;
    top:0;
  }
  .car-1{
    background: url("../assets/car_1.jpeg");
  }
  .car-2{
    background: url("../assets/car_2.jpeg");
  }
  .car-3{
    background: url("../assets/car_3.jpeg");
  }
  .car-item{
    width: 100%;
    height: 100%;
  }
  .car-item p {
    color: white;
    text-align: center;
    width: 100%;
  }
  .car-item .title{
    position: absolute;
    font-size: 30px;
    line-height: 30px;
    margin-top: 200px;
    font-weight: 500;
  }
  .car-item .detail{
    position: absolute;
    margin-top: 240px;
  }
  .op{
    background: white;
    margin: 0 auto;
    width: 100%;
    height: 110px;
    position: relative;
  }
  .search{
    background: #f2f2f2;
    width: 600px;
    height: 50px;
    margin-left: 245px;
    margin-top: 40px;
    position: absolute;
    border-radius: 6px;
  }
  .input{
    border: 0;
    outline: none;
    width: 550px;
    height: 50px;
    background: #f2f2f2;
    border-radius: 6px;
    color: #666674;
    font-size: 16px;
    font-weight: 500;
    padding-left: 20px;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #aab0ad; opacity:1;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #aab0ad;opacity:1;
  }

  input:-ms-input-placeholder{
    color: #aab0ad;opacity:1;
  }

  input::-webkit-input-placeholder{
    color: #aab0ad;opacity:1;
  }
  .el-icon-search{
    color: #666674;
  }
  .el-icon-search:hover{
    cursor: pointer;
  }
  .upload{
    background-color: #ff5622;
    width: 100px;
    height: 50px;
    position: absolute;
    margin-top: 40px;
    margin-left: 895px;
    line-height: 50px;
    color: white;
    text-align: center;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }
  .recommend{
    width: 100%;
    background: white;
    margin: 0 auto;
  }
  .rec-title{
    text-align: center;
    color: #333;
    font-size: 20px;
    font-weight: 500;
    height: 50px;
    line-height: 50px;
  }
  .rec-content-wrap{
    width: 1212px;
    margin: 0 auto;
  }
  .rec-content{
    /*padding: 10px;*/
    width: 1212px;
    display: -webkit-box;   /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;  /* OLD - Firefox 19- H5不用考虑 */
    display: flex; /* NEW, Spec - Opera 12.1, Firefox 20+ */
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .rec-work{
    flex: 0 0 auto;
    /*margin: 0 5px;*/
  }
  .explore{
    width: 100%;
    height: 90px;
    padding-top: 10px;
  }
  .more{
    margin: 0 auto;
    background-color: #ff5622;
    width: 120px;
    height: 50px;
    color: white;
    line-height: 50px;
    text-align: center;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }
  .bot-line{
    /*width: 1140px;*/
    height: 1px;
    background-color: #f2f2f2;
    margin: 0 auto;
  }
  .bottom{
    /*width: 100%;*/
    /*height: 250px;*/
    margin: 0 auto;
    background-color: white;
    display: flex;
    color: #5e5e5e;
    /*padding-top: 40px;*/
  }
  .bot-item{
    flex: 0 0 auto;
    width: 580px;
    padding: 20px 20px 0 20px;
  }
  .bot-left{
    /*background-color: yellow;*/
  }
  .bot-right{
    display: flex;
    justify-content: space-around;
    /*background-color: yellow;*/
  }
  .left-item{
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    /*background-color: red;*/
  }
  .left-item:hover{
    cursor: pointer;
  }
  .left-item i {
    margin-right: 10px;
  }
  .left-title{
    height: 50px;
    font-size: 18px;
    font-weight: 700;
    line-height: 50px;
  }
  .right-item{
    flex: 0 0 auto;
    /*width: 160px;*/
    /*background: red;*/
  }
  .copyright{
    /*margin: 0 auto;*/
    /*width: 100%;*/
    height: 20px;
    /*background-color: #5e5e5e;*/
    color: #5e5e5e;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    line-height: 20px;
  }
</style>
