<template><div>

  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li><a href="#">首页</a></li>
        <li class="active" v-for="item in showCrumbs">{{item.name}}</li>
      </ol>
    </div>
    <div class="pull-right">
      <a class="btn btn-default btn-sm" href="#" role="button">刷新</a>
      <button class="btn btn-default btn-sm" type="submit">添加商品</button>
      <input class="btn btn-default btn-sm" type="button" value="添加商品">
    </div>
  </div>

</div></template>
<style>
  .breadcrumb{
    margin-bottom: 0;
    background: #fff;
    border-radius: 0;
  }
</style>
<script>
  export default {
    props: ['showCrumbs']
  }
</script>
