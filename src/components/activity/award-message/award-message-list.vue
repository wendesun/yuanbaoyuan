<template><div>
  <div>
    <div class="clearfix location">
      <div class="pull-left">
        <ol class="breadcrumb">
          <li class="active">活动管理</li>
          <li class="active">晒奖与留言管理</li>
        </ol>
      </div>
      <div class="pull-right">
        <refresh-button @click="refreshFn"></refresh-button>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-body clearfix search">
        <div class="pull-left">
          <label>用户账号：</label>
          <input type="text" class="form-control witdh300" name="name" v-model="params.search.user_phone">
        </div>
        <div class="pull-left">
          <label>创建日期：</label>
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
          <th width="10%">用户账号</th>
          <th width="10%">
            <dropdown
              :condition="options.type"
              :title="'类别'"
              :def.sync="params.search.type" ></dropdown>
          </th>
          <th  width="10%">
            <dropdown
              :condition="options.status"
              :title="'状态'"
              :def.sync="params.search.status" ></dropdown>
          </th>
          <th  width="46%">内容</th>
          <th  width="14%">
            <span :class="options.sort[params.search.order_by]"  @click="orderBy()">创建时间<span class="caret"></span></span>
          </th>
          <th  width="10%">操作</th>
        </tr>
        </thead>
        <tbody v-show=" data.length != 0 ">
        <tr v-for="item in data" track-by="$index">
          <td>{{ item.user_phone }}</td>
          <td>{{ options.type[item.type] }}</td>
          <td>{{ options.status[item.status] }}</td>
          <td><div class="nowrap">{{ item.content}}</div></td>
          <td>{{ item.created_at | dateCut}}</td>
          <td>
            <a v-link="{name:'award-message-detail', params:{id:item.id}}">查看</a>
            <a v-show="item.status == 20" @click="soldoutModal(item.id, $index)">下架</a>
            <a v-show="item.status == 10" @click="publishModal(item.id, $index)">发布</a>
          </td>
        </tr>
        </tbody>
        <tbody v-show=" data.length == 0 ">
          <td colspan="6" class="noData">抱歉，暂无信息</td>
        </tbody>
      </table>
      <paginator :pagination="meta.pagination" :page.sync="params.search.page" ></paginator>
    </div>
    <modal title="提示"  msg="确认发布此条信息？" :show.sync="modal.show1" @ok="publish"></modal>
    <modal title="提示"  msg="确认下架此条信息？" :show.sync="modal.show2" @ok="soldout"></modal>
    <calendar
      :show.sync="calendar.show"
      :type="calendar.type"
      :value.sync="calendar.value"
      :x="calendar.x"
      :y="calendar.y"
      :begin.sync="calendar.begin"
      :end.sync="calendar.end">
    </calendar>
  </div>
</div></template>
<script>
  import refreshButton from '../../../wedgets/refresh-button.vue'
  import dropdown from '../../../wedgets/dropdown.vue'
  import paginator from '../../../wedgets/paginator.vue'
  import Resource from '../../../utils/resource'
  import {pagination,awardMessageType,awardMessageStatus,sortType} from '../../../utils/data_templates'
  import modal from '../../../wedgets/modal.vue'
  import calendar from '../../../wedgets/calendar/calendar.vue'
  var defaultParams = function () {
    return {
      search:{
        user_phone:'',
        created_at_start:'',
        created_at_end:'',
        status:0,
        type:0,
        order_field:'created_at',
        order_by:'desc',
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
      var resource = new Resource(this,'backstage/comments')
      return {
        params:defaultParams(),
        data:[
          {}
        ],
        meta: {
          pagination: {}
        },
        options: {
          type:awardMessageType,
          status:awardMessageStatus,
          sort: sortType
        },
        modal:{
          show1: false,
          show2: false,
          publishId:'',
          publishIndex:'',
          soldoutId:'',
          soldoutIndex:'',
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
          this.params.search.created_at_start = val
          this.calendar.items.endDate.begin = val
        }
        if( this.calendar.picker == 'endDate'){
          this.params.search.created_at_end = val
          this.calendar.items.beginDate.end = val
        }
      },
      'params.search.created_at_start':function(val){
        this.calendar.items.beginDate.value = val
        this.calendar.items.endDate.begin = val
      },
      'params.search.created_at_end':function(val){
        this.calendar.items.endDate.value = val
        this.calendar.items.beginDate.end = val
      },
      'params.search.status': 'search',
      'params.search.type': 'search',
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
      publishModal (id, index) {
        this.modal.publishId = id
        this.modal.publishIndex = index
        this.modal.show1 = true
      },
      soldoutModal (id, index) {
        this.modal.soldoutId = id
        this.modal.soldoutIndex = index
        this.modal.show2 = true
      },
      publish () {
        var _this = this
        var id = _this.modal.publishId
        var index = _this.modal.publishIndex
        _this.resource.update(id + '/publish', {}).then(function(response){
          _this.resource.infoSuccess(response, function(){
            _this.data[index].status = 20
            _this.modal.show1 = false
//        _this.search()
          })
        },function(response){
          _this.resource.infoError(response)
        });
      },
      soldout () {
        var _this = this
        var id = _this.modal.soldoutId
        var index = _this.modal.soldoutIndex
        _this.resource.update(id + '/off-publish', {}).then(function(response){
          _this.resource.infoSuccess(response, function(){
            _this.data[index].status = 10
            _this.modal.show2 = false
//        _this.search()
          })
        },function(response){
          _this.resource.infoError(response)
        });
      },
      orderBy () {
        this.params.search.order_by = this.params.search.order_by == 'desc' ? 'asc' : 'desc'
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
