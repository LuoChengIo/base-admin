<!--  -->
<template>
  <div class="navbar">
    <div class="msg-info dib vt">
      <span class="f14 vm mr5">
        <svg-icon icon-class="msg"></svg-icon>
      </span>
      <span class="vm">系统消息：欢迎进入使用数字钱包BI管理系统~</span>
    </div>
    <div class="r rel poi" @mousemove="dropflg=true" @mouseout="dropflg=false">
      <span class="dib vt pl15 pr15">
        <span class="vm w120 ell">{{username}}</span>
        <i class="el-icon-caret-bottom ml5 vm poi"></i>
        <img class="avatar vm mr5" :src="avatar" alt="">
      </span>
      <transition name="el-zoom-in-top">
        <div class="dropdown-list" v-show="dropflg">
          <div class="item">
            <router-link to="/updateInfo/userinfo">
              <svg-icon iconClass="update-pwd" className="vm mr5"></svg-icon>
              <span class="vm" style="color:#fff">修改密码</span>
            </router-link>
          </div>
          <div @click="exit" class="item">
            <svg-icon iconClass="exit" className="vm mr5"></svg-icon>
            <span class="vm">退出</span> 
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import myMarquee from '@/components/myMarquee'
import ScrollMsg from '@/components/ScrollMsg'
import avatar from '@/assets/touxiang.png'
export default {
  components: {
    ScrollMsg,
    myMarquee
  },
  data() {
    return {
      dropflg: false,
      avatar
    }
  },
  computed: {
    username() {
      return store.getters.userinfo.userName
    }
  },
  methods: {
    exit() { // 退出系统
      this.$msgbox({
        title: '提醒',
        message: '您确定要退出系统吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        store.dispatch('FedLogOut').then(() => { // 退出登录
          this.$router.push({ path: '/login' })
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.navbar{
  display: block;
  width: 100%;
  min-width: 1020px;
  height: 60px;
  padding: 12px 0;
  color: #fff;
  line-height: 36px;
  background-color: #3C4A62;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
}
.title{
  margin-right: 88px;
  padding-left: 40px;
  font-size: 20px;
  letter-spacing: 2px;
}
.msg-info{
  padding-left: 20px;
}
.b-r{
  border-right: 1px solid rgba($color: #fff, $alpha: .3);
}
.w120{
  display: inline-block;
  max-width: 120px;
}
.avatar{
  display: inline-block;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background-color: #f2f2f2;
}
.dropdown-list{
  position: absolute;
  top: 37px;
  right: 0px;
  width: 176px;
  padding-top: 12px;
  background-color: #3C4A62;
  border-radius: 0 0 0 4px;
  .item{
    height: 42px;
    padding-left: 20px;
    line-height: 42px;
    color:#fff;
    cursor: pointer;
    & + .item{
      border-top:1px solid rgba(255,255,255,0.2);
    }
  }
}
</style>