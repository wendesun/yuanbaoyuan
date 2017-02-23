<template v-if="image">
  <img class="image" :src="image" alt="Picture" :style="styleObject" @click="view()" v-show="image">
</div></template>
<script>
  import $ from 'jquery'
  export default{
    props:{
      image:{
        type:String
      },
      styleObject:{
        type:Object,
        default:function(){
          return {
            height: '200px',
            width: '200px',
            marginTop: '15px'
          }
        }
      }
    },
    data(){
    return{
    }
  },
  methods:{
    view(){
      $('.image').viewer();
    }
  }
  }
</script>
