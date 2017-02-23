<template><div>
  <div>
    <div class="clearfix location">
      <div class="pull-left">
        <ol class="breadcrumb">
          <li class="active">版本管理</li>
        </ol>
      </div>
      <div class="pull-right">
        <refresh-button @click="refreshFn"></refresh-button>
        <a v-link="{name:'version-add'}" class="btn btn-default btn-sm">添加版本</a>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-body clearfix search">
        <div class="pull-left">
          <label>平台：</label>
          <select class="form-control" v-model="params.search.platform">
            <option value="">全部</option>
            <option value="ios">ios</option>
            <option value="android">android</option>
          </select>
        </div>
        <div class="pull-left">
          <input class="btn btn-default" type="button" value="查 询" @click="search">
        </div>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <table class="table table-bordered list-table table-hover">
        <thead>
        <tr>
          <th width="6%">产品</th>
          <th width="6%">版本号</th>
          <th width="6%">版本名称</th>
          <th width="6%">平台</th>
          <th width="6%">渠道</th>
          <th width="6%">状态</th>
          <th width="16%">下载地址</th>
          <th width="10%">标题</th>
          <th width="16%">描述</th>
          <th width="6%">更新者</th>
          <th width="10%">
            <span :class="options.sort[params.search.order_by_updated_at]"  @click="orderBy()">更新时间<span class="caret"></span></span>
          </th>
          <th width="6%">操作</th>
        </tr>
        </thead>
        <tbody v-show=" data.length != 0 ">
        <tr v-for="v in data">
          <td>悦宝园</td>
          <td>{{v.version_id}}</td>
          <td>{{v.version}}</td>
          <td>{{v.platform}}</td>
          <td>{{v.pkg_source}}</td>
          <td>{{options.status[v.status]}}</td>
          <td class="breakall">{{v.url}}</td>
          <td>{{v.title}}</td>
          <td>{{v.desc}}</td>
          <td>{{v.updater_id}}</td>
          <td>{{v.updated_at | dateCut}}</td>
          <td>
            <a v-link="{name:'version-edit', params:{id:v.id}}">编辑</a>
          </td>
        </tr>
        </tbody>
        <tbody v-show=" data.length == 0 ">
          <td colspan="12" class="noData">抱歉，暂无信息</td>
        </tbody>
      </table>
      <paginator :pagination="meta.pagination" :page.sync="params.search.page" ></paginator>
    </div>
  </div>
</div></template>
<script>
  import refreshButton from '../../wedgets/refresh-button.vue'
  import dropdown from '../../wedgets/dropdown.vue'
  import {pagination,sortType} from '../../utils/data_templates'
  import paginator from '../../wedgets/paginator.vue'
  import Resource from '../../utils/resource'
  var defaultParams = function () {
    return {
      search:{
        platform: '',
        order_by_updated_at:'desc',
        page:1
      }
    }
  }
  export default {
    components: {
      refreshButton: refreshButton,
      dropdown:dropdown,
      paginator:paginator
    },
    data () {
      var resource = new Resource(this,'backstage/app-versions');
      return {
        params:defaultParams(),
        data:[
          {}
        ],
        meta: {
          pagination: pagination,
        },
        order: {
          price:'desc',
          updated_at:'desc'
        },
        resource,
        options:{
          sort: sortType,
          status:{
            N:'最新版本',
            O:'提示升级',
            A:'不提示升级',
            E:'强制升级'
          }
        }
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
        this.params = defaultParams()
        this.paginatorFn()
      },
      search () {
        var _this = this
        _this.params.search.page = 1
        this.resource.index(_this.params.search).then(function (response){
          _this.resource.refresh(response)
        },function (response){
          _this.resource.infoError(response)
        })
      },
      paginatorFn () {
        var _this = this
        this.resource.index(_this.params.search).then(function (response){
          _this.resource.refresh(response)
        },function (response){
          _this.resource.infoError(response)
        })
      },
      orderBy () {
        this.params.search.order_by_updated_at = this.params.search.order_by_updated_at == 'desc' ? 'asc' : 'desc'
        this.search()
      }
    }
  }
</script>
