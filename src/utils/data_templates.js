//用户管理
let user = {
        id: 1,
        phone: 13012345678,
        email: "test@test.com",
        push_id: "",
        contract_serials: "",
        contract_expired_at: '',
        center_name: "北京",
        status: 10 ,
        status_text:"未审核",
        type: 10,
        type_text:"普通会员",
        avatar:"",
        avatar_url:"",
        baby_name:"小宝",
        baby_nickname:"小小宝",
        baby_gender:0,
        baby_gender_text:"女",
        baby_birthday: "2000-01-01",
        remarks: "",
        verified_at:"",
        created_at: "2016-09-11 19:40:06",
        update_at: "2016-09-11 19:40:06"
    };
let pagination = {
        total:100,
        count:100,
        per_page:20,
        current_page:1,
        total_pages:5
    };

let userStatus = {
    0: '全部',
    10: '未审核',
    20: '待审核',
    30: '已拒绝',
    40: '已通过'
}

let userType = {
    0 : '全部',
    10 : '普通用户',
    20 : '高级用户',
    30 : 'vip'
}
let sortType = {
    desc : 'dropdown',
    asc  : 'dropup',
    '':'dropdown'
}
let sortIcon = {
  grey : {color:'#ddd'},
  black : {color:'#333'}
}

let order = {
  origin:{
    order:'desc',
    class:'dropdown'
  },
  change:{
    order:'asc',
    class:'dropup'
  }
}

//商品管理
let reward = {
  "id": "1",
  "type": "20",
  "title": "风扇",
  "desc": "给你带来夏天的一丝清凉",
  "price": "1000",
  "image": "i.jpg",
  "created_at": "2016-09-12 15:19:48",
  "updated_at": "2016-09-12 15:19:48",
  "img_url": "http://192.168.1.35:8535/files/i.jpg"
}

let commodityType = {
  0 : '全部',
  10 :'秒杀商品',
  20 :'抽奖商品',
  30 :'推荐奖品'
}
//文章管理
let articleStatus = {
  0: '全部',
  10: '未审核',
  20: '待审核',
  30: '已拒绝',
  40: '已通过'
}
let articleType = {
  0 : '全部',
  10 :'注册用户',
  20 :'普通会员',
  30 :'vip会员'
}
let articleStick = {

}
//抽奖管理
let lotteryStatus = {
  0 : '全部',
  10 : '关闭',
  20 : '启用'
}

//抽奖和留言管理
let awardMessageType = {
  0 : '全部',
  10 : '晒奖',
  20 : '课程留言'
}
let awardMessageStatus = {
  0 : '全部',
  10 : '未发布',
  20 : '已发布'
}
//订单管理
let orderStatus = {
  '':'全部',
  '待确认':'待确认',
  '待支付':'待支付',
  '待发货':'待发货',
  '已发货':'已发货',
  '已完成':'已完成',
  '已取消':'已取消'
}
let orderType = {
  0 : '全部',
  10 :'秒杀订单',
  20 :'抽奖订单',
  30 :'推荐奖励',
  40 :'证书订单'
}
//直播管理
let liveStatus = {
  0 : '全部',
  10 : '关闭',
  20 : '启用'
}
export {
    user,
    pagination,
    userStatus,
    userType,
    sortType,
    sortIcon,
    order,
    reward,
    commodityType,
    lotteryStatus,
    awardMessageType,
    awardMessageStatus,
    orderStatus,
    orderType,
    liveStatus
}
