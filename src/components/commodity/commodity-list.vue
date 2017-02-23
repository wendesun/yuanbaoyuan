<template><div>
    <div class="clearfix location">
      <div class="pull-left">
        <ol class="breadcrumb">
          <li class="active">商品管理</li>
        </ol>
      </div>
      <div class="pull-right">
        <refresh-button @click="refreshFn"></refresh-button>
        <a v-link="{name:'commodity-add'}" class="btn btn-default btn-sm">添加商品</a>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-body clearfix search">
        <div class="pull-left">
          <label>商品名称：</label>
          <input type="text" class="form-control" v-model="params.search.keyword" style="width: 300px">
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
          <th width="30%">商品名称</th>
          <th width="15%">
            <dropdown :condition="options.type" :title="'类型'" :def.sync="params.search.type" ></dropdown>
          </th>
          <th width="20%">
            <span :class="options.sort[order.price]"  @click="orderBy('price', 'desc')">价格(元)<span class="caret" :style="options.icon[order.price_icon]"></span></span>
          </th>
          <th width="20%">
            <span :class="options.sort[order.updated_at]"  @click="orderBy('updated_at','desc')">更新时间<span class="caret" :style="options.icon[order.updated_at_icon]"></span></span>
          </th>
          <th width="15%">操作</th>
        </tr>
        </thead>
        <tbody v-show=" data.length != 0 ">
        <tr v-for="reward in data">
          <td>{{ reward.title }}</td>
          <td>{{ type_text[reward.type]}}</td>
          <td>{{ reward.price | price}}</td>
          <td>{{ reward.updated_at | dateCut}}</td>
          <td>
            <a v-link="{name:'commodity-edit', params:{id:reward.id}}">编辑</a>
          </td>
        </tr>
        </tbody>
        <tbody v-show=" data.length == 0 ">
          <td colspan="5" class="noData">抱歉，暂无信息</td>
        </tbody>
      </table>
      <paginator :pagination="meta.pagination" :page.sync="params.search.page" ></paginator>
    </div>
</div></template>
<script>
  import refreshButton from '../../wedgets/refresh-button.vue'
  import dropdown from '../../wedgets/dropdown.vue'
  import {pagination,sortType,sortIcon,reward,commodityType} from '../../utils/data_templates'
  import paginator from '../../wedgets/paginator.vue'
  import Resource from '../../utils/resource'
  var defaultParams = function () {
    return {
      search:{
        keyword: '',
        type: 0,
        order_field:'updated_at',
        order_by:'desc',
        page:1
      }
    }
  }
  var defaultOrder = function(){
    return {
      price:'desc',
      price_icon:'grey',
      updated_at:'desc',
      updated_at_icon:'black'
    }
  }
  export default {
    components: {
      refreshButton: refreshButton,
      dropdown:dropdown,
      paginator:paginator
    },
    data () {
      var resource = new Resource(this,'backstage/products');
      return {
        params:defaultParams(),
        data:[
          {}
        ],
        meta: {
          pagination: pagination,
        },
        options: {
          type: commodityType,
          sort: sortType,
          icon: sortIcon
        },
        order:defaultOrder(),
        resource,
        type_text:{
          10:'秒杀商品',
          20:'抽奖商品',
          30:'推荐奖品'
        }
      }
    },
    created(){
      this.search()
    },
    watch: {
        'params.search.page': 'paginatorFn',
        'params.search.type': 'search'
    },
    methods: {
      //刷新（需要情况表单数据）
      refreshFn () {
        this.params = defaultParams();
        this.order = defaultOrder();
        this.paginatorFn();
      },
      //查询(查询结果需要回到默认第一页)
      search () {
        var _this = this
        _this.params.search.page = 1;
        _this.paginatorFn();
      },
      //分页
      paginatorFn () {
        var _this = this
        this.resource.index(_this.params.search).then(function (response){
          _this.resource.refresh(response)
        },function (response){
          _this.resource.infoError(response)
        })
      },
      //价格、更新时间排序（只按其中的一个条件查询，所有点击其中一个的时候需要重置另外一个条件）
      orderBy(field, orderby) {
        if( field == 'price'){
          orderby = this.order.price =  this.order.price == 'desc' ? 'asc' : 'desc'
          this.order.updated_at  = ''
          this.order.price_icon  = 'black'
          this.order.updated_at_icon  = 'grey'
        }
        if( field == 'updated_at'){
          orderby = this.order.updated_at =  this.order.updated_at == 'desc' ? 'asc' : 'desc'
          this.order.price  = ''
          this.order.price_icon  = 'grey'
          this.order.updated_at_icon  = 'black'
        }
        this.params.search.order_field = field
        this.params.search.order_by = orderby
        this.search()
      }
    }
  }
</script>
