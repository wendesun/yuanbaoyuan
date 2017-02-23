import Tip from  './tip.js'
class XsResource {
    constructor(vue, uri) {
        this.vue = vue
        this.uri = uri
    }

    index(params) {
        var _this = this
        _this.promise =  _this.vue.$http.get(_this.uri, XsResource.params(params))
        return _this
    }

    show(id, params) {
        var _this = this
        _this.promise = _this.vue.$http.get(_this.uri + '/' + id, XsResource.params(params))
        return _this
    }

    create(data) {
        var _this = this
        _this.promise = _this.vue.$http.post(_this.uri , data)
        return _this
    }

    update(id, data) {
        var _this = this
        id = id == '' ? '' : '/'+id
        _this.promise = _this.vue.$http.put(_this.uri + id, data)
        return _this
    }

    delete(id, data) {
      var _this = this
      id = id == '' ? '' : '/'+id
      _this.promise = _this.vue.$http.delete(_this.uri + id, data)
      return _this
    }

    setup(id, data) {
      var _this = this
      id = id == '' ? '' : '/'+id
      _this.promise = _this.vue.$http.post(_this.uri + id, data)
      return _this
    }

    operate(id, action, data) {
        var _this = this
        _this.promise = _this.vue.$http.put(_this.uri + '/' + id + '/' + action,  data);
        return _this
    }

    destroy(id) {

    }

    $get(uri, params){
        var _this = this
        _this.promise = _this.vue.$http.get(_this.uri + uri , XsResource.params(params))
        return _this
    }



    then(success, fail) {
        var _this = this
        return _this.promise.then(function(response){
            var data = response.json()
            //处理errorcode
            if(data && data.hasOwnProperty('errorcode')){
                var realCode = data.errorcode.substr(0,3)
                var message  = data.errormsg ? data.errormsg : '服务异常'
                _this.handleError(realCode, message, data)
            } else {
                success.call(_this.vue, response)
            }
        }, function(response){
            fail.call(_this.vue, response)
        });
    }

    static params (parameters) {
        if(parameters){
            return {
                params: parameters
            }
        } else {
            return {}
        }
    }

    refresh (response, success, failure) {
        let data = response.json()
        //console.log(JSON.stringify(data))
        var _this = this
        if(!data){
            alerting('服务异常, 请重试')
            if(failure){
                failure()
            }
        } else {
            for (var key of Object.keys(data)) {
                if (data.hasOwnProperty(key) && _this.vue.$data.hasOwnProperty(key)) {
                    _this.vue.$set(key, data[key]);
                }
            }
            if(success){
                success();
            }
        }
    }

    infoSuccess (response, success, failure) {
        var data = response.json()
        if (!data) {
            this.alerting('服务异常, 请重试')
            failure && failure()
        //请求结果有status
        } else if(data.hasOwnProperty('status')){
            //
            if(data.status == 200){
                let message = data && data.hasOwnProperty('message') ? data.message : '保存成功';
                this.alerting(message)
                success && success()
            } else {
                let message = data && data.hasOwnProperty('message') ? data.message : '保存失败，请重新保存';
                this.alerting(message)
                failure && failure()

            }
        //请求结果没有status
        } else {
            let message = data && data.hasOwnProperty('message') ?  data.message : '保存成功' ;
            this.alerting(message)
            success && success()
        }
    }

    infoError (response, callback) {
        this.alerting('请求失败: ' + response.statusText)
        if(callback){
            callback()
        }
    }

    alerting(message) {
      var tip = new Tip()
      tip.showPopTip(message)
    }

    handleError(code, message, json) {
        var _this = this
        _this.alerting(message)
    }
}


export default XsResource
