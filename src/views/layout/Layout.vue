<template>
  <div class="app-wrapper">
    <div class="side-bar sidebar-container">
      <sidebar></sidebar>
    </div>
    <div class="ct-main">
      <div class="head">
        <navbar></navbar>
        <breadcrumb></breadcrumb>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
import { Navbar, Sidebar, AppMain, Breadcrumb } from './components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Breadcrumb
  },
  methods: {
  }
}
</script>
<style lang='scss'>
.app-wrapper{
  min-width: 1200px;
  height: 100%;
  background-color: #f0f0f0;
  .head{
    position: fixed;
    top: 0px;
    left: 180px;
    width: auto;
    right: 0px;
    height: 100px;
    z-index: 1;
  }
  .side-bar{
    float: left;
    width: 180px;
    height: 100%;
  }
  .ct-main{
    width: auto;
    height: 100%;
    padding-top: 100px;
    margin-left: 180px;
  }
}
</style>