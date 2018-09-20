<!-- 404页面 -->
<template>
  <div class="err-wap tc">
    <h1>你要找的页面找不到啦(〃'▽'〃)~</h1>
    <div class="err">
      404
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }

}

</script>
<style lang='scss' scoped>
.err-wap{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 500px;
  height: 300px;
  margin: auto;
}
h1{
  font-size: 14px;
  font-weight: normal;
  font-family: Comic Sans MS;
}
.err{
  font-size: 180px;
  font-family: Comic Sans MS;
}
</style>