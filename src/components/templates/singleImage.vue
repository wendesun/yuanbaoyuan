<template><div>
  <input id="singleImage"
         type="file"
         name="file"
         class="file">
</div></template>
<script>
  import $ from 'jquery'
  export default{
    props:{
      options:{
        type:Object,
        default:function(){
          return {
            language: 'zh',
            allowedFileExtensions : ['jpg', 'png','gif','jpeg'],//接收的文件后缀
            showUpload: true,//是否显示上传按钮
            showRemove: true,//是否显示删除按钮
            maxFileSize: 2048,
            maxFileCount: 1,
            showCaption: true,
            autoReplace: true,
            showPreview: false,
            uploadUrl: '/common/image/upload',
          }
        }
      },
      id:{
        type:String,
        twoWay:true,
        default:''
      },
      url:{
        type:String,
        twoWay:true,
        default:''
      }
    },
    attached(){
      this.init()
    },
    detached(){
    },
    ready(){
      this.upload()
    },
    data(){
      return {}
    },
    watch:{
      'url': function(){
        this.init()
      }
    },
    methods:{
      init(){
        var _this = this
        var option = _this.options;
        $("#singleImage").fileinput(option)
      },
      upload(){
        var _this = this
        $("#singleImage").on("fileuploaded", function(event,data) {
          _this.id = data.response['img_id'];
          _this.url = data.response['img_url'];
//                      $("#singleImage").fileinput('reset');
//                      $("#singleImage").fileinput('refresh');
//          $('#input-id').fileinput('clear');

        })
        $('#singleImage').on('filereset', function(event) {
          console.log("filereset");
        });
        $('#singleImage').on('change', function(event) {
            console.log("change");
        });

        $('#singleImage').on('fileclear', function(event) {
          console.log("fileclear");
        });
      }
    }
  }
</script>
