/**
 * Created by Jimmy on 2018/4/28.
 */
<template>
  <div class="upload">
    <div class="title">上传</div>
    <el-form class="from" ref="form" :model="form" label-width="80px" label-position="left">
      <el-form-item label="上传">
        <el-upload
          drag
          ref="uploadfile"
          action="http://localhost:8888/upload"
          :http-request="uploadFile"
          :limit="form.limit"
          :multiple="form.multiple"
          :on-success="handleFileSuccess"
          :on-remove="removeFile"
          :before-upload="beforeFileUpload">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <!--<div class="el-upload__tip" slot="tip">仅限上传单个文件，支持MP3、DTS、DTS-HD、MA、AC3、TrueHD、AAC、HE-AAC、PCM、LPCM、FLAC格式。</div>-->
          <div class="el-upload__tip" slot="tip">仅限上传单个文件，支持MP3格式。</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="name" ></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          ref="uploadAvatar"
          class="avatar-uploader"
          action="http://localhost:8888/upload"
          :show-file-list="false"
          :http-request="uploadFile"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
          <i v-else class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="brief" type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item label="售价">
          <el-input v-model="price"><span slot="append">Coin</span></el-input>
      </el-form-item>
      <el-form-item label="是否上架">
        <el-checkbox :checked="checked">是</el-checkbox>
      </el-form-item>
    </el-form>
    <div class="op">
      <el-button class="btn" type="primary" @click="upload">上  传</el-button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      form: {
        limit: 1,
        multiple: false,
        imageUrl: ''
      },
      checked: true,
      brief: '',
      name: '',
      price: 100,
      audioPath: '',
      imageUrl: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    upload () {
      if (this.audioPath) {
        let strSpace = '^[^ ]+$'
        let regSpace = new RegExp(strSpace)
        if (regSpace.test(this.name)) {
          if (this.imageUrl) {
            if (regSpace.test(this.brief)) {
              if (/^[1-9]\d*$/.test(this.price)) {
                console.log('验证通过')
                this.$http.post(this.domain + '/uploadmywork',
                  {
                    token: this.user.token,
                    local_path: this.audioPath,
                    name: this.name,
                    brief: this.brief,
                    cover_image_path: this.imageUrl,
                    price: this.price
                  })
                  .then((response) => {
                    if (response.data.err === '100') {
                      this.$refs.uploadfile.clearFiles()
                      this.$refs.uploadAvatar.clearFiles()
                      this.audioPath = ''
                      this.name = ''
                      this.brief = ''
                      this.imageUrl = ''
                      this.price = 100
                      this.form.imageUrl = ''
                      this.$notify.success({
                        title: '成功',
                        message: '上传作品成功！'
                      })
                    } else {
                      this.$message.error(response.data.message)
                    }
                  })
                  .catch(function (response) {
                    this.$message.error(response.data)
                  })
              } else {
                this.$message.error('售价需为正整数！')
              }
            } else {
              this.$message.error('简介不能包含空格等特殊字符')
            }
          } else {
            this.$message.error('请上传作品封面')
          }
        } else {
          this.$message.error('作品名称不能包含空格等特殊字符')
        }
      } else {
        this.$message.error('请先上传文件！')
      }
    },
    uploadFile (content) {
      let formData = new FormData()
      formData.append('upload_file', content.file)
      this.$http.post(this.domain + '/upload', formData)
        .then((response) => {
          content.onSuccess(response)
        })
        .catch(function (response) {
          this.$message.error(response.data)
        })
    },
    handleFileSuccess (res, file) {
      if (res.data.err === '100') {
        this.audioPath = res.data.path
        this.$notify.success({
          title: '成功',
          message: '上传文件成功！'
        })
      }
    },
    beforeFileUpload (file) {
      const isMP3 = file.type === 'audio/mp3'
      if (!isMP3) {
        this.$message.error('上传音频文件只能是 mp3 格式!')
      }
      return isMP3
    },
    removeFile (file, filelist) {
      this.audioPath = ''
      this.$message('文件已删除，请重新上传')
    },
    handleAvatarSuccess (res, file) {
      if (res.data.err === '100') {
        this.form.imageUrl = URL.createObjectURL(file.raw)
        this.imageUrl = res.data.path
        this.$notify.success({
          title: '成功',
          message: '上传封面成功！'
        })
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload, .el-icon-plus:hover {
    border-color: #409EFF;
  }
  .el-icon-plus{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 18px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
</style>
