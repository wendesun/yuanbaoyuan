<template v-if="image">
  <ul id="dowebok" @click="view()" v-show="image">
    <li v-for="img in image" track-by="$index"><img class="image" :src="img" alt="Picture" :style="viewerStyle"></li>
  </ul>
</div></template>
<script>
    import $ from 'jquery'
    export default{
        props:{
          image:{
              type:Array
          },
          viewerStyle:{
            type:Object,
            default:function(){
              return {
                height: '200px',
                width: '200px'
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
                $('#dowebok').viewer();
            }
        }
    }
</script>
<style>
  #dowebok{ margin-top: 15px !important;}
  #dowebok, li{ list-style: none; padding: 0; margin: 0;}
  #dowebok li { float: left; margin-right: 15px;}
</style>
