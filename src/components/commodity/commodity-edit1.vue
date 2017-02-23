<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li><a v-link="{path : '/commodity/list'}">商品管理</a></li>
        <li class="active">编辑商品</li>
      </ol>
    </div>
  </div>
  <form class="form-horizontal">
    <div class="form-group">
      <label class="col-sm-2 control-label"><span class="star">*</span>　商品类型 :</label>
      <div class="col-sm-8">
        <p class="form-control-static">秒杀商品</p>
      </div>
    </div>
    <div class="form-group" v-show="goodsType">
      <label  class="col-sm-2 control-label"><span class="star">*</span>　商品名称 :</label>
      <div class="col-sm-6">
        <input type="text" class="form-control">
      </div>
      <div class="col-sm-4">
        <p class="form-control-static color-grey">最多输入20字符</p>
      </div>
    </div>

    <div class="form-group" v-if="goodsType == 1">
      <label  class="col-sm-2 control-label"><span class="star">*</span>　商品价格 :</label>
      <div class="col-sm-6">
        <div class="input-group">
          <input type="text" class="form-control">
          <div class="input-group-addon">$</div>
        </div>
      </div>
      <div class="col-sm-4">
        <p class="form-control-static color-grey"><span class="c-333">元</span>　大于0小于999以内的数字，最多输入2位小数</p>
      </div>
    </div>

    <div class="form-group" v-if="goodsType == 1">
      <label  class="col-sm-2 control-label"><span class="star">*</span>　商品配图 :</label>
      <div class="col-sm-6">
        <!--dom结构部分-->
        <div id="uploader-demo">
          <!--用来存放item-->
          <div id="fileList" class="uploader-list"></div>
          <div id="filePicker">选择图片</div>
        </div>
      </div>
      <div class="col-sm-4">
        <p class="form-control-static color-grey">支持jpg/jpeg，png格式，大小在1M以内，只能上传1张图片</p>
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">商品描述 :</label>
      <div class="col-sm-6">
        <textarea class="form-control" rows="5" maxlength="200"></textarea>
      </div>
      <div class="col-sm-4">
        <p class="form-control-static color-grey">最多输入200字符</p>
      </div>
    </div>

    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-default">保 存</button>
      </div>
    </div>
  </form>
</div></template>
<script>
  import $ from 'jquery'
  import WebUploader from 'WebUploader'
  export default {
    data () {
    return {
      goodsType: 1
    }
  },
  ready () {
    var uploader = WebUploader.create({
      // 选完文件后，是否自动上传。
      auto: true,
      // swf文件路径
      swf: 'http://cdn.staticfile.org/webuploader/0.1.0/Uploader.swf',
      // 文件接收服务端。
      server: 'http://webuploader.duapp.com/server/fileupload.php',
      // 选择文件的按钮。可选。
      // 内部根据当前运行是创建，可能是input元素，也可能是flash.
      pick: '#filePicker',
      // 只允许选择图片文件。
      accept: {
        title: 'Images',
        extensions: 'gif,jpg,jpeg,bmp,png',
        mimeTypes: 'image/*'
      }
    })
    uploader.on('fileQueued', function (file) {
      var $li = $(
        '<div id="' + file.id + '" class="file-item thumbnail">' +
        '<img>' +
        '<div class="info">' + file.name + '</div>' +
        '</div>'
      )
      var $img = $li.find('img')
      // $list为容器jQuery实例
      var $list = $('#fileList')
      $list.append($li)

      // 创建缩略图
      // 如果为非图片文件，可以不用调用此方法。
      // thumbnailWidth x thumbnailHeight 为 100 x 100
      var thumbnailWidth = 100
      var thumbnailHeight = 100
      uploader.makeThumb(file, function (error, src) {
        if (error) {
          $img.replaceWith('<span>不能预览</span>')
          return
        }

        $img.attr('src', src)
      }, thumbnailWidth, thumbnailHeight)
    })
    uploader.on('uploadProgress', function (file, percentage) {
      var $li = $('#' + file.id)
      var $percent = $li.find('.progress span')
      // 避免重复创建
      if (!$percent.length) {
        $percent = $('<p class="progress"><span></span></p>').appendTo($li).find('span')
      }
      $percent.css('width', percentage * 100 + '%')
    })
    uploader.on('uploadSuccess', function (file) {
      $('#' + file.id).addClass('upload-state-done')
    })
    uploader.on('uploadError', function (file) {
      var $li = $('#' + file.id)
      var $error = $li.find('div.error')
      // 避免重复创建
      if (!$error.length) {
        $error = $('<div class="error"></div>').appendTo($li)
      }
      $error.text('上传失败')
    })
    uploader.on('uploadComplete', function (file) {
      $('#' + file.id).find('.progress').remove()
    })
  }
  }
</script>
