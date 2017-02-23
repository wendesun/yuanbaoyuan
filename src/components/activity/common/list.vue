<template><div>
  <div>
    <div class="clearfix location">
        <div class="pull-left">
            <ol class="breadcrumb">
                <li class="active">活动管理</li>
                <li class="active">{{configs.title}}管理</li>
            </ol>
        </div>
        <div class="pull-right">
            <refresh-button @click="refreshFn"></refresh-button>
            <a v-link="{name:configs.links.add}" class="btn btn-default btn-sm">添加活动</a>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-body clearfix search">
            <div class="pull-left">
                <label>活动名称：</label>
                <input type="text" class="form-control witdh300" name="name" v-model="params.search.name">
            </div>
            <div class="pull-left">
                <label>开始日期：</label>
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
                <th width="35%">活动名称</th>
                <th width="10%">
                    <dropdown
                            :condition="conditions"
                            :title="'状态'"
                            :def.sync="params.search.condition" ></dropdown>
                </th>
                <th width="15%" @click="changeOrder('start_at')" :class="orderClass('start_at')">开始时间
                    <span class="caret" :style="orderStyle('start_at')"></span>
                </th>
                <th width="15%" @click="changeOrder('end_at')" :class="orderClass('end_at')">结束时间
                    <span class="caret" :style="orderStyle('end_at')"></span>
                </th>
                <th width="15%" @click="changeOrder('updated_at')" :class="orderClass('updated_at')">更新时间
                    <span class="caret" :style="orderStyle('updated_at')"></span>
                </th>
                <th width="10%">操作</th>
            </tr>
            </thead>
            <tbody v-show=" data.length != 0 ">
            <tr v-for="item in data">
                <td><div class="nowrap">{{ item.name }}</div></td>
                <td>{{ item.condition }}</td>
                <td>{{ item.start_at | dateCut}}</td>
                <td>{{ item.end_at | dateCut}}</td>
                <td>{{ item.updated_at | dateCut}}</td>
                <td>
                    <a  v-show="item.condition == '未启动'"
                        v-link="{name:configs.links.edit, params:{id:item.id}}">编辑</a>
                    <a  v-show="item.condition == '未启动'"
                        @click="startActivityModal(item.id)">启动</a>
                    <a  v-show="item.condition == '已启动'"
                        @click="closeActivityModal(item.id)">关闭</a>
                    <a  v-show="item.condition == '已关闭' || item.condition == '已启动'"
                        v-link="{name:configs.links.edit, params:{id:item.id}}">查看</a>
                    <template v-if="configs.links.statistics">
                      <a  v-show="item.condition == '已关闭' || item.condition == '已启动'"
                          v-link="{name:configs.links.statistics, params:{id:item.id}}">统计</a>
                    </div></template>
                </td>
            </tr>
            </tbody>
          <tbody v-show=" data.length === 0 ">
            <td colspan="6" class="noData">抱歉，暂无信息</td>
          </tbody>
        </table>
       <paginator :pagination="meta.pagination" :page.sync="params.search.page" ></paginator>
    </div>
    <modal title="提示"  :msg.sync="modal.msg" :show.sync="modal.show1" @ok="startActivity"></modal>
    <modal title="提示"  msg="已关闭的活动不可再次启动，确定将此活动关闭？" :show.sync="modal.show2" @ok="closeActivity"></modal>
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
    import calendar from '../../../wedgets/calendar/calendar.vue'
    import modal from '../../../wedgets/modal.vue'
    var defaultParams = function() {
        return {
            search:{
                name:'',
                condition: '全部',
                order_field:'updated_at',
                order_by:'desc',
                page:1,
                start_after:'',
                start_end:''
            }
        }
    }
    export default {
        props :{
            configs : {
                type: Object,
                default: function(){
                    return {
                        title : '管理',
                        uri: '',
                        links: {
                            list: '',
                            add: '',
                            edit: ''
                        }
                    }
                }
            },
            conditions : {
                type : Object,
                default: function() {
                    return {
                        全部:'全部',
                        未启动 : '未启动',
                        已启动 : '已启动',
                        已关闭 : '已关闭'
                    }
                }
            }
        },
        components: {
            refreshButton: refreshButton,
            dropdown:dropdown,
            paginator:paginator,
            calendar: calendar,
            modal:modal
        },
        ready(){
            this.search()
        },
        data () {
            var resource = new Resource(this,this.configs.uri)
            return {
                modal:{
                  show1: false,
                  show2: false,
                  startId:'',
                  closeId:'',
                  msg:'已启用的活动不可再进行编辑，确定启用该活动？',
                  hasStart:false
                },
                params:defaultParams(),
                data:[
                    {}
                ],
                meta: {
                    pagination: {}
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
        watch: {
            'calendar.value': function (val) {
              this.calendar.items[this.calendar.picker].value=val
              if( this.calendar.picker == 'beginDate'){
                this.params.search.start_after = val
                this.calendar.items.endDate.begin = val
              }
              if( this.calendar.picker == 'endDate'){
                this.params.search.start_end = val
                this.calendar.items.beginDate.end = val
              }
            },
            'params.search.start_after':function(val){
              this.calendar.items.beginDate.value = val
              this.calendar.items.endDate.begin = val
            },
            'params.search.start_end':function(val){
              this.calendar.items.endDate.value = val
              this.calendar.items.beginDate.end = val
            },
            'params.search.condition': 'search',
            'params.search.page': 'paginatorFn'
        },
        methods: {
            orderClass(field){
                var _this = this
                if(_this.params.search.order_field == field){
                    return _this.params.search.order_by == 'desc' ? 'dropdown' : 'dropup';
                } else {
                    return 'dropdown'
                }
            },
            orderStyle(field){
                return this.params.search.order_field == field ? {color: '#333'} : {color:'#ddd'};
            },
            changeOrder(field){
                var _this = this
                if(_this.params.search.order_field == field) {
                    let order = _this.params.search.order_by == 'desc' ? 'asc' : 'desc';
                    _this.$set('params.search.order_by', order)
                } else {
                    _this.$set('params.search.order_field ', field)
                }
                _this.paginatorFn()
            },
            refreshFn () {
                var _this = this
                _this.params = defaultParams()
                _this.paginatorFn()
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
            startActivityModal(id){
              var _this = this
              var num = 0;
              _this.modal.hasStart = false;
              id = id || '';
              for(var i=0 ; i< _this.data.length; i++){
                if( _this.data[i].condition == '已启动') {
                  num = num + 1;
                  break
                }
              }
              if( num == 0){
                _this.modal.msg = '已启用的活动不可再进行编辑，确定启用该活动？'
              }else{
                _this.modal.hasStart = true;
                _this.modal.msg = '已存在启用的活动，请关闭已启用的活动'
              }
              _this.modal.show1 = true;
              _this.modal.startId = id;
            },

            startActivity(){
              var  _this = this;
              var id = _this.modal.startId;
              if(!_this.modal.hasStart){
                _this.resource.operate(id, 'start').then(function(response){
                  _this.resource.infoSuccess(response, function(){
                    _this.search()
                    _this.modal.show1 = false;
                  })
                }, function(response){
                  _this.resource.infoError(response)
                })
              }
            },
            closeActivityModal(id){
              var _this = this
              id = id || '';
              _this.modal.show2 = true;
              _this.modal.closeId = id;
            },
            closeActivity(id){
              var  _this = this
              var id = _this.modal.closeId;
              _this.resource.operate(id, 'close').then(function (response) {
                _this.resource.infoSuccess(response, function () {
                  _this.search()
                  _this.modal.show2 = false;
                })
              }, function (response) {
                _this.resource.infoError(response)
              });
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
