<!-- 修改个人信息 -->
<template>
  <div class="cont-info">
    <div class="content">
      <el-form  ref="requestFrom"  :model="requestFrom" :rules="rules" size="small" label-width="120px">
        <!-- <el-form-item label="上传头像">
          <div class="avatar-uploader" @click="toggleShow">
            <img v-if="imgDataUrl" :src="imgDataUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="requestFrom.nikename" maxlength="8" placeholder=""></el-input>
        </el-form-item> -->
        <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" v-model="requestFrom.oldPassword" maxlength="18" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="requestFrom.newPassword" maxlength="18" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="requestFrom.checkPass" maxlength="18" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="mt40">
          <el-button size="small" @click="$router.go(-1)"  type="info">
            <svg-icon iconClass="cancel" className="vm mr5"></svg-icon>
            <span class="vm">取消</span>
          </el-button>
          <el-button size="small" :loading="loading" @click="submitForm('requestFrom')" type="primary">
            <svg-icon iconClass="save" className="vm mr5"></svg-icon>
            <span class="vm">保存</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { updateInfo } from '@/api/login'
export default {
  name: 'userinfo',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写新密码'))
      } else {
        if (this.requestFrom.checkPass !== '') {
          this.$refs.requestFrom.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次确认密码'))
      } else if (value !== this.requestFrom.newPassword) {
        callback(new Error('两次填写的密码不一致，请重新填'))
      } else {
        callback()
      }
    }
    return {
      requestFrom: {
        id: store.getters.userinfo.id,
        oldPassword: '',
        newPassword: '',
        checkPass: ''
      },
      loading: false,
      show: false,
      params: {
        token: '123456798',
        name: 'avatar'
      },
      headers: {
        smail: '*_~'
      },
      rules: {
        oldPassword: [
          { required: true, message: '请填写原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      imgDataUrl: '' // the datebase64 url of created image
    }
  },
  methods: {
    submitForm(formName) { // 提交信息
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          updateInfo(this.requestFrom).then((res) => {
            this.$message.success('修改成功')
            this.loading = false
            this.$refs[formName].resetFields()
          }).catch((e) => {
            // this.$message.error('修改失败，请稍后再试')
            console.log(e)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toggleShow() {
      this.show = !this.show
    },
    cropSuccess(imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl
    },
    cropUploadSuccess(jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      console.log('field: ' + field)
      this.$refs.uploader.off()
    },
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
      // this.$refs.uploader.off()
    }
  }
}
</script>
<style lang='scss' scoped>
.content {
  width: 340px;
}
.mt50 {
  margin-top: 50px;
}
.avatar-uploader{
  display: inline-block;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: center;
  .avatar{
    display:block;
    width: 150px;
    height: 150px;
  }
  .avatar-uploader-icon{
    width: 150px;
    line-height: 150px;
    font-size: 32px;
    color: #999;
  }
}
</style>