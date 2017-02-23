<template v-if="modal.show">
  <!-- Modal -->
  <div class="modal fade"
       :id="id"
       tabindex="-1"
       role="dialog"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">关闭</span></button>
          <h4 class="modal-title" id="myModalLabel">{{modal.title}}</h4>
        </div>
        <div class="modal-body form-horizontal" style="max-height:500px;overflow:scroll">
            <div class="form-group">
                <div class="col-sm-8">
                    <formation v-for="item in modal.form" :form.sync="item"></formation>
                </div>
                <div class="col-sm-4">
                    <button class="btn btn-info" @click="search">查询</button>
                </div>
            </div>
            <div style="padding:.5em 2em" >
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th width="100">
                          <input @click="selectAllFn" type="checkbox"
                                 v-model="selectAll"
                                > <span style="vertical-align: top">全选</span></th>
                      <th v-for="key in modal.keys">{{key.title}}</th>
                    </tr>
                  </thead>
                  <tbody v-show=" length != 0 ">
                  <tr v-for="item in modal.data" >
                    <td><input type="checkbox" :value="item.id" v-model="selection"></td>
                    <td v-for="key in modal.keys" >{{filter(key,item)}}</td>
                  </tr>
                  </tbody>
                  <tbody v-show=" length === 0 ">
                    <td :colspan="colspan" class="noData">{{errorMsg}}</td>
                  </tbody>
                </table>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="save()" data-dismiss="modal">保存</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
  </div>
</div></template>
<script>
    import formation from "./form-group"
    export default{
        props:{
            id: {
                type : String,
                required: true,
                default:"modal"
            },
            modal: {
                type : Object,
                required: true,
                default: function(){
                    return {
                        title:'',
                        auto:false,
                        form:[
                            {
                                field:"",
                                type:'',
                                title:'',
                                value:''
                            }
                        ],
                        keys:[],
                        fields:[
                            {
                                title:'',
                                name:''
                            }
                        ],
                        data:[],
                        resource:'',
                        show:'',
                        params:{}
                    }
                }
            },
            data: {
                type : Array,
                towWay:true,
                required: true,
                default:function(){
                    return []
                }
            }
        },
        components:{
          formation
        },
        ready(){
            if(this.modal.auto){
                this.search()
            }
        },
        data(){
            return{
                selectAll:false,
                selection:[],
                errorMsg:''
            }
        },
        computed:{
          colspan:function(){
            return this.modal.keys.length + 1;
          },
          length:function(){
            var list = [];
                list = list.concat(this.modal.data);
            return list.length;
          }
        },
        watch: {
          'selection': function(val){
            var _this = this
            var total = [].concat(_this.modal.data);
            if(val.length < total.length){
              _this.$set('selectAll',false)
            }else{
              _this.$set('selectAll',true)
            }
          }
        },
        methods: {
          selectAllFn () {
              var _this = this
              if(!_this.selectAll && _this.modal.data && _this.modal.data.length) {
                var ids = [];
                for(var item of _this.modal.data){
                  ids.push(item.id)
                }
                _this.$set('selection',ids)
              } else {
                _this.$set('selection',[])
              }
            },
            defaultSelected(){
              var _this = this
              var selectedId = []
              for (var selected of _this.data){
                selectedId.push(selected.id)
              }
              return selectedId;
            },
            filter(key,item){
              if(key.filter){
                return key.filter(item[key.field])
              }else{
                return item[key.field]
              }
            },
            search() {
                var _this = this
                var params = _this.searchParams()
                _this.selection = []
                _this.$http.get(_this.modal.resource,{params:params}).then(function(response){
                    var data = response.json()
                    _this.selectAll = false;
                    _this.$set('modal.data', data.data);
                    if( _this.modal.resource == "backstage/centers" ){
                      _this.errorMsg = '没有找到包含' + ' \"'+ params.keyword + '\" '+ '的中心'
                    }
                    if( _this.modal.resource == "backstage/products" ){
                      _this.errorMsg = '没有找到包含' + ' \"'+ params.keyword+ '\" '+ '的商品'
                    }
                },function(response){
                    alert('请求异常:' + response.statusText)
                });
            },
            searchParams(){
                var _this = this
                var params = _this.modal.params
                for(var item of _this.modal.form){
                    params[item.field] = item.value
                }
                return params
            },
            save(){
                var _this = this
                for(var item of _this.modal.data){
                    if(_this.selection.indexOf(item.id) > -1 && _this.defaultSelected().indexOf(item.id) == -1){
                       item = Object.assign({},item,{'total':'0'});
                        _this.data.push(item)
                    }
                }
            },
            flush(){
                var _this = this
                _this.modal.data = []
                _this.selectAll = 0
                _this.$set('selection',[])
            }
        }
    }
</script>
