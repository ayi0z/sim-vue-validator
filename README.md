# sim-vue-validator

## 说明
    基于正则的极简表单验证

## 安装
```
npm i sim-vue-validator
```

## 使用
```
import validator from 'sim-vue-validator'
import 'sim-vue-validator/lib/sim-vue-validator.css'
Vue.use(validator)

<input v-sim-valid="/^[0-9]+$/" />
```
### 基本使用(required, maxlength, minlength)
```
<input v-sim-valid="/^[0-9]+$/" required maxlength="10" minlength="1"/>
```
### 自定义样式
```
<input v-sim-valid="validcfg" />

validcfg:{
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
```

### 自定义校验逻辑
```
<input v-sim-valid="validcfg" />

validcfg:function(el, binding, vnode)
```
### 自定义默认样式
#### 重写 .sim-valid-succ 和 .sim-valid-fail 即可
```
.sim-valid-fail{
    border:solid 1px #ff0000;
}
.sim-valid-succ{
    border:solid 1px #2e963d;
}
```



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
