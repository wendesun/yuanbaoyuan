<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li><a v-link="{path : '/user/list'}">用户管理</a></li>
        <li class="active">编辑用户</li>
      </ol>
    </div>
  </div>
  <div class="user-edit">
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" :class="{'active':isPersonal}"><a v-link="{name:'user-edit-personal'}">个人资料</a></li>
      <li role="presentation" :class="{'active':isContract}"><a v-link="{name:'user-edit-contract'}">合同信息</a></li>
    </ul>
    <!-- Tab panes -->
    <div class="tab-content">
      <div class="tab-pane active">
        <router-view></router-view>
      </div>
    </div>
  </div>
</div></template>
<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      userId() {
        return this.$route.params.userId
      },
      isPersonal(){
        return this.$route.name == 'user-edit-personal'
      },
      isContract(){
        return this.$route.name == 'user-edit-contract'
      },
      isOrders(){
        return this.$route.name == 'user-edit-orders'
      },
    }
  }
</script>
<style>
  .user-edit .tab-content .tab-pane{
    padding-top: 20px;
  }
  .user-edit .table{
    margin-bottom: 0;
  }
</style>
