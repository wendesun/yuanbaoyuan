<template><div>
  <div id="app">
    <validator name="validation">
      <form novalidate>
        <h1>user registration</h1>
        <div class="username">
          <label for="username">username:</label>
          <input id="username" type="text"
                 detect-change="off" detect-blur="off" v-validate:username="{
          required: { rule: true, message: 'required you name !!' }
        }" />
        </div>
        <div class="password">
          <label for="password">password:</label>
          <input id="password" type="password" v-model="password"
                 detect-change="off" detect-blur="off" v-validate:password="{
          required: { rule: true, message: 'required you new password !!' },
          minlength: { rule: 8, message: 'your new password short too !!' }
        }" />
        </div>
        <div class="confirm">
          <label for="confirm">confirm password:</label>
          <input id="confirm" type="password"
                 detect-change="off" detect-blur="off" v-validate:confirm="{
          required: { rule: true, message: 'required you confirm password !!' },
          confirm: { rule: password, message: 'your confirm password incorrect !!' }
        }" />
        </div>
        <div class="errors" v-if="$validation.touched">
          <validator-errors :validation="$validation"></validator-errors>
        </div>
        <input type="button" value="register" @click="onSubmit"/>
      </form>
    </validator>
  </div>
</div></template>
<script>
  export default {
    el: '#app',
    data: {
      password: ''
    },
    validators: {
      confirm: function (val, target) {
        return val === target
      }
    },
    methods: {
      onSubmit: function (e) {
        // validate manually
        var self = this
        self.$validate(true, function () {
          if (self.$validation.invalid) {
            e.preventDefault()
          }
        })
      }
    }
  }
</script>

