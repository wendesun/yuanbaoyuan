<template><div>
  <div class="btn-group" style="display: inline">
    <span class="dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">{{title}} ({{condition[def]}})</span>
    <ul class="dropdown-menu">
      <li v-for="(value,item) in condition">
        <a style="cursor:pointer" @click="select(value)" :class="def == value ? 'dhover' : ''">{{item}}</a>
      </li>
    </ul>
  </div>
</div></template>
<script>
  export default {
    props:[
      'condition',
      'def',
      'title'
    ],
    methods:{
      select(value) {
        this.$set('def',value)
      }
    }
  }
</script>
