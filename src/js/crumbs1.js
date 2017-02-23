var crumbs = {
  'name': '面包屑',
  'date': '2016-08-28',
  'path': [
    {
      'name': '用户管理',
      'url': '/user/list'
    },
    {
      'name': '编辑用户',
      'url': '/user/edit'
    },
    {
      'name': '审核用户',
      'url': '/user/audit'
    },
    {
      'name': '商品管理',
      'url': '/commodity/list'
    },
    {
      'name': '添加商品',
      'url': '/commodity/add'
    },
    {
      'name': '编辑商品',
      'url': '/commodity/edit'
    },
    {
      'name': '活动管理',
      'url': '/activity/list',
      'child': [
        {
          'name': '秒杀管理',
          'url': 'seckill-list'
        },
        {
          'name': '添加秒杀',
          'url': '/seckill/add'
        }
      ]
    }
  ]
}

module.exports = crumbs
