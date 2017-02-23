<template><div>
  <div>
    <div class="clearfix location">
      <div class="pull-left">
        <ol class="breadcrumb">
          <li class="active">用户管理</li>
        </ol>
      </div>
      <div class="pull-right">
        <refresh-button @click="refreshFn"></refresh-button>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-body clearfix search">
        <div class="pull-left">
          <label>手机号：　</label>
          <input type="text" class="form-control" name="phone" v-model="params.search.phone">
        </div>
        <div class="pull-left">
          <label>会员编号：</label>
          <input type="text" class="form-control" name="serial_num" v-model="params.search.serials">
        </div>
        <div class="pull-left">
          <label>创建日期：</label>
          <input class="form-control laydate-icon" type="text" @click.stop="open($event,'beginDate')" v-model="calendar.items.beginDate.value" placeholder="">
          　至　
          <input class="form-control laydate-icon" type="text" @click.stop="open($event,'endDate')" v-model="calendar.items.endDate.value" placeholder="">
        </div>
        <div class="pull-left">
          <label>所属中心：</label>
          <input type="text"
                 class="form-control"
                 name="center"
                 v-model="params.search.center_name">
        </div>
        <div class="pull-left">
          <label>宝宝姓名：</label>
          <input type="text"
                 class="form-control"
                 name="baby_name"
                 v-model="params.search.baby_name">
        </div>
        <div class="pull-left">
          <label>推荐人：</label>
          <input type="text"
                 class="form-control"
                 name="recommend_phone"
                 v-model="params.search.recommend_phone">
        </div>
        <div class="pull-left">
          <input class="btn btn-default" type="submit" value="查 询" @click="search">
        </div>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <table class="table table-bordered list-table table-condensed">
        <thead>
        <tr>
          <th width="12%">手机号</th>
          <th width="10%">
            <dropdown :condition="options.status" :title="'状态'" : :def.sync="params.search.status" ></dropdown>
          </th>
          <th width="10%">会员编号</th>
          <th width="10%">
            <dropdown :condition="options.type" :title="'类别'" :def.sync="params.search.type" ></dropdown>
          </th>
          <th width="16%">所属中心</th>
          <th width="10%">宝宝姓名</th>
          <th width="10%">
            <span :class="options.sort[params.search.orderByContractEnd]"  @click="orderBy('orderByContractEnd')">合同到期日<span class="caret" :style="options.icon[iconColor.orderByContractEnd]"></span></span>
           </th>
          <th width="14%">
            <span :class="options.sort[params.search.orderByCreated]"  @click="orderBy('orderByCreated')">创建时间<span class="caret" :style="options.icon[iconColor.orderByCreated]"></span></span>
          </th>
          <th width="8%">操作</th>
        </tr>
        </thead>
        <tbody v-show=" users.length != 0 ">
        <tr v-for="user in users">
          <td>{{ user.phone }}</td>
          <td :class="{'color-red':highlight.parse(user.status)}">{{ options.status[user.status] }}</td>
          <td>{{ user.contract_serials }}</td>
          <td>{{ options.type[user.type]}}</td>
          <td>{{ user.center_name }}</td>
          <td>{{ user.baby_name }}</td>
          <td>{{ user.contract_expired_at}}</td>
          <td>{{ user.created_at | dateCut}}</td>
          <td>
            <a v-link="{name:'user-edit', params:{userId:user.id}}" v-if="user.status != 20">编辑</a>
            <a v-link="{name:'user-audit', params:{id:user.id}}" v-if="user.status == 20">审核</a>
          </td>
        </tr>
        </tbody>
        <tbody v-show=" users.length == 0 ">
          <td colspan="9" class="noData">抱歉，暂无信息</td>
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
  import sort from '../../wedgets/sort.vue'
  import {user,pagination,userStatus,userType,sortType,sortIcon} from '../../utils/data_templates.js'
  import Highlight from '../../utils/highlight.js'
  import paginator from '../../wedgets/paginator.vue'
  import Resource from '../../utils/resource'
  import calendar from '../../wedgets/calendar/calendar.vue'
  import Mock from 'mockjs'
  var defaultParams = function () {
    return {
      search:{
        phone:'',
        serials:'',
        created_at_start:'',
        created_at_end:'',
        baby_name:'',
        center_name:'',
        recommend_phone:'',
        status:0,
        type:0,
        page:1,
        orderByCreated:'desc',
        orderByContractEnd:''
      }
    }
  }
  var defaultIconColor = function(){
    return {
      orderByCreated:'black',
      orderByContractEnd:'grey'
    }
  }
  export default {
    components: {
      refreshButton: refreshButton,
      dropdown:dropdown,
      paginator:paginator,
      sort:sort,
      calendar: calendar
    },
    data () {
      var resource = new Resource(this,'backstage/users');
      var highlight = new Highlight({0:false,10:false,20:true,30:true,40:false,default:false});
      return {
        params:defaultParams(),
        users:[
          {}
        ],
        meta: {
          pagination: pagination,
        },
        options: {
          status: userStatus,
          type: userType,
          sort: sortType,
          icon: sortIcon,

        },
        iconColor:defaultIconColor(),
        resource,
        highlight,
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
      this.mockList()
    },
    watch: {
      'calendar.value': function (val) {
        this.calendar.items[this.calendar.picker].value = val
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
    computed: {
      highLight:function(key){
        return key
      }
    },
    methods: {
      refreshFn () {
        this.params = defaultParams()
        this.iconColor = defaultIconColor()
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
      orderBy(field) {
        if( field == 'orderByCreated'){
          this.params.search.orderByCreated = this.params.search.orderByCreated == 'desc' ? 'asc' : 'desc'
          this.params.search.orderByContractEnd = ''
          this.iconColor.orderByCreated = 'black'
          this.iconColor.orderByContractEnd = 'grey'
        }
        if( field == 'orderByContractEnd'){
          this.params.search.orderByContractEnd = this.params.search.orderByContractEnd == 'desc' ? 'asc' : 'desc'
          this.params.search.orderByCreated = ''
          this.iconColor.orderByCreated = 'grey'
          this.iconColor.orderByContractEnd = 'black'
        }
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
      },
      mockList () {
        var userlist = {
          'ulist|20': [{
            'tel': /1(3|4|5|7|8)\d{9}/,
            'status|1': ['已通过', '已拒绝', '待审核'],
            'member': /A\d{10}/,
            'category|1': ['VIP会员', '会员', '普通会员'],
            'center|1': ['北京总部中心', '上海总部中心', '深圳总部中心'],
            'name': '@cname',
            'ending': '@date',
            'begining': '@date("yyyy-MM-dd HH:mm")',
            'operation|1': ['编辑', '审核']
          }],
          nums: '2'
        }
        var data = Mock.mock(/http:\/\/192.168.7.87:8282\/backstage\/products/, userlist)
        console.log(JSON.stringify(data))
//        return JSON.stringify(data, null, 4)
      }
    }
  }
</script>
