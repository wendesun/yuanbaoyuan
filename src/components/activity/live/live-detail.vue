<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li class="active">活动管理</li>
        <li><a v-link="{path : '/live/list'}">直播管理</a></li>
        <li class="active">查看详情</li>
      </ol>
    </div>
  </div>
  <div class="detail">
    <dl class="dl-horizontal">
      <dt>课程名称：</dt>
      <dd>{{ data.name }}</dd>
      <dt>课程描述：</dt>
      <dd>{{data.desc}}</dd>
      <dt>课程链接：</dt>
      <dd><div style="margin-top: 10px;" v-html="data.link"></div></dd>
    </dl>
  </div>
</div></template>
<script>
  import Resource from '../../../utils/resource'
  import {liveStatus,sortType} from '../../../utils/data_templates'
  export default {
    data () {
      return {
        data:{},
        options: {
          sort: sortType,
          status:liveStatus
        }
      }
    },
    created(){
      this.detail()
    },
    methods: {
      detail () {
        var _this = this
        var resource = new Resource(this,'backstage/lives');
        resource.show(_this.$route.params.id).then(function (response){
          resource.refresh(response)
        },function (response){
          resource.infoError(response)
        })
      }
    }
  }
</script>
