<template><div>
    <div class="clearfix location">
      <div class="pull-left">
        <ol class="breadcrumb">
          <li class="active">添加商品</li>
        </ol>
      </div>
      <div class="pull-right">
        <a class="btn btn-default btn-sm" href="#" role="button">刷新</a>
        <input class="btn btn-default btn-sm" type="button" value="添加商品">
      </div>
    </div>
    <div class="container-fluid search" style="padding-top: 20px;">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-1 control-label no-wrap">商品名称：</label>
          <div class="col-sm-5">
            <input type="text" class="form-control">
          </div>
          <div class="col-md-1">
            <input class="btn btn-default" type="submit" value="查 询">
          </div>
        </div>
      </form>
    </div>
    <div style="margin-top: 20px;">
      <table class="table table-bordered list-table">
        <thead>
        <tr>
          <th>手机号码</th>
          <th>状态
            <div class="btn-group" style="display: inline">
              <span class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">(全部)</span>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
              </ul>
            </div>
          </th>
          <th>会员编号</th>
          <th>类别(全部)</th>
          <th>所属中心</th>
          <th>宝宝全名</th>
          <th>合同到期日</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users">
          <td>{{ user.tel }}</td>
          <td>{{ user.status }}</td>
          <td>{{ user.member }}</td>
          <td>{{ user.category }}</td>
          <td>{{ user.center }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.ending }}</td>
          <td>{{ user.begining }}</td>
          <td>{{ user.operation }}</td>
        </tr>
        </tbody>
      </table>
      <v-paginator :resource.sync="users" :resource_url="resource_url"></v-paginator>
    </div>
</div></template>
<script>
  import $ from 'jquery'
  import Mock from 'mockjs'
  import VuePaginator from 'vuejs-paginator'
  export default {
    components: {
      VPaginator: VuePaginator
    },
    data () {
      return {
        users: [],
        resource_url: 'http://hootlex.github.io/vuejs-paginator/samples/animals1.json'
      }
    },
    methods: {
      getList () {
        $.ajax({
          url: 'user.json',
          dataType: 'json'
        }).done(function (data, status, jqXHR) {
          var list = []
          list.push(data.ulist)
          // console.log(JSON.stringify(list, null, 4))
        })
      },
      mockList () {
        var userlist = {
          'ulist|50': [{
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
        var data = Mock.mock(/\.json/, userlist)
        return JSON.stringify(data, null, 4)
      }
    }
  }
</script>
