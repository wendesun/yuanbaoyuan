<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li class="active">活动管理</li>
        <li class="active">直播管理</li>
      </ol>
    </div>
    <div class="pull-right">
      <refresh-button @click="refreshFn"></refresh-button>
      <a v-link="{name:'live-add'}" class="btn btn-default btn-sm">添加课程</a>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-body clearfix search">
      <div class="pull-left">
        <label>课程名称：</label>
        <input type="text" class="form-control" name="name" v-model="params.search.name">
      </div>
      <div class="pull-left">
        <label>更新日期：</label>
        <input class="form-control laydate-icon" type="text" @click.stop="open($event,'beginDate')" v-model="calendar.items.beginDate.value" placeholder="">
        　至　
        <input class="form-control laydate-icon" type="text" @click.stop="open($event,'endDate')" v-model="calendar.items.endDate.value" placeholder="">
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
        <th width="20%">课程名称</th>
        <th width="8%">
          <dropdown
            :condition="options.status"
            :title="'状态'"
            :def.sync="params.search.status" ></dropdown>
        </th>
        <th width="50%">课程链接</th>
        <th width="12%">
          <span :class="options.sort[params.search.order_by_updated_at]"  @click="orderBy()">更新时间<span class="caret"></span></span>
        </th>
        <th width="10%">操作</th>
      </tr>
      </thead>
      <tbody v-show=" data.length != 0 ">
      <tr v-for="item in data">
        <td><div class="nowrap">{{ item.name }}</div></td>
        <td>{{ options.status[item.status] }}</td>
        <td><div class="nowrap">{{ item.link }}</div></td>
        <td>{{ item.updated_at | dateCut}}</td>
        <td>
            <a v-show="item.status == 10" v-link="{name:'live-edit', params:{id:item.id}}">编辑</a>
            <a v-show="item.status == 10" @click="startModal(item.id)">启用</a>
            <a v-show="item.status == 20" v-link="{name:'live-detail', params:{id:item.id}}">查看</a>
            <a v-show="item.status == 20" @click="closeModal(item.id)">关闭</a>
        </td>
      </tr>
      </tbody>
      <tbody v-show=" data.length === 0 ">
        <td colspan="5" class="noData">抱歉，暂无信息</td>
      </tbody>
    </table>
    <paginator :pagination="meta.pagination" :page.sync="params.search.page" ></paginator>
  </div>
  <modal title="提示"  msg="已存在启用的活动，确认替换？" :show.sync="modal.show1" @ok="startActivity"></modal>
  <modal title="提示"  msg="确定将此活动关闭？" :show.sync="modal.show2" @ok="closeActivity"></modal>
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
  import refreshButton from '../../../wedgets/refresh-button.vue'
  import dropdown from '../../../wedgets/dropdown.vue'
  import paginator from '../../../wedgets/paginator.vue'
  import Resource from '../../../utils/resource'
  import {pagination,liveStatus,sortType} from '../../../utils/data_templates'
  import modal from '../../../wedgets/modal.vue'
  import calendar from '../../../wedgets/calendar/calendar.vue'
  var defaultParams = function () {
    return {
      search:{
        name:'',
        updated_at_start:'',
        updated_at_end:'',
        status:0,
        order_by_updated_at:'desc',
        page:1
      }
    }
  }

  export default {
    components: {
      refreshButton: refreshButton,
      dropdown:dropdown,
      paginator:paginator,
      modal:modal,
      calendar: calendar
    },
    data () {
      var resource = new Resource(this,'backstage/lives')
      return {
        modal:{
          show1: false,
          show2: false,
          startId:'',
          closeId:''
        },
        params:defaultParams(),
        data:[{}],
        meta: {
          pagination: {}
        },
        options: {
          sort: sortType,
          status:liveStatus
        },
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
        },
        resource
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
      'params.search.page': 'paginatorFn'
    },
    methods:{
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
      startModal (id) {
        var data = this.data
        this.modal.startId = id
        var num = 0;
        for(var i=0 ; i<data.length; i++){
          if( data[i].status == 20) {
            num = num + 1;
            break
          }
        }
        if( num == 0){
          this.startActivity()
        }else{
          this.modal.show1 = true
        }
      },
      closeModal (id) {
        this.modal.closeId = id
        this.modal.show2 = true
      },
      startActivity () {
        var _this = this
        var id = _this.modal.startId
        _this.resource.operate(id,'start').then(function(response){
          _this.resource.infoSuccess(response, function(){
          _this.search()
          _this.modal.show1 = false
          })
        },function(response){
          _this.resource.infoError(response)
        });
      },
      closeActivity () {
        var _this = this
        var id =  _this.modal.closeId
        _this.resource.operate(id,'close').then(function(response){
          _this.resource.infoSuccess(response, function(){
          _this.search()
          _this.modal.show2 = false
          })
        },function(response){
          _this.resource.infoError(response)
        });
      },
      orderBy () {
        this.params.search.order_by_updated_at = this.params.search.order_by_updated_at == 'desc' ? 'asc' : 'desc'
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
