<!-- 登录页面 -->
<template>
  <div class="login-page rel">
    <div class="t-bg"></div>
    <div class="b-bg"></div>
    <div class="login-ct clearfix">
      <div class="left-shipe"></div>
      <div class="right-shipe">
        <div class="from-ct">
          <h2 class="text-white">数字钱包BI系统</h2>
          <el-form :model="loginForm"  ref="loginForm" class="ruleForm">
            <el-form-item >
              <el-input type="text" size="small" placeholder="用户"  maxlength="12" v-model="loginForm.userName" auto-complete="on"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input type="password" size="small" placeholder="密码" maxlength="18" v-model="loginForm.password" auto-complete="on"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input style="width:100px;" placeholder="验证码" @keyup.enter.native="submitForm" maxlength="4" size="small" v-model="loginForm.captcha"></el-input>
              <span class="captcha poi" @click="refreshCode">
                <img :src="getCode" alt="" srcset="">
              </span>
            </el-form-item>
          </el-form>
        </div>
        <div class="login-btn">
          <transition name="fade">
            <span v-if="loading" class="dib tc loadings">
              <i  class="el-icon-loading"></i>
            </span>
            <span @click="submitForm"  class="text-gradient poi">登录</span>
          </transition>
          
        </div>
      </div>
    </div>
    <div class="compay tc">
        <p>Copyright &copy; 数字钱包</p>
        <p>粤ICP备18026918号-1</p>
    </div>
  </div>
</template>

<script>
import { baseImgURL } from '@/utils/index'
export default {
  data() {
    return {
      loginForm: {
        userName: '', // 用户名
        password: '', // 密码
        captcha: '', // 验证码
        uid: 0 // 验证码id
      },
      loading: false,
      codeRandom: new Date().getTime()
    }
  },
  components: {},
  computed: {
    getCode() {
      return baseImgURL + '/captcha.jpg?uid=' + this.codeRandom
    }
  },
  methods: {
    refreshCode() { // 刷新验证码
      this.codeRandom = new Date().getTime()
    },
    submitForm(formName) { // 提交验证
      if (!this.loginForm.userName) {
        this.$message.warning('请填写您的用户名~')
        return
      }
      if (!this.loginForm.password) {
        this.$message.warning('请填写您的密码~')
        return
      }
      if (!this.loginForm.captcha) {
        this.$message.warning('请填写验证码~')
        return
      }
      this.loginForm.uid = this.codeRandom
      this.loading = true
      this.$store.dispatch('Login', this.loginForm).then(() => {
        this.loading = false
        this.$router.push({ path: '/' })
      }).catch((e) => {
        console.log(e)
        this.loading = false
      })
    }
  }
}

</script>
<style lang='scss' scoped>
  .login-page{
    height: 100%;
  }
  .t-bg{
    height: 55%;
    background-color: #fefefe;
  }
  .b-bg{
    height: 45%;
    background-color: #048fcb;
  }
  .login-ct{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 650px;
    height: 350px;
    padding: 20px;
    transform: translate(-50%,-50%);
    h2{
      letter-spacing: 2px;
    }
  }
  .left-shipe{
    position: relative;
    float: left;
    width: 285px;
    height: 285px;
    background:#048fcb;
    border:20px solid #fff;
    transform: rotate(45deg);
    outline:20px solid #3aa2d8;
    &:after{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: block;
      margin: auto;
      content: '';
      width: 1px;
      height: 1px;
      background-color:rgba(255,255,255,.2);
      box-shadow: 0px 0px 57px 60px rgba(255,255,255,.2);
    }
  }
  .right-shipe{
    position: relative;
    float: left;
    width: 350px;
    height: 350px;
    margin-left: -130px;
    margin-top: -40px;
    background:#048fcb;
    transform: rotate(45deg);
    box-shadow: 0px 0px 10px 30px rgba(0,0,0,.2);
    box-shadow: 10px 10px 43px rgba(0, 0, 0, 0.2);
  }
  .from-ct{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 250px;
    height: 250px;
    padding-top: 20px;
    margin: auto;
    // background-color: red;
    transform: rotate(-45deg);
  }
  .login-btn{
    position: absolute;
    top: 4%;
    right: 3%;
    &:before{
      display: block;
      position: absolute;
      top: -139px;
      left: -39px;
      content: '';
      transform: rotate(-45deg);
      border: 114px solid transparent;
      border-left-color: #f7f7f7;
    }
  }
  .text-gradient {  
    display: inline-block;
    color: #1894cf;
    font-size: 28px;
    font-family: '微软雅黑';
    font-weight: bold;
    transform: rotate(-45deg);
    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#61afd0), to(#1894cf));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  };
  .ruleForm{
    width: 200px;
    padding-top: 20px;
    .el-form-item{
      margin-bottom: 18px;
    }
  }
  .captcha{
    float: right;
    display: inline-block;
    background-color: #fff;
    width: 83px;
    margin-top: 4px;
    margin-left: 15px;
    height: 32px;
    border-radius: 3px;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .loadings{
    width: 56px;
    height: 42px;
    font-size: 26px;
    color: #048fcb;
    line-height: 42px;
  }
  .compay{
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 100%;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
  }
</style>