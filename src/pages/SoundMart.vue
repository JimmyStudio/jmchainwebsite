/**
 * Created by Jimmy on 2018/5/2.
 */
<template>
  <div>
    <div class="main-content">
      <div class="header">
        <div class="search">
          <el-input class="search-input"
                    placeholder="搜索作品、作者、类型..."
                    v-model="search">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="searchSound"></i>
          </el-input>
        </div>
        <div class="mask"></div>
        <div class="top"></div>
      </div>
      <div class="content">
        <div class="titles">
          <div class="name item">作品</div>
          <div class="duration item">时长</div>
          <div class="price item">售价</div>
          <div class="amount item">已售数量</div>
          <div class="likes item">收藏</div>
          <div class="buys item">购买</div>
        </div>
        <div class="works">
          <saleitem v-for="(item , index) in works" :key="index" :work="item" :index="index" v-on:buy="buy"></saleitem>
        </div>
        <div class="pags">
          <div class="page-tool">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog">
      <el-dialog
        title="购买"
        :visible.sync="dialogVisible"
        width="30%"
        :modal="modal"
        :center="dialogCenter">
        <div class="eth">
          <font-awesome-icon :icon="['fab','ethereum']"></font-awesome-icon>
          <font-awesome-icon class="exc" :icon="['fas','exchange-alt']"></font-awesome-icon>
          <font-awesome-icon class="wallet" :icon="['far','credit-card']"></font-awesome-icon>
        </div>
        <div class="info">
          您将要支付 <span>{{price}} </span> Coin 用于购买此作品
        </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="buyit">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import saleitem from '../components/SaleItem.vue'
import {mapGetters} from 'vuex'
export default {
  components: {
    saleitem
  },
  data () {
    return {
      pageSize: 100,
      total: 1000,
      currentPage: 1,
      search: '',
      works: [{}],
      dialogVisible: false,
      dialogCenter: true,
      modal: false,
      price: 0,
      index: 0
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted: function () {
    this.$http.post(this.domain + '/soundmart', {token: this.user.token})
      .then((response) => {
        this.works = response.data.list
      })
      .catch(function (response) {
        console.log(response)
      })
  },
  methods: {
    buyit () {
      let work = this.works[this.index]
      this.$http.post(this.domain + '/buysound',
        {token: this.user.token,
          ipid: work.id,
          fromuserid: work.sender_id,
          price: work.price
        })
        .then((response) => {
          if (response.data.err === '100') {
            this.$notify.success({
              title: '成功',
              message: '购买成功'
            })
          } else {
            this.$message.error(response.data.message)
          }
          this.dialogVisible = false
          work.use_sell_count += 1
        })
        .catch(function (response) {
          console.log(response)
          this.dialogVisible = false
        })
    },
    buy (index) {
      let work = this.works[index]
      this.index = index
      if (work.sender_id === this.user.id) {
        this.$message.error('无法购买您自己发布的作品！')
      } else {
        this.dialogVisible = true
        this.price = work.price
      }
    },
    searchSound () {
      console.log(this.search)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>
  .main-content{
    width: 1240px;
    margin:  0 auto;
  }
  .page-tool{
    width: 500px;
    margin: 0 auto;
  }
  .pags{
    width: 100%;
    background-color: white;
    height: 40px;
    padding-top: 10px;
  }
  .name{
    width: 505px;
  }
  .duration{
    width: 75px;
  }
  .price, .amount{
    width: 210px;
  }
  .likes{
    width: 40px;
  }
  .buys{
    width: 200px;
  }
  .titles{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    color: #5e5e5e;
    background-color: white;
  }
  .item{
    float: left;
  }
  .content{
    /*width: 1240px;*/
    /*height: 900px;*/
    /*margin: 0 auto;*/
    padding-bottom: 15px;
    /*background-color: white;*/
  }
  .search-input{
    outline: none;
    width: 600px;
    margin-left: 320px;
  }
  .search{
    width: 1240px;
    height: 60px;
    position: absolute;
    z-index: 5;
    left: 0;
    top: 250px;
    /*background: white;*/
  }
  .header{
    width: 1240px;
    height: 420px;
    background: white;
    margin: 0 auto;
    position: relative;
    -moz-box-shadow: 0 2px 2px #888888; /* 老的 Firefox */
    box-shadow: 0 2px 2px #888888;
  }
  .mask{
    width: 1240px;
    height: 420px;
    position: absolute;
    top: 0;
    left: 0;
    background: black;
    opacity: 0.3;
    z-index: 3;
  }
  .top{
    width: 1240px;
    height: 420px;
    position: absolute;
    top: 0;
    left: 0;
    background: url(../assets/music.jpg);
    z-index: 2;
  }
  .dialog{
    position: absolute;
    z-index: 100;
  }
  .eth{
    position: relative;
    text-align: center;
    font-size: 100px;
    line-height: 150px;
    color: #ff5622;
  }
  .exc{
    line-height: 150px;
    font-size: 30px;
    margin-bottom: 30px;
  }
  .wallet{
    line-height: 150px;
    font-size: 80px;
    margin-bottom: 10px;
  }
  .info{
    text-align: center;
    margin-top: 40px;
  }
  .info span{
    color: #ff5622;
    font-size: 20px;
  }
</style>
