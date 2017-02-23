<template><div>
  <div>
    <div class="clearfix location">
      <div class="pull-left">
        <ol class="breadcrumb">
          <li class="active">活动管理</li>
          <li><a v-link="{name : 'award-message-list'}">晒奖与留言管理</a></li>
          <li class="active">查看详情</li>
        </ol>
      </div>
    </div>
    <div class="detail">
      <dl class="dl-horizontal">
        <dt>用户账号：</dt>
        <dd>{{ data.user_phone }}</dd>
        <dt>类别：</dt>
        <dd>{{ options.type[data.type] }}</dd>
        <dt>内容：</dt>
        <dd>{{ data.content }}</dd>
        <template v-if="data.type == 10"><div>
          <dd v-if=" data.image_urls.length != 0 " style="margin-top: 8px; margin-bottom: 8px;">
            <multi-viewer :image="data.image_urls"></multi-viewer>
          </dd>
        </div></template>
        <template v-if="data.type == 20">
          <dt>回复：</dt>
          <dd><textarea class="form-control" rows="4"   v-model="data.reply" style="width: 60%; display: inline-block; margin-top: 7px;"></textarea>　最多输入100字符</dd>
          <dd><p class="color-red" v-show="error.show">最多输入100字符</p></dd>
          <dt></dt>
          <dd style="margin-top: 20px"><input class="btn btn-default" type="button" value="保 存" @click="addReply"></dd>
        </div></template>
      </dl>
    </div>
  </div>
</div></template>
<script>
  import Resource from '../../../utils/resource'
  import {awardMessageType} from '../../../utils/data_templates'
  import multiViewer from '../../templates/multiImgViewer.vue'
  export default {
    components:{
      multiViewer
    },
    data () {
      return {
        data:{},
        options:{
          type:awardMessageType
        },
        error:{
          show:false
        }
      }
    },
    created(){
      this.show()
    },

    methods: {
      show () {
        var _this = this
        var resource = new Resource(this,'backstage/comments');
        resource.show(_this.$route.params.id).then(function (response){
          resource.refresh(response)
        },function (response){
          resource.infoError(response)
        })
      },
      addReply () {
        var _this = this
        if(_this.data.reply.length <= 100 && _this.data.reply.length != ''){
          var resource = new Resource(this,'backstage/comments');
          resource.operate(_this.$route.params.id,'reply',{'reply':_this.data.reply}).then(function (response){
            resource.infoSuccess(response, function () {
              _this.error.show = false
              _this.show()
            })
          },function (response){
            resource.infoError(response)
          })
        }else{
          this.error.show = true
        }
      }
    }
  }
</script>
