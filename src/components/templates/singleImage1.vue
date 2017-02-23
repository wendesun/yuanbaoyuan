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
                        showPreview:true,
                      overwriteinitial:false,
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
        },
        detached(){
        },
        data(){
            return {}
        },
        watch:{
            'url': function(val){
                  this.init()
//                this.refresh()
            }
        },
        methods:{
            init(){
                var _this = this
                var option = _this.options;
                if(_this.url) {
                  option.initialPreview = [
                    "<img src='"+ _this.url +"' class='file-preview-image' alt='Desert' title='Desert' width='200' height='200'>"
                  ]
                  option.initialPreviewConfig = [
                    {
                      caption: 'desert.jpg',
                      width: '120px',
                      url: _this.url,
                      key: 100,
                      extra: {id: 100}
                    },
                    {
                      caption: 'jellyfish.jpg',
                      width: '120px',
                      url: _this.url,
                      key: 101,
                      frameClass: 'my-custom-frame-css',
                      frameAttr: {
                        style: 'height:80px',
                        title: 'My Custom Title',
                      },
                      extra: function() {
                        return {id: $("#id").val()};
                      },
                    }
                  ]
                }
                $("#singleImage").fileinput(option)
                .on("fileuploaded", function(event,data) {
                    _this.id = data.response['img_id'];
                    _this.url = data.response['img_url'];
//                    $("#singleImage").fileinput('reset');
//                    $("#singleImage").fileinput('refresh');
//                    $("#singleImage").fileinput('clear');
                });
            },
            refresh(){
                var option = {}
                $("#singleImage").fileinput(this.options);
          }
        }
    }
</script>
