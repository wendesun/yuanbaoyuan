<template><div>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <ul class="metismenu" id="menu">
        <li class="" v-for="item1 in list">
          <a v-link="{name: item1.name}" aria-expanded="false">{{ item1.title }}<span v-if="item1.hasChild" class="icon-angle-left arrow"></span></a>
          <ul aria-expanded="false" class="collapse" style="height: 0px;" v-if="item1.hasChild">
            <li v-for="item2 in item1.child">
              <a v-link="{name: item2.name}">{{ item2.title }}<span class="icon-angle-left plus-times" v-if="item2.hasChild"></span></a>
              <ul aria-expanded="false" class="collapse" v-if="item2.hasChild">
                <li v-for="item3 in item2.child"><a v-link="{name : item3.name }">{{ item3.title }}</a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</div></template>
<script>

  export default {
    data () {
    return {
      list: [
        {
          "title": "用户管理",
          "hasChild": true,
          "child": [
            {
              "name": "user-list",
              "title": "用户管理"
            }
          ]
        },
        {
          "title": "商品管理",
          "hasChild": true,
          "child": [
            {
              "name": "commodity-list",
              "title": "商品管理"
            }
          ]
        },
        {
          "title": "活动管理",
          "hasChild": true,
          "child": [
            {
              "title": "秒杀管理",
              "name": "seckill-list",
              "hasChild": false
            },
            {
              "title": "抽奖管理",
              "name": "lottery-list",
              "hasChild": false
            },
            {
              "title": "直播管理",
              "name": "live-list",
              "hasChild": false
            },
            {
              "title": "晒奖和留言管理",
              "name": "award-message-list",
              "hasChild": false
            },
            {
              "title": "宝贝评选管理",
              "name": "baby-list",
              "hasChild": false
            },
            {
              "title": "教师评选管理",
              "name": "teacher-list",
              "hasChild": false
            },
            {
              "title": "推荐奖励管理",
              "hasChild": true,
              "child":[
                {
                  "title": "推荐奖励设置",
                  "name": "recommend-set"
                },
                {
                  "title": "用户奖励次数",
                  "name": "recommend-record"
                }
              ]
            }
          ]
        },
        {
          "title": "订单管理",
          "hasChild": true,
          "child": [
            {
              "name": "order-list",
              "title": "订单管理"
            }
          ]
        },
        {
          "title": "文章管理",
          "hasChild": true,
          "child": [
            {
              "name": "article-list",
              "title": "文章管理"
            }
          ]
        },
        {
          "title": "全局设置",
          "name": "setup"
        },
        {
          "title": "版本管理",
          "hasChild": true,
          "child": [
            {
              "name": "version-list",
              "title": "版本管理"
            }
          ]
        }
      ]
    }
  },
  ready () {
    this.sidebarFn()
  },
  methods: {
    sidebarFn () {
      $('#menu').metisMenu({
        toggle: false
      })
    },
  }
  }
</script>
<style>
  .sidebar {
    display: block;
    float: left;
    width: 230px;
    height: 100%;
    overflow-y: auto !important;
    background: #3c454e;
  }
  .sidebar-nav {
    width: 200px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    background-image: -webkit-linear-gradient(left, color-stop(#333333 0px), color-stop(#222222 0px));
    background-image: linear-gradient(to right, #333333 0px, #222222 0px);
    background-repeat: repeat-x;
    filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#ff333333', endColorstr='#ff222222', GradientType=1);
  }
  .sidebar-nav ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .sidebar-nav a, .sidebar-nav a:hover, .sidebar-nav a:focus, .sidebar-nav a:active {
    outline: none;
  }
  .sidebar-nav ul li, .sidebar-nav ul a {
    display: block;
  }
  .sidebar-nav ul a {
    padding: 10px 20px;
    color: #fff;
    background-color: #3c454e;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.05) inset;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.5);
  }
  .sidebar-nav ul a:hover, .sidebar-nav ul a:focus, .sidebar-nav ul a:active {
    color: #fff;
    text-decoration: none;
  }
  .sidebar-nav ul ul a {
    padding: 10px 20px 10px 30px;
    background-color: #30373f;
  }
  .sidebar-nav ul ul a:hover, .sidebar-nav ul ul a:focus, .sidebar-nav ul ul a:active {
    background-color: #1c2228;
  }
  .sidebar-nav a.active{
    background-color: #1c2228;
  }
</style>
