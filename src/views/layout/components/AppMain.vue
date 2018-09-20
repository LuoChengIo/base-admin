<!--  -->
<template>
  <div class="app-main box-wrap">
    <!-- <el-scrollbar class="live-srollbar"> -->
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view ></router-view>
        </keep-alive>
      </transition>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import store from '@/store'
export default {
  data() {
    return {
    }
  },
  computed: {
    cachedViews() {
      const arr = [...store.getters.permission_routers]
      const rounter = []
      const getInclude = (data) => {
        data.forEach(element => {
          if (!element.hidden) {
            rounter.push(element.name)
          }
          if (element.children && element.children.length) {
            getInclude(element.children)
          }
        })
      }
      getInclude(arr)
      return rounter
    }
  },
  methods: {}
}

</script>
<style lang='scss' scoped>
.app-main{
  width: 100%;
  min-height: 100%;
  padding: 20px;
  overflow-y: auto;
}
</style>