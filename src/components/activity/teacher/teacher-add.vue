<template><div>
  <add-activity :configs="configs" :relations="relations"></add-activity>
</div></template>
<script>
  import addActivity from '../common/add.vue'
  export default {
    components:{
      addActivity:addActivity
    },
    data() {
      return {
        configs: {
          title: '教师评选',
          uri: 'backstage/teacher-selection',
          links: {
            list: 'teacher-list',
            add: 'teacher-add',
            edit: 'teacher-edit',
            statistics: 'teacher-count'
          }
        },
        relations:{
          centers: {
            show: true,
            params: {
              per_page: 10000
            }
          },
          rewards: {
            show: false,
            fields: [],
            keys:[],
            params: {
              type: 0,
              per_page: 10000
            }
          }
        }
      }
    }
  }
</script>

