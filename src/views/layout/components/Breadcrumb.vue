<template>
  <div class="brd">
    <breadcrumb ></breadcrumb>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      Breadcrumb
    }
  }
}
</script>
<style lang="scss" scoped>
  .brd{
    height: 40px;
    background-color: #fff;
    box-shadow:0px 2px 4px 0px rgba(51,51,51,0.05);
  }
</style>

