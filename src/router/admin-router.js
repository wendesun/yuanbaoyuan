export default function configRouter (router) {
  router.map({
    '/': {
      name: 'index',
      component: (resolve) => {
        require(['../admin.vue'], resolve)
      },
      subRoutes: {
        //用户管理
        '/user/list': {
          name: 'user-list',
          component: (resolve) => {
            require(['../components/usermanager/user-list.vue'], resolve)
          }
        },
        '/user/:userId/edit': {
          name: 'user-edit',
          component: (resolve) => {
            require(['../components/usermanager/user-edit.vue'], resolve)
          },
          subRoutes: {
            '/personal':{
                name: 'user-edit-personal',
                component: (resolve) => {
                  require(['../components/usermanager/user-edit-personal.vue'], resolve)
                },
            },
            '/contract':{
                name: 'user-edit-contract',
                component: (resolve) => {
                  require(['../components/usermanager/user-edit-contract.vue'], resolve)
                }
            },
            '/orders':{
                name: 'user-edit-orders',
                component: (resolve) => {
                  require(['../components/usermanager/user-edit-orders.vue'], resolve)
                }
            }
          }
        },
        '/user/:id/audit': {
          name: 'user-audit',
          component: (resolve) => {
            require(['../components/usermanager/user-audit.vue'], resolve)
          }
        },
        //商品管理
        '/commodity/list': {
          name: 'commodity-list',
          component: (resolve) => {
            require(['../components/commodity/commodity-list.vue'], resolve)
          }
        },
        '/commodity/add': {
          name: 'commodity-add',
          component: (resolve) => {
            require(['../components/commodity/commodity-add.vue'], resolve)
          }
        },
        '/commodity/:id/edit': {
          name: 'commodity-edit',
          component: (resolve) => {
            require(['../components/commodity/commodity-edit.vue'], resolve)
          }
        },
        //秒杀管理
        '/seckill/list': {
          name: 'seckill-list',
          component: (resolve) => {
            require(['../components/activity/seckill/seckill-list.vue'], resolve)
          }
        },
        '/seckill/add': {
          name: 'seckill-add',
          component: (resolve) => {
            require(['../components/activity/seckill/seckill-add.vue'], resolve)
          }
        },
        '/seckill/:id/edit': {
          name: 'seckill-edit',
          component: (resolve) => {
            require(['../components/activity/seckill/seckill-add.vue'], resolve)
          }
        },
        //抽奖管理
        '/lottery/list': {
          name: 'lottery-list',
          component: (resolve) => {
            require(['../components/activity/lottery/lottery-list.vue'], resolve)
          }
        },
        //添加抽奖
        '/lottery/add': {
          name: 'lottery-add',
          component: (resolve) => {
            require(['../components/activity/lottery/lottery-add.vue'], resolve)
          }
        },
        //编辑抽奖
        '/lottery/:id/edit': {
          name: 'lottery-edit',
          component: (resolve) => {
            require(['../components/activity/lottery/lottery-add.vue'], resolve)
          }
        },
        //直播管理
        '/live/list': {
          name: 'live-list',
          component: (resolve) => {
            require(['../components/activity/live/live-list.vue'], resolve)
          }
        },
        '/live/add': {
          name: 'live-add',
          component: (resolve) => {
            require(['../components/activity/live/live-add.vue'], resolve)
          }
        },
        '/live/:id/edit': {
          name: 'live-edit',
          component: (resolve) => {
            require(['../components/activity/live/live-add.vue'], resolve)
          }
        },
        '/live/:id/detail': {
          name:'live-detail',
          component: (resolve) => {
            require(['../components/activity/live/live-detail.vue'], resolve)
          }
        },
        //晒奖和留言管理
        '/award-message/list': {
          name: 'award-message-list',
          component: (resolve) => {
            require(['../components/activity/award-message/award-message-list.vue'], resolve)
          }
        },
        '/award-message/:id/detail': {
          name: 'award-message-detail',
          component: (resolve) => {
            require(['../components/activity/award-message/award-message-detail.vue'], resolve)
          }
        },
        //宝贝评选管理
        '/baby/list': {
          name: 'baby-list',
          component: (resolve) => {
            require(['../components/activity/baby/baby-list.vue'], resolve)
          }
        },
        '/baby/add': {
          name: 'baby-add',
          component: (resolve) => {
            require(['../components/activity/baby/baby-add.vue'], resolve)
          }
        },
        '/baby/:id/edit': {
          name: 'baby-edit',
          component: (resolve) => {
            require(['../components/activity/baby/baby-add.vue'], resolve)
          }
        },
        '/baby/:id/count': {
          name: 'baby-count',
          component: (resolve) => {
            require(['../components/activity/baby/baby-count.vue'], resolve)
          }
        },
        //教师评选管理
        '/teacher/list': {
          name: 'teacher-list',
          component: (resolve) => {
            require(['../components/activity/teacher/teacher-list.vue'], resolve)
          }
        },
        '/teacher/add': {
          name: 'teacher-add',
          component: (resolve) => {
            require(['../components/activity/teacher/teacher-add.vue'], resolve)
          }
        },
        '/teacher/:id/edit': {
          name: 'teacher-edit',
          component: (resolve) => {
            require(['../components/activity/teacher/teacher-add.vue'], resolve)
          }
        },
        '/teacher/:id/count': {
          name: 'teacher-count',
          component: (resolve) => {
            require(['../components/activity/teacher/teacher-count.vue'], resolve)
          }
        },
        //推荐奖励管理
        '/recommend/set': {
          name: 'recommend-set',
          component: (resolve) => {
            require(['../components/activity/recommend/recommend-set.vue'], resolve)
          }
        },
        '/recommend/record': {
          name: 'recommend-record',
          component: (resolve) => {
            require(['../components/activity/recommend/recommend-record.vue'], resolve)
          }
        },
        //订单管理
        '/order/list': {
          name: 'order-list',
          component: (resolve) => {
            require(['../components/order/order-list.vue'], resolve)
          }
        },
        '/order/:id/detail': {
          name: 'order-detail',
          component: (resolve) => {
            require(['../components/order/order-detail.vue'], resolve)
          }
        },
        //文章管理
        '/article/list': {
          name: 'article-list',
          component: (resolve) => {
            require(['../components/article/article-list.vue'], resolve)
          }
        },
        '/article/add': {
          name: 'article-add',
          component: (resolve) => {
            require(['../components/article/article-add.vue'], resolve)
          }
        },
        '/article/:id/edit': {
          name: 'article-edit',
          component: (resolve) => {
            require(['../components/article/article-add.vue'], resolve)
          }
        },
        //全局设置
        '/setup': {
          name: 'setup',
          component: (resolve) => {
            require(['../components/setup/setup.vue'], resolve)
          }
        },
        //版本管理
        '/version/list': {
          name: 'version-list',
          component: (resolve) => {
            require(['../components/version/version-list.vue'], resolve)
          }
        },
        '/version/add': {
          name: 'version-add',
          component: (resolve) => {
            require(['../components/version/version-add.vue'], resolve)
          }
        },
        '/version/:id/edit': {
          name: 'version-edit',
          component: (resolve) => {
            require(['../components/version/version-add.vue'], resolve)
          }
        }
      }
    }
  })
  router.alias({
    '/': '/user/list',
    '/user/:userId/edit': '/user/:userId/edit/personal'
  })
}

