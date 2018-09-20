<!--  -->
<template>
  <div class="side-bar box-wrap">
    <div class="logo">
      <img :src="dcname" alt="logo" srcset="">
    </div>
    <el-scrollbar class="live-srollbar">
      <el-menu
        mode="vertical"
        :show-timeout="200"
        :default-active="$route.path"
        background-color="#283138"
        text-color="#C2D7E6"
        active-text-color="#FFFFFF"
      >
        <sidebar-item :routes="permission_routers"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import dcname from '@/assets/admin-logo.png'
export default {
  components: { SidebarItem },
  data() {
    return {
      dcname
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  }
}
</script>
<style lang='scss' scoped>
.side-bar{
  position: relative;
  width: 100%;
  height:inherit;
  padding-top: 90px;
  background-color: #283138;
  color: #fff;
}
.logo{
  position: absolute;
  top: 0;
  img{
    display: block;
    width: 100%;
  }
}
</style>
