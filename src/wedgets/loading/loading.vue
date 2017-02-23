<template><div>
  <div class="text-center loadingBox" v-show="show" onselectstart="return false">
    <span></span>
    <img src="./loading-2.gif" alt=""/>
  </div>
</div></template>
<script>
  import $ from 'jquery'
  import {getLoadingStatus} from '../../vuex/loading/getters.js'
  export default {
    vuex:{
      getters:{
        show:getLoadingStatus
      }
    }
  }
</script>
<style>
  .loadingBox{
    position: fixed; left: 150px; top: 0; right: 0; bottom: 0;
  }
  .loadingBox span{
    display: inline-block; height: 100%; vertical-align: middle;
  }
  .loadingBox img{
    vertical-align: middle
  }
</style>

