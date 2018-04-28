/**
 * Created by Jimmy on 2018/4/28.
 */
<template>
  <div class="upload">
    <div class="title">上传</div>
    <el-form class="from" ref="form" :model="form" label-width="80px" label-position="left">
      <el-form-item label="上传">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="limit"
          :file-list="fileList"
          :multiple="multiple">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">支持MP3、DTS、DTS-HD、MA、AC3、TrueHD、AAC、HE-AAC、PCM、LPCM、FLAC格式</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name" ></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="form.brief" type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item label="售价">
          <el-input v-model="form.price"><span slot="append">Token</span></el-input>
      </el-form-item>
      <el-form-item label="是否上架">
        <el-checkbox :checked="form.checked">是</el-checkbox>
      </el-form-item>
    </el-form>
    <div class="op">
      <el-button class="btn" type="primary">上  传</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        brief: '测试测试',
        name: '',
        price: 10000,
        checked: true
      },
      limit: 1,
      multiple: false,
      fileList: [{
        name: 'food.mp3',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }]
    }
  }
}
</script>

<style scoped>
  .op{
    width: 100px;
    margin: 0 auto;
    margin-bottom: 15px;
    /*background-color: red;*/
  }
  .btn{
    width: 100px;
  }
  .from{
    padding: 0 15px;
  }
  .title{
    width: 100%;
    margin-left: 15px;
    /*margin-top: 20px;*/
    color: #5e5e5e;
    font-size: 16px;
    font-weight: 500;
    height: 40px;
    line-height: 40px;
  }
  .upload{
    width: 100%;
  }
</style>
