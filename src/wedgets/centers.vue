<template><div>
    <div class="form-group">
      <label  class="col-sm-3 col-lg-2 control-label">所属中心 :</label>
      <div class="col-sm-2">
        <select class="form-control" v-model="province" @change="changeProvince(province)">
          <option :value="{name:''}" >请选择省份</option>
          <option :value="{name:item.name}"  v-for="item of options.provinces">{{item.name}}</option>
        </select>
      </div>
      <div class="col-sm-2">
        <select class="form-control" v-model="city" @change="changeCity(city)">
          <option :value="{name:''}">请选择城市</option>
          <option :value="{name:item.name}" v-for="item of options.cities" v-if="item.name != ''">{{item.name}}</option>
        </select>
      </div>
      <div class="col-sm-2">
        <select class="form-control" v-model="center" @change="changeCenter(center)">
          <option :value="{id:'0'}">请选择中心</option>
          <option :value="item"  v-for="item of centers" v-if="item.id != 0">{{item.name}}</option>
        </select>
      </div>
    </div>
</div></template>

<script>
    import Resource from '../utils/resource'

    export default{
        props:{
          center_id:{
            default:0,
            twoWay: true
          },
          center_name:{
            default:'',
            twoWay: true
          },
          center:{
            default: function(){
                return {
                    id: 0,
                    province: '',
                    city:'',
                    name:''
                }
            }
          }
        },
        created: function(){
            var _this = this
            _this.fetchProvinces()
        },
        data(){
            var _this = this
            var resource = new Resource(_this, 'backstage/centers')
            return {
                options:{
                    provinces: [],
                    cities:[],
                    centers:[]
                },
                province: {name:''},
                city:{name:''},
                resource
            }
        },
        computed: {
            centers : function(){
                var _this = this
                if(_this.options.centers.length < 1 && _this.center.id) {
                    return [_this.center];
                }
                return _this.options.centers
            }
        },
        watch:{
          center:function(val){
            var _this = this
            if(val.province){ _this.province.name = val.province}
            if(val.city && _this.options.cities.length < 1){
              _this.city.name =  val.city
              _this.options.cities = [_this.city]
            }
          }
        },
        methods: {
            fetchProvinces(){
                var _this = this
                _this.resource.$get('/provinces').then(function(response){
                    let data = response.json();
                    if(data && data.hasOwnProperty('data')){
                        _this.options.provinces = data.data
                    }
                },function(response){
                    _this.resource.infoError(response)
                });
            },
            changeProvince(province){
                var _this = this
                _this.province = province;
                _this.city     = {name:''};
                _this.center   = {id:'0'};
                _this.fetchCities()
                _this.changeCenter({id:0,name:''});
            },
            fetchCities(){
                var _this = this
                if(_this.province.name != ''){
                  _this.resource.$get('/cities',{province:_this.province.name}).then(function(response){
                      let data = response.json();
                      if(data && data.hasOwnProperty('data')){
                          _this.options.cities = data.data
                      }
                  },function(response){
                      _this.resource.infoError(response)
                  })
                }else{
                  _this.options.cities = [{name:''}]
                  _this.options.centers = [{id:'0'}]
                }
            },
            changeCity(city){
                var _this = this
                _this.city = city;
                _this.center   = {id:'0'};
                _this.fetchCenters(_this.province.name, _this.city.name);
                _this.changeCenter({id:0,name:''});
            },
            fetchCenters(province, city){
                var _this = this
                if(city != ''){
                    _this.resource.index({province:province, city:city}).then(function(response){
                        let data = response.json();
                        if(data && data.hasOwnProperty('data')){
                            _this.options.centers = data.data
                        }
                    }, function(response){
                        _this.resource.infoError(response)
                    })
                }else{
                  _this.options.centers = [{id:'0'}]
                }
            },
            changeCenter(center){
                this.$set('center_id', center.id)
                this.$set('center_name', center.name)
            }
        }
    }
</script>
