<template><div>
  <div :class="{'big-page': condition}">
    <admin-header></admin-header>
    <div class="sidebarLeft"  transition="expand">
      <admin-sidebar></admin-sidebar>
    </div>
    <div class="dislpayArrow" transition="expand"><a class="pngfix" :class="{'open': condition}"  href="javascript:void(0);" @click="displaynavbar"></a></div>
    <div class="main" transition="expand" id="main">
      <div class="main-content">
        <router-view></router-view>
      </div>
      <loading></loading>
    </div>
  </div>
</div></template>
<script>
  import adminHeader from './components/admin-header.vue'
  import adminSidebar from './components/admin-sidebar.vue'
  import loading from './wedgets/loading/loading.vue'
  import store from './vuex/loading/store.js'
  export default {
    components: {
      adminHeader,
      adminSidebar,
      loading
    },
    store:store,
    data () {
      return {
        condition: false
      }
    },
    methods: {
      displaynavbar () {
        this.condition = !this.condition
      }
    }
  }
</script>
<style>
  .big-page .sidebarLeft {
    left: -200px;
  }
  .big-page .main, .big-page .dislpayArrow {
    left: 0px;
  }
  .dislpayArrow {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 200px;
    width: 0px;
    height: 100%;
    z-index: 10;
  }
  .dislpayArrow a {
    background: url('./assets/icon_arrow.png') no-repeat 0 0;
  }
  .dislpayArrow a {
    position: absolute;
    display: block;
    width: 17px;
    height: 61px;
    top: 50%;
    margin-top: -30px;
    outline: none;
  }
  .dislpayArrow a:hover {
    text-decoration: none;
    background-position: right 0;
  }
  .dislpayArrow a.open {
    background-position: 0 -61px;
  }
  .dislpayArrow a.open:hover {
    background-position: right -61px;
  }
  /* 必需 */
  .expand-transition {
    transition: all .3s linear;
  }

  .sidebarLeft {
    position: fixed;
    width: 200px;
    top: 50px;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: block;
    padding: 0px;
    overflow: hidden;
    background-color: #3c454e;
    border-right: 1px solid #eee;
  }
  .main {
    position: absolute;
    top: 50px;
    bottom: 0;
    left: 200px;
    right: 0;
    padding: 0;
    overflow: auto;
  }
  .main-content{
    padding:0 20px 20px 20px;
  }
  a {cursor:pointer}
</style>
