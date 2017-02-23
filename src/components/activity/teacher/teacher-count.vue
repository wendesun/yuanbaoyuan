<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li class="active">活动管理</li>
        <li><a v-link="{name : 'teacher-list'}">教师评选管理</a></li>
        <li class="active">统计</li>
      </ol>
    </div>
    <div class="pull-right">
      <refresh-button @click="refreshFn"></refresh-button>
      <a  class="btn btn-default btn-sm"  :href="download">导出全部</a>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-body clearfix search">
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
        <th width="33%">教师名称</th>
        <th width="34%">所属中心</th>
        <th width="33%">
          <span :class="options.sort[params.search.order_by]"  @click="orderBy()">得票数<span class="caret"></span></span>
        </th>
      </tr>
      </thead>
      <tbody  v-show=" data.length != 0 ">
      <tr v-for="item in data">
        <td>{{ item.teacher_name }}</td>
        <td>{{ item.center_name }}</td>
        <td>{{ item.total }}</td>
      </tr>
      </tbody>
      <tbody v-show=" data.length == 0 ">
        <td colspan="3" class="noData">抱歉，暂无信息</td>
      </tbody>
    </table>
    <paginator :pagination="meta.pagination" :page.sync="params.search.page" ></paginator>
  </div>
</div></template>
<script>
  import refreshButton from '../../../wedgets/refresh-button.vue'
  import {pagination,sortType} from '../../../utils/data_templates'
  import paginator from '../../../wedgets/paginator.vue'
  import Resource from '../../../utils/resource'
  var defaultParams = function(){
    return {
      search:{
        center_name:'',
        order_field:'total',
        order_by:'desc',
        page:1
      }
    }
  }
  export default {
    components: {
      refreshButton: refreshButton,
      paginator:paginator
    },
    data () {
      var resource = new Resource(this,'backstage/teacher-selection');
      return {
        params:defaultParams(),
        data:[ {}],
        meta: {
          pagination: pagination,
        },
        options: {
          sort: sortType
        },
        resource
      }
    },
    created(){
      this.search()
    },
    watch: {
        'params.search.page': 'paginatorFn'
    },
    computed:{
      download:function(){
        return '/backstage/teacher-selection/'+this.$route.params.id + '/download-csv'
      }
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
        this.resource.show(_this.$route.params.id + '/statistics', _this.params.search).then(function (response){
          _this.resource.refresh(response)
        },function (response){
          _this.resource.infoError(response)
        })
      },
      orderBy () {
        this.params.search.order_by = this.params.search.order_by == 'desc' ? 'asc' : 'desc'
        this.search()
      }
    }
  }
</script>
