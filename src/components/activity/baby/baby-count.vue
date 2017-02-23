<template><div>
  <div>
    <div class="clearfix location">
      <div class="pull-left">
        <ol class="breadcrumb">
          <li class="active">活动管理</li>
          <li><a v-link="{name : 'baby-list'}">宝贝评选管理</a></li>
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
          <label>手机号：</label>
          <input type="text" class="form-control" name="name" v-model="params.search.user_phone">
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
          <th width="30%">宝贝名称</th>
          <th width="18%">所属中心</th>
          <th width="17%">
            <span :class="options.sort[params.search.orderByUpdatedAt]"  @click="orderBy()">得票数<span class="caret"></span></span>
          </th>
          <th width="17%">用户手机号</th>
          <th width="18%">操作</th>
        </tr>
        </thead>
        <tbody>

        <tbody  v-show=" data.length != 0 ">
        <tr v-for="item in data">
          <td><div class="nowrap">{{ item.baby_name }}</div></td>
          <td>{{ item.center_name }}</td>
          <td>{{ item.total }}</td>
          <td>{{ item.user_phone }}</td>
          <td>
            <a href="javascript:;" @click="detail(item.id)">查看</a>
            <a href="javascript:;" @click="deleteModal(item.id)">删除</a>
          </td>
        </tr>
        </tbody>
        <tbody v-show=" data.length == 0 ">
        <td colspan="5" class="noData">抱歉，暂无信息</td>
        </tbody>

        </tbody>
      </table>
      <paginator :pagination="meta.pagination" :page.sync="params.search.page" ></paginator>
    </div>
    <panel title="宝贝详情"  :show.sync="panel.show" ok-text="关闭">
        <div class="text-center"><img :src="panel.baby_image_url " alt="" style="max-width: 300px; max-height: 300px;"/></div>
        <div style="padding-top: 10px;" class="breakall">{{panel.declaration}}</div>
    </panel>
    <modal title="提示"  msg="确认删除该条记录?" :show.sync="modal.show" @ok="deleteFn"></modal>
  </div>
</div></template>
<script>
  import refreshButton from '../../../wedgets/refresh-button.vue'
  import {pagination,sortType} from '../../../utils/data_templates'
  import paginator from '../../../wedgets/paginator.vue'
  import Resource from '../../../utils/resource'
  import panel from '../../../wedgets/panel/panel.vue'
  import modal from '../../../wedgets/modal.vue'
  var defaultParams = function(){
    return {
      search:{
        user_phone:'',
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
      paginator:paginator,
      panel:panel,
      modal:modal
    },
    data () {
      var resource = new Resource(this,'backstage/baby-selection');
      return {
        params:defaultParams(),
        data:[{}],
        meta: {pagination: pagination},
        options: {sort: sortType},
        panel:{
          show:false,
          id:'',
          declaration:'',
          baby_image_url:'',
        },
        modal:{
          show: false,
          deleteId:''
        },
        resource
      }
    },
    created(){
      this.search()
    },
    watch: {
    },
    computed:{
      download:function(){
        return '/backstage/baby-selection/'+this.$route.params.id + '/download-csv'
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
      detail(index){
        var _this = this
        var temp = {}
        _this.panel.show = true;
        for(var i=0; i< _this.data.length; i++ ){
          if( index == _this.data[i].id ){
             temp = _this.data[i]
             break;
          }
        }
        _this.panel = Object.assign({}, _this.panel, temp)
      },
      //完成
      deleteModal(id){
        this.modal.show = true
        this.modal.deleteId = id
      },

      deleteFn(id){
        var _this = this
        id = _this.modal.deleteId
        _this.resource.delete(_this.$route.params.id + '/baby-data/'+ id).then(function(response){
          _this.resource.infoSuccess(response, function(){
            _this.search()
          })
        },function(response){
          _this.resource.infoError(response)
        });

      },
      orderBy () {
        this.params.search.order_by = this.params.search.order_by == 'desc' ? 'asc' : 'desc'
        this.search()
      }
    }
  }
</script>
<style>
  .loadingBox{
    position: fixed; left: 150px; top: 0; right: 0; bottom: 0; z-index: 999;
  }
  .loadingBox span{
    display: inline-block; height: 100%; vertical-align: middle;
  }
  .loadingBox img{
    vertical-align: middle
  }
</style>

