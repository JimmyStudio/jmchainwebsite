/**
 * Created by Jimmy on 2018/5/16.
 */
<template>
  <div>
    <div class="main-content">
      <div class="sep"></div>
      <div class="search">
        <el-input
          class="search-input"
          placeholder="Hash"
          suffix-icon="el-icon-search"
          v-model="search">
        </el-input>
      </div>
      <div class="titles">
        <div class="item b-h">
          <font-awesome-icon :icon="['fas','th']"></font-awesome-icon> BlockNumber
        </div>
        <div class="item b-t">
          <font-awesome-icon :icon="['far','clock']"></font-awesome-icon> Timestamp
        </div>
        <div class="item b-a">
          <font-awesome-icon :icon="['fab','staylinked']"></font-awesome-icon> Hash
        </div>
        <div class="item b-n">
          <font-awesome-icon :icon="['fas','chart-bar']"></font-awesome-icon> Transactions
        </div>
      </div>
      <div class="blocks">
        <block v-for="(item , index) in blocks" :key="index" :block="item" :index="index"></block>
      </div>
    </div>
  </div>
</template>

<script>
import block from '../components/Block.vue'
export default {
  components: {
    block
  },
  data () {
    return {
      search: '',
      blocks: [{}]
    }
  },
  mounted: function () {
    this.$http.get(this.domain + '/blocks')
      .then((response) => {
        if (response.data.err === '100') {
          this.blocks = response.data.blocks
        } else {
          this.$message.error(response.data.message)
        }
      })
      .catch(function (response) {
        console.log(response)
      })
  }
}
</script>

<style scoped>
  .search >>> input{
    border-color: #5e5e5e;
    color: #5e5e5e;
  }
  .search >>> span{
    color: #5e5e5e;
    cursor: pointer;
  }
  .search{
    width: 600px;
    /*height: 60px;*/
    /*background-color: blue;*/
    /*background-color: #151823;*/
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 10px;
  }
  .blocks{
    width: 1000px;
    /*height: 500px;*/
    background-color: white;
    margin: 0 auto;
  }
  .b-h, .b-t, .b-n{
    width: 150px;
  }
  .b-a{
    width: 550px;
  }
  .titles{
    width: 1000px;
    height: 50px;
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
    padding-bottom: 20px;
    /*height: 500px;*/
  }
  .sep{
    background-color: #f2f2f2;
    height: 64px;
    width: 100%;
  }
</style>
