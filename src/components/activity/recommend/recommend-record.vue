<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li class="active">活动管理</li>
        <li class="active">用户奖励次数</li>
      </ol>
    </div>
    <div class="pull-right">
      <refresh-button @click="refreshFn"></refresh-button>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-body clearfix search">
      <div class="pull-left">
        <label>手机号：</label>
        <input type="text" class="form-control" name="name" v-model="params.search.phone">
      </div>
      <div class="pull-left">
        <label>所属中心：</label>
        <input type="text" class="form-control" name="name" v-model="params.search.center_name">
      </div>
      <div class="pull-left">
        <input class="btn btn-default" type="submit" value="查 询" @click="search()">
      </div>
    </div>
  </div>

  <div style="margin-top: 20px;">
    <table class="table table-bordered list-table">
      <thead>
      <tr>
        <th width="31%">用户手机号</th>
        <th width="23%">所属中心</th>
        <th width="23%">推荐用户</th>
        <th width="23%">剩余奖励次数</th>
      </tr>
      </thead>
      <tbody v-show=" data.length != 0 ">
        <tr v-for="item in data">
          <td>{{ item.phone }}</td>
          <td>{{ item.center_name }}</td>
          <td>{{ item.recommended }}</td>
          <td>{{ item.left_times }}</td>
        </tr>
      </tbody>
      <tbody v-show=" data.length == 0 ">
        <td colspan="4" class="noData">抱歉，暂无信息</td>
      </tbody>
    </table>
    <paginator :pagination="meta.pagination" :page.sync="params.search.page" ></paginator>
  </div>
</div></template>
<script>
  import refreshButton from '../../../wedgets/refresh-button.vue'
  import paginator from '../../../wedgets/paginator.vue'
  import Resource from '../../../utils/resource'
  var defaultParams = function () {
    return {
      search:{
        phone:'',
        center_name:'',
        page:1
      }
    }
  }
  export default {
    components: {
      refreshButton: refreshButton,
      paginator:paginator,
    },
    data () {
      var resource = new Resource(this,'backstage/recommends/users')
      return {
        params:defaultParams(),
        data:[{}],
        meta: { pagination: {}},
        resource
      }
    },
    created(){
      this.search()
    },
    watch: {
        'params.search.page': 'paginatorFn'
    },
    methods: {
      refreshFn () {
        this.params = defaultParams();
        this.paginatorFn()
      },
      search () {
        var _this = this
        _this.params.search.page = 1
        _this.paginatorFn()
      },
      paginatorFn () {
        var _this = this
        this.resource.index(_this.params.search).then(function (response){
          _this.resource.refresh(response)
        },function (response){
          _this.resource.infoError(response)
        })
      }
    }
  }
</script>
