<template><div>
  <header class="admin-header">
    <a href="#" class="admin-logo"></a>
    <div class="admin-user">欢迎您&nbsp;&nbsp;<span>test</span>&nbsp;|&nbsp;<a href="/admin/logout" class="color-white">退出</a></div>
  </header>
</div></template>
<style lang="less">
  .admin-header{
    z-index: 1000;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    height: 50px;
    background-color: #3c454e;
    .admin-logo{
      width: 200px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      float: left;
      background: none;
      display: block;
      text-indent: -9999em;
    }
    .admin-user{
      text-align: right;
      padding-right: 10px;
      margin-left: 150px;
      line-height: 50px;
      color: #fff;
    }
    a.color-white{
      color: #fff
    }
  }
</style>
