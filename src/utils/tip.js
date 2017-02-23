export default class Tip {
  showPopTip(message,delayhiding){
    message = message || "";
    delayhiding = delayhiding || 1500;
    if ($("#_tmp_pop_tip").length === 0) {
      var html = '<div class="text-center loadingBox" id="_tmp_pop_tip" style="display: none;z-index:1000;"><span></span><div class="pop-tip">'+message+'</div></div>'
      $(html).appendTo("#main");
    }
    $("#_tmp_pop_tip").show();
    if (delayhiding) {
      this.hidePopTip(delayhiding);
    }
  }

  hidePopTip(delay){
    delay = delay || 0;
    if (delay > 0) {
      setTimeout(function () {
        $("#_tmp_pop_tip").remove();
      }, delay);
    } else {
      $("#_tmp_pop_tip").remove();
    }
  }
}
