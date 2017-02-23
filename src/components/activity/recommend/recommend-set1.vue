<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li class="active">活动管理</li>
        <li class="active">推荐奖励管理</li>
      </ol>
    </div>
  </div>

  <validator name="validation1">
    <form class="form-horizontal" novalidate>
      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　活动主图 :</label>
        <div class="col-sm-6">
          <img src="http://123.57.223.162:8555/files/0034a0ab18f9fa54517fde665c102c97.jpg" alt="商品配图" style="max-height: 200px;"/>
          <input type="hidden" class="form-control" v-model="data.image" initial="off" detect-change="off" detect-blur="off" v-validate:image="{ required: true }">
          <p class="form-control-static color-red" v-if="$validation1.image.required">活动主图不能为空</p>
        </div>
      </div>
      
      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　奖励规则 :</label>
        <div class="col-sm-6">
            用户每推荐
            <input type="text" class="form-control"  style="display: inline-block; width: 80px;" v-model="data.name"
                   v-model="data.title"
                   initial="off"
                   detect-change="off"
                   detect-blur="off"
                   v-validate:regulation="{required:true, pattern: '/^[1-9][0-9]*$/' }">
            名用户成为VIP会员，便可获取1次奖励。（只允许输入大于0的整数）
          <p class="form-control-static color-red" v-if="$validation1.regulation.required">奖励规则不能为空</p>
          <p class="form-control-static color-red" v-if="$validation1.regulation.pattern">只允许输入大于0的整数</p>
        </div>
      </div>
      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　奖品设置 :</label>
        <div class="col-sm-8">
          <button class="btn btn-default" data-toggle="modal" data-target="#reward-modal">添加奖品</button>
          <table class="table table-bordered table-hover" style="margin-top: 15px">
            <thead>
            <tr>
              <th>奖品名称</th>
              <th>奖品数量</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="reward in data.reward_list" track-by="id">
              <td>{{reward.title}}</td>
              <td><input type="text" style="border:none;" v-model="reward.total|integer" ></td>
              <td><a @click="removeReward(reward)">删除</a></td>
            </tr>
            </tbody>
          </table>
          <input type="hidden" v-model="data.reward_list" initial="off" detect-change="off" detect-blur="off" v-validate:reward_list="{ required: true }"/>
          <p class="form-control-static color-red" v-if="$validation1.reward_list.required">请选择奖品</p>
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-default" @click="saveActivity()">  保 存  </button>
        </div>
      </div>
    </form>
  </validator>
  <rewardmodal :id="'reward-modal'"
               :modal="params.rewards"
               :data.sync="data.reward_list"></rewardmodal>
</div></template>
<script>
  import centermodal from "../../templates/selection-modal.vue"
  import rewardmodal from "../../templates/selection-modal.vue"
  import Resource from "../../../utils/resource"
  export default {
    components:{
      centermodal,
      rewardmodal
    },
    ready () {
    if(this.$route.name == 'lottery-edit') {
      this.retrieveActivity();
    }
    this.datePlugin()
  },
  data () {
    var resource = new Resource(this, 'backstage/lotteries')
    return {
      params: {
        centers:{
          title:'选择加盟中心',
          auto:false,
          form:[
            {
              field:"keyword",
              type:'text',
              title:'中心名称',
              value:''
            }
          ],
          keys:[
            {
              title:'中心名称',
              field:'name'
            }
          ],
          resource:'backstage/centers',
          params:{}
        },
        rewards:{
          title:'选择奖品',
          auto:true,
          form:[
            {
              field:"keyword",
              type:'text',
              title:'奖品名称',
              value:''
            }
          ],
          keys:[
            {
              title:'奖品名称',
              field:'title'
            }
          ],
          resource:'backstage/products',
          params:{
            type:20
          }
        },
        modal:{
          center:false
        }
      },
      data: {
        center_filter_type: 20,
        center_list:[],
        reward_list:[]
      },
      resource
    }
  },
  methods: {
    datePlugin () {
      var _this = this
      var start = {
        elem: '#start',
        istime: true,
        format: 'YYYY-MM-DD hh:mm:ss',
        choose: function(datas){
          end.min = datas;
          _this.data.start_at = datas
        }
      }
      var end = {
        elem: '#end',
        istime: true,
        format: 'YYYY-MM-DD hh:mm:ss',
        choose: function(datas){
          _this.data.end_at = datas
        }
      }
      laydate(start);
      laydate(end);
    },
    removeCenter(item){
      this.data.center_list.$remove(item)
    },
    removeReward(item){
      this.data.reward_list.$remove(item)
    },
    saveActivity(e){
      var _this = this
      this.$validate(true, function () {
        if (_this.$validation1.invalid) {
          e.preventDefault()
        }else{
          if(_this.$route.name == 'lottery-add'){
            _this.createActivity();
          } else if(_this.$route.name == 'lottery-edit') {
            _this.updateActivity()
          }
        }
      })

    },
    createActivity(){
      var _this = this
      _this.resource.create(_this.data).then(function(response){
        _this.resource.infoSuccess(response,function(){
          _this.$router.go({name:'lottery-list'})
        })
      },function(response){
        _this.resource.infoError(response)
      });
    },
    updateActivity(){
      var _this = this
      var id = _this.$route.params.id;
      _this.resource.update(id, _this.data).then(function(response){
        _this.resource.infoSuccess(response, function(){
          _this.retrieveActivity(id);
        })
      },function(response){
        _this.resource.infoError(response)
      })
    },
    retrieveActivity(id){
      var _this = this
      var id = id || _this.$route.params.id;
      _this.resource.show(id).then(function(response){
        _this.resource.refresh(response)
//          console.log(response.json())
      },function(response){
        _this.resource.infoError(response)
      });
    }
  }
  }
</script>
