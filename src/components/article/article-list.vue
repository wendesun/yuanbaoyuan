<template><div>
  <div>
    <div class="clearfix location">
      <div class="pull-left">
        <ol class="breadcrumb">
          <li class="active">文章管理</li>
        </ol>
      </div>
      <div class="pull-right">
        <refresh-button @click="refreshFn"></refresh-button>
        <a v-link="{path:'/article/add'}" class="btn btn-default btn-sm">添加文章</a>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-body clearfix search">
        <div class="pull-left">
          <label>文章标题：</label>
          <input type="text"
                 class="form-control"
                 name="baby_name"
                 v-model="params.search.title" style="width: 300px">
        </div>
        <div class="pull-left">
          <label>更新日期：</label>
          <input class="form-control laydate-icon" type="text" @click.stop="open($event,'beginDate')" v-model="calendar.items.beginDate.value" placeholder="">
         　至　
          <input class="form-control laydate-icon" type="text" @click.stop="open($event,'endDate')" v-model="calendar.items.endDate.value" placeholder="">
        </div>
        <div class="pull-left">
          <input class="btn btn-default" type="submit" value="查 询" @click="search">
        </div>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <table class="table table-bordered list-table">
        <thead>
        <tr>
          <th width="45%">文章标题</th>
          <th width="10%">
            <dropdown :condition="options.status" :title="'状态'" :def.sync="params.search.status" ></dropdown>
          </th>
          <th width="10%">
            <dropdown :condition="options.class_id" :title="'类别'" :def.sync="params.search.class_id" ></dropdown>
          </th>
          <th width="10%">
            <dropdown :condition="options.level" :title="'置顶'" :def.sync="params.search.level" ></dropdown>
          </th>
          <th width="15%">
            <span :class="options.sort[params.search.orderByUpdatedAt]"  @click="orderBy()">更新时间<span class="caret"></span></span>
          </th>
          <th width="10%">操作</th>
        </tr>
        </thead>
        <tbody v-show=" data.length != 0 ">
        <tr v-for="article in data" track-by="$index">
          <td><div class="nowrap">{{ article.title }}</div></td>
          <td>{{ options.status[article.status] }}</td>
          <td>{{ options.class_id[article.class_id] }}</td>
          <td>{{ options.level[article.level] }}</td>
          <td>{{ article.updated_at | dateCut}}</td>
          <td>
            <a v-link="{name:'article-edit', params:{id:article.id}}">编辑</a>
            <a v-show="article.status == 20" @click="soldout(article.id, $index)">下架</a>
            <a v-show="article.status == 10" @click="publish(article.id, $index)">发布</a>
          </td>
        </tr>
        </tbody>
        <tbody v-show=" data.length == 0 ">
          <td colspan="6" class="noData">抱歉，暂无信息</td>
        </tbody>
      </table>
      <paginator :pagination="meta.pagination" :page.sync="params.search.page" ></paginator>
    </div>
  </div>
  <calendar
    :show.sync="calendar.show"
    :type="calendar.type"
    :value.sync="calendar.value"
    :x="calendar.x"
    :y="calendar.y"
    :begin.sync="calendar.begin"
    :end.sync="calendar.end">
  </calendar>
</div></template>
<script>
import refreshButton from '../../wedgets/refresh-button.vue'
import dropdown from '../../wedgets/dropdown.vue'
import {user,pagination,userStatus,userType,sortType} from '../../utils/data_templates'
import paginator from '../../wedgets/paginator.vue'
import Resource from '../../utils/resource'
import calendar from '../../wedgets/calendar/calendar.vue'
var defaultParams = function () {
  return {
    search:{
      title:'',
      updated_at_start:'',
      updated_at_end:'',
      status:0,
      class_id:0,
      level:0,
      orderByUpdatedAt:'desc',
      page:1
    }
  }
}
export default {
  components: {
    refreshButton: refreshButton,
    dropdown:dropdown,
    paginator:paginator,
    calendar: calendar
  },
  data () {
    var resource = new Resource(this,'backstage/articles');
    return {
      params:defaultParams(),
      data:[
        {}
      ],
      meta: {
        pagination: pagination,
      },
      options: {
        status: {
          0:'全部',
          10:'未发布',
          20:'已发布'
        },
        class_id: {
          0:'全部',
          10:'新闻公告',
          20:'家长俱乐部'
        },
        level: {
          0:'全部',
          10:'不置顶',
          20:'列表置顶',
          30:'轮播图'
        },
        sort: sortType
      },
      resource,
      // 数据绑定
      calendar:{
        show:false,
        x:0,
        y:0,
        picker:"",
        begin:"",
        end:"",
        value:"",
        type:'date',
        items:{
          // 开始日期
          beginDate:{
            value:"",
            end:'',
            type:"date"
          },
          // 结束日期
          endDate:{
            value:"",
            begin:'',
            type:"date"
          }
        }
      }
    }
  },
  created(){
    this.search()
  },
  watch: {
    'calendar.value': function (val) {
      this.calendar.items[this.calendar.picker].value=val
      if( this.calendar.picker == 'beginDate'){
        this.params.search.updated_at_start = val
        this.calendar.items.endDate.begin = val
      }
      if( this.calendar.picker == 'endDate'){
        this.params.search.updated_at_end = val
        this.calendar.items.beginDate.end = val
      }
    },
    'params.search.updated_at_start':function(val){
      this.calendar.items.beginDate.value = val
      this.calendar.items.endDate.begin = val
    },
    'params.search.updated_at_end':function(val){
      this.calendar.items.endDate.value = val
      this.calendar.items.beginDate.end = val
    },

    'params.search.status': 'search',
    'params.search.class_id': 'search',
    'params.search.level': 'search',
    'params.search.page': 'paginatorFn'
  },
  route: {
    //为了从添加页面返回列表的时候刷新数据
    data: function () {
      this.search()
    }
  },
  methods: {
    refreshFn () {
      this.params = defaultParams()
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
    },
    publish (id, index) {
      var _this = this
      _this.resource.operate(id, 'publish').then(function(response){
        _this.resource.infoSuccess(response, function(){
          _this.data[index].status = 20
//        _this.search()
        })
      },function(response){
        _this.resource.infoError(response)
      });
    },
    soldout (id, index) {
      var _this = this
      _this.resource.operate(id,'off-publish').then(function(response){
        _this.resource.infoSuccess(response, function(){
          _this.data[index].status = 10
//        _this.search()
        })
      },function(response){
        _this.resource.infoError(response)
      });
    },
    orderBy () {
      this.params.search.orderByUpdatedAt = this.params.search.orderByUpdatedAt == 'desc' ? 'asc' : 'desc'
      this.search()
    },
    // 打开显示选择器
    open(e,type) {
      // 设置类型
      this.calendar.picker=type
      this.calendar.type=this.calendar.items[type].type
      this.calendar.begin=this.calendar.items[type].begin
      this.calendar.end=this.calendar.items[type].end
      this.calendar.value=this.calendar.items[type].value
      // 可不用写
      this.calendar.show=true
      this.calendar.x=e.target.offsetLeft
      this.calendar.y=e.target.offsetTop+e.target.offsetHeight+8
    }
  }
}
</script>
