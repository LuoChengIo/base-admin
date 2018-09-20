<!--  -->
<template>
  <div >

  </div>
</template>

<script>
import numberOnly from '@/directives/numberOnly' // 水波纹指令
export default {
  data() {
    return {
      value: 0
    }
  },
  directives: {
    numberOnly
  },
  components: {},
  computed: {},
  created() {},
  methods: {}
}
</script>
<style lang='scss' scoped>
.app-wrapper{
  min-width: 1200px;
  height: 100%;
  padding-top: 75px;
}
.head{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  background-color: green;
  height: 75px;
}
.side-bar{
  float: left;
  width: 200px;
  background-color: red;
  height: 100%;
}
.ct-main{
  width: auto;
  height: 100%;
  padding: 10px 0 0 10px;
  margin-left: 200px;
  background-color: saddlebrown;
}
</style>