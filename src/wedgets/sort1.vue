<template><div>
  <span :class="condition[order[defaultset]]"  @click="sort">{{ title }}<span class="caret"></span></span>
</div></template>
<script>
  export default {
    props:[
      'title',
      'condition',
      'defaultset',
      'order',
      'reset'
    ],
    methods: {
      sort () {
        var order = this.order
        var defaultset = this.defaultset
        var reset = this.reset
        if( order[defaultset] == 'desc'){
          order = {
            defaultset:'asc',
            reset: ''
          }
          this.$set('order',order)
        }else{
          order = {
            defaultset:'desc',
            reset: ''
          }
          this.$set('order',order)
        }
        console.log('1111111111' + JSON.stringify(order) + defaultset + '======' + reset)
      }
    }
  }
</script>
