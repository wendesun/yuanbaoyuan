/*--------- init ------------*/

import Vue from 'vue'
let App = Vue.extend({})

/*---------- vuex --------------*/
import store from './vuex/loading/store.js'
import {setLoadingStatus} from './vuex/loading/action.js'

/*---------- resource --------------*/

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.interceptors.push((request, next) => {
    setLoadingStatus(store,true)
  next((response) => {
    setLoadingStatus(store,false)
    return response
  });
});
/*---------- validate --------------*/

import VueValidator from 'vue-validator'
Vue.use(VueValidator)

/*-------- filter -------------*/

require('./router/filter')

/*-------- wrong -------------*/

require('./css/style.less')
//require('./js/preventFormEnterSubmit.js')

/*-------- plugins -------------*/
window.UEDITOR_HOME_URL = '/static/ueditor/'
window.UEDITOR_SERVER_URL = '/backstage/ueditor/server'

/*--------- router -----------*/

import VueRouter from 'vue-router'
import configRouter from './router/admin-router.js'

Vue.use(VueRouter)
const router = new VueRouter({
  linkActiveClass:'active'
})
configRouter(router)

/*---------- run -----------*/

router.start(App, 'body')
