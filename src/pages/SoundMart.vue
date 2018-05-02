/**
 * Created by Jimmy on 2018/5/2.
 */
<template>
  <div>
    <div class="header">
      <mynav class="nav" :iswhite="iswhite"></mynav>
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
        <saleitem v-for="(item , index) in works" :key="index" :work="item" :index="index"></saleitem>
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
</template>

<script>
import mynav from '../components/Nav.vue'
import saleitem from '../components/SaleItem.vue'

export default {
  components: {
    mynav,
    saleitem
  },
  data () {
    return {
      pageSize: 100,
      total: 1000,
      currentPage: 1,
      search: '',
      iswhite: true,
      works: [
        {
          coverUrl: 'http://pic.5tu.cn/uploads/allimg/201710/pic_5tu_thumb_201709192108079563.jpg',
          name: '鞭炮声',
          tags: ['爆炸', '鞭炮', '测试'],
          duration: '02:23',
          price: 132.21,
          amount: 222
        },
        {
          coverUrl: 'http://pic.5tu.cn/uploads/allimg/201710/pic_5tu_thumb_201709192108079563.jpg',
          name: '鸟鸣声',
          tags: ['鸟鸣', '喜鹊', '测试', '测试'],
          duration: '03:11',
          price: 123.21,
          amount: 2721
        },
        {
          coverUrl: 'http://pic.5tu.cn/uploads/allimg/201710/pic_5tu_thumb_201709192108079563.jpg',
          name: '鸟鸣声',
          tags: ['鸟鸣', '喜鹊'],
          duration: '03:11',
          price: 123.21,
          amount: 221
        },
        {
          coverUrl: 'http://pic.5tu.cn/uploads/allimg/201710/pic_5tu_thumb_201709192108079563.jpg',
          name: '鸟鸣声',
          tags: ['鸟鸣', '喜鹊'],
          duration: '03:11',
          price: 123.21,
          amount: 221
        },
        {
          coverUrl: 'http://pic.5tu.cn/uploads/allimg/201710/pic_5tu_thumb_201709192108079563.jpg',
          name: '鸟鸣声',
          tags: ['鸟鸣', '喜鹊'],
          duration: '03:11',
          price: 123.21,
          amount: 221
        },
        {
          coverUrl: 'http://pic.5tu.cn/uploads/allimg/201710/pic_5tu_thumb_201709192108079563.jpg',
          name: '鸟鸣声',
          tags: ['鸟鸣', '喜鹊'],
          duration: '03:11',
          price: 123.21,
          amount: 221
        }
      ]
    }
  },
  methods: {
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
    width: 1240px;
    /*height: 900px;*/
    margin: 0 auto;
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
  .nav{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
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
</style>
