/**
 * Created by Jimmy on 2018/4/28.
 */
<template>
  <div class="works">
    <div class="title">我发布的作品</div>
    <div v-if="works[0]">
      <div class="titles">
        <div class="name item">作品</div>
        <div class="duration item">时长</div>
        <div class="price item">售价</div>
        <div class="amount item">已售数量</div>
        <div class="download item">下载</div>
      </div>
      <workitem v-for="(item , index) in works" :key="index" :work="item" :index="index" v-on:downloadWork="download"></workitem>
    </div>
    <div v-else="">
      <div class="empty">
        您尚未发布任何作品
      </div>
    </div>
    <div class="title">我购买的作品</div>
    <div v-if="buylist[0]">
      <div class="titles">
        <div class="name item">作品</div>
        <div class="duration item">时长</div>
        <div class="price item">售价</div>
        <div class="amount item">已售数量</div>
        <div class="download item">下载</div>
      </div>
      <workitem v-for="(item , index) in buylist" :key="index" :work="item" :index="index" v-on:downloadWork="download"></workitem>
    </div>
    <div v-else>
      <div class="empty">
        您尚未购买任何作品
      </div>
    </div>
  </div>
</template>

<script>
import workitem from '../components/WorkItem.vue'
import {mapGetters} from 'vuex'
export default {
  components: {
    workitem
  },
  data () {
    return {
      works: [{}],
      buylist: [{}]
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted: function () {
    let tk = this.user.token
    this.$http.post(this.domain + '/myworks', {token: tk})
      .then((response) => {
        if (response.data.err === '100') {
          this.works = response.data.sendlist
          this.buylist = response.data.buylist
        } else if (response.data.err === '002') {
          this.$message.error(response.data.message)
        } else {
          this.$message.error(response.data)
        }
      })
      .catch(function (response) {
        console.log(response)
      })
  },
  methods: {
    download (index) {
      let work = this.works[index]
      let eleLink = document.createElement('a')
      eleLink.download = work.name
      eleLink.style.display = 'none'
      eleLink.href = this.domain + work.local_path
      // 触发点击
      document.body.appendChild(eleLink)
      eleLink.click()
      // 然后移除
      document.body.removeChild(eleLink)
    }
  }
}
</script>

<style scoped>
  .name{
    width: 505px;
  }
  .duration{
    width: 75px;
  }
  .price, .amount{
    width: 210px;
  }
  .download{
    width: 60px;
  }
  .titles{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    color: #5e5e5e;
  }
  .item{
    float: left;
  }
  .title{
    margin-left: 15px;
    /*margin-top: 20px;*/
    color: #5e5e5e;
    font-size: 16px;
    font-weight: 500;
    height: 40px;
    line-height: 40px;
  }
  .works{
    width: 100%;
    /*height: 200px;*/
    /*background: red;*/
  }
  .empty{
    padding: 10px 0 20px 0;
    text-align: center;
    color: #5e5e5e;
  }
</style>
