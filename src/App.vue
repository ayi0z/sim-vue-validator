<template>
  <div id="app">
    <p>input</p>
    <input type="text" v-sim-valid="valid" required v-model="input" maxlength="10" :minlength="minlen">
    <button @click="doChange">clear</button>
    <p>
      select
    </p>
    <select v-sim-valid required>
        <option value=""></option>
        <option v-for="op in ops" :key="op" :value="op">{{`option ${op}`}}</option>
    </select>

    <p>
      <button @click="doSubmit">校验全部通过</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      input:'',
      minlen:2,
      ops: [0, 1, 2, 3, 4, 5, 6, 7, 8],
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
  methods:{
    doChange(){
      this.input = ''
    },
    doSubmit(){
      if(this.isSimValidPassed()){
        alert('校验全部通过')
      }else{
        alert('校验不通过')
      }
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
