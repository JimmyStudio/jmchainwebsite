/**
 * Created by Jimmy on 2018/4/28.
 */
<template>
  <div class="works">
    <div class="title">我的作品</div>
    <div class="titles">
      <div class="name item">作品</div>
      <div class="duration item">时长</div>
      <div class="price item">售价</div>
      <div class="amount item">已售数量</div>
      <div class="download item">下载</div>
    </div>
    <workitem v-for="(item , index) in works" :key="index" :work="item" :index="index"></workitem>
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
      works: [{}]
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted: function () {
    let tk = this.user.token
    this.$http.post(this.domain + '/myworks', {token: tk})
      .then((response) => {
        this.works = response.data.list
      })
      .catch(function (response) {
        console.log(response)
      })
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
</style>
