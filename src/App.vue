<template>
  <div id="app">
    <input type="text" v-sim-valid="valid" required v-model="input" maxlength="10" :minlength="minlen">
    <button @click="doChange">sub</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      input:'test',
      minlen:2,
      valid:{
        // 正则
        regexp:/^[0-9]+$/,
        // 自定义classname
        succcss:'succ-classname',
        // 自定义classname
        failcss:'fail-classname',
        // 校验通过回调
        succ:function(el, value){ console.log("succ ",el, value) },
        // 校验失败回调
        fail:function(el, value){ console.log("fail ",el, value)}
      }
    }
  },
  props:['a_prop'],
  computed:{
    a_cpu(){
      return 'i am cpu'
    }
  },
  watch:{
    input(){
      return 'i am a watch'
    }
  },
  methods:{
    doChange(){
      this.input += '_1'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
