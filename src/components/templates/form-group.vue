<template><div>
    <div class="form-group" v-if="isText(form.type)">
    <!--text-->
        <label class="col-sm-3 control-label">{{ form.title }}</label>
        <div class="col-sm-9">
            <input type="text" class="form-control" v-model="form.value">
        </div>
    </div>
</div></template>

<script>
    export default{
        props: {
          form: {
            type: Object,
            required: true,
            default: {
              field:'keyword',
              type:'text',
              title:'中心名称',
              value:''
            }
          },
        },
        methods: {
            isText(type) {
                return type == "text"
            }
        }
    }
</script>
