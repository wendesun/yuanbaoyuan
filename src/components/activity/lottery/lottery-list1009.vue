<template><div>
    <div class="clearfix location">
        <div class="pull-left">
            <ol class="breadcrumb">
                <li class="active">抽奖管理</li>
            </ol>
        </div>
        <div class="pull-right">
            <refresh-button @click="refreshFn"></refresh-button>
            <a v-link="{name:'lottery-add'}" class="btn btn-default btn-sm">添加活动</a>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-body clearfix search">
            <div class="pull-left">
                <label>活动名称：</label>
                <input type="text" class="form-control" name="name" v-model="params.search.name">
            </div>
            <div class="pull-left">
                <label>开始日期：</label>
                <input type="text"
                       id="start"
                       class="form-control laydate-icon"
                       v-model="params.search.start_after">　至　
                <input type="text"
                       id="end"
                       class="form-control laydate-icon"
                       v-model="params.search.start_end">
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
                <th>活动名称</th>
                <th>
                    <dropdown
                        :condition="options.lotteryStatus"
                        :title="'状态'"
                        :default.sync="params.search.status" ></dropdown>
                </th>
                <th @click="changeOrder('start_at')" :class="[isAsc('start_at') ? 'dropup' : 'dropdown']">开始时间
                  <span class="caret" v-if="params.search.order_field == 'start_at'"></span>
                </th>
                <th @click="changeOrder('end_at')" :class="[isAsc('end_at') ? 'dropup' : 'dropdown']">结束时间
                  <span class="caret" v-if="params.search.order_field == 'end_at'"></span>
                </th>
                <th @click="changeOrder('updated_at')" :class="[isAsc('updated_at') ? 'dropup' : 'dropdown']">更新时间
                  <span class="caret" v-if="params.search.order_field == 'updated_at'"></span>
                </th>
                </th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in data">
                <td>{{ item.name }}</td>
                <td>{{ options.lotteryStatus[item.status] }}</td>
                <td>{{ item.start_at | date}}</td>
                <td>{{ item.end_at | date }}</td>
                <td>{{ item.updated_at | date}}</td>
                <td>
                    <a v-link="{name:'lottery-edit', params:{id:item.id}}">编辑</a>
                    <a  v-if="item.status == 10"
                        @click="startActivity(item.id)">启用</a>
                    <a  v-if="item.status == 20"
                        @click="closeActivity(item.id)">关闭</a>
                </td>
            </tr>
            </tbody>
        </table>
        <paginator :pagination="meta.pagination" :page.sync="params.search.page" ></paginator>
    </div>
</div></template>
<script>
  import refreshButton from '../../../wedgets/refresh-button.vue'
  import dropdown from '../../../wedgets/dropdown.vue'
  import paginator from '../../../wedgets/paginator.vue'
  import Resource from '../../../utils/resource'
  import {lotteryStatus,sortIcon} from '../../../utils/data_templates'
  export default {
    components: {
      refreshButton: refreshButton,
      dropdown:dropdown,
      paginator:paginator
    },
    data () {
      var resource = new Resource(this,'backstage/lotteries')
      return {
        params:{
          search:{
              status:0,
              order_field:'updated_at',
              order_by:'desc',
              page:1
          }
        },
        data:[
          {}
        ],
        meta: {
            pagination: {}
        },
        options: {
            lotteryStatus,
            icon: sortIcon
        },
        iconColor:{
          start_at:'grey',
          end_at:'grey',
          updated_at:'black'
        },
        resource
      }
    },
    created(){
      this.search()
    },
    ready () {
      this.datePlugin()
    },
    watch: {
      'params.search.status': 'search',
      'params.search.page': 'paginatorFn'
    },
    methods: {
      datePlugin () {
        var _this = this
        var start = {
          elem: '#start',
          event: 'click',
          istime: false,
          choose: function(datas){
            end.min = datas;
            _this.params.search.start_after = datas
          }
        }
        var end = {
          elem: '#end',
          choose: function(datas){
            _this.params.search.start_end = datas
          }
        }
        laydate(start);
        laydate(end);
      },
      refreshFn () {
        this.params.search.name = '',
        this.params.search.start_after ='',
        this.params.search.start_end ='',
        this.params.search.status = 0,
        this.params.search.order_field = 'updated_at',
        this.params.search.order_by = 'desc',
        this.params.search.page = 1
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
      changeOrder(field) {
          var _this = this
          if(_this.params.search.order_field == field){
            _this.params.search.order_by = _this.params.search.order_by == 'desc' ? 'asc' : 'desc';
          } else {
            _this.params.search.order_field = field
            _this.params.search.order_by = 'desc'
          }
          _this.search()
      },
      isAsc(field) {
          var _this = this
          return field == _this.params.search.order_field && _this.params.search.order_by == 'asc'
      },
      statusText(status){
          return status == 10 ? '关闭' : '开启'
      },
      startActivity(id){
        var _this = this
        _this.resource.operate(id, 'start').then(function(response){
            _this.resource.infoSuccess(response, function(){
                _this.search()
            })
        }, function(response){
            _this.resource.infoError(response)
        })
      },
      closeActivity(id){
        var _this = this
        _this.resource.operate(id, 'close').then(function(response){
            _this.resource.infoSuccess(response, function(){
                _this.search()
            })
        }, function(response){
            _this.resource.infoError(response)
        });

      }
    }
  }
</script>
