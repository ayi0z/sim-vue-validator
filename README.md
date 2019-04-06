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
Vue.use(validator)

<input v-sim-valid:classname="/^[0-9]+$/" />
<style>
    .classname {
        color:#ff0000
    }
</style>
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
