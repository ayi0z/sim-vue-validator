/* eslint-disable no-control-regex */
import './sim-vue-validator.css'
const install = function(Vue){
    if (install.installed) return
    install.installed = true


    Vue.directive('sim-valid', {
        inserted:function (el, binding, vnode) {
            if (!vnode.context['isSimValidPassed']) {
                vnode.context['isSimValidPassed'] = function () {
                    for (let a = 0, els = document.querySelectorAll("*[data-re-valid]"); a < els.length; a++) {
                        if(els[a].offsetParent != null){
                            if (els[a].getAttribute("data-re-valid") == 'false') {
                                return false
                            }
                        }
                    }
                    return true
                }
            }

            el.addEventListener("change", function () { binding.def.componentUpdated(el, binding, vnode) });

            binding.def.componentUpdated(el, binding, vnode)
        },
        componentUpdated: function (el, binding, vnode) {
            function seeVal(obj, key){
                try {
                    return new Function('da', 'return da.'+key)(obj)
                } catch (error) {
                    return undefined
                }
            }

            //binding.value 可能是 function, {}, 或正则字面量表达式
            if (typeof (binding.value) == 'function') {
                binding.value(el, binding, vnode)
            } else {
                // regexp 正则， h 回调函数
                let regexp = undefined, 
                    succ = undefined, 
                    fail = undefined,
                    succcss = undefined, 
                    failcss = undefined

                const type = Object.prototype.toString.call(binding.value);
                if(type== '[object RegExp]') {
                    regexp = binding.value
                } else if(type== '[object Object]'){
                    regexp = binding.value.regexp
                    succ = binding.value.succ
                    fail = binding.value.fail
                    succcss = binding.value.succcss
                    failcss = binding.value.failcss
                }

                let elValue = el.value
                let vmo = vnode.data.directives.find(d=>d.rawName == 'v-model');
                if(vmo){
                    let vmoExp = vmo.expression
                    if(vmoExp){
                        elValue = seeVal(vnode.context, vmoExp)
                    }
                }
                
                
                let passed = !regexp || regexp.test(elValue);

                const isrequired = passed && el.getAttribute('required')
                passed = isrequired ? (elValue && elValue.toString().trim()) : passed

                const minlen = passed && el.getAttribute('minlength')
                passed = minlen ? elValue.replace(/[^\x00-\xff]/g, 'aa').length >= minlen : passed

                const maxlen = passed && el.getAttribute('maxlength')
                passed = maxlen ? elValue.replace(/[^\x00-\xff]/g, 'aa').length <= maxlen : passed

                // 校验结果写入 el 的data属性
                el.setAttribute('data-re-valid', passed || false)

                // 指令参数指定了校验不通过时的classname，如果指令参数没有设置，则添加默认classname
                if (passed) {
                    el.classList.remove('sim-valid-fail')
                    failcss ? el.classList.remove(failcss) : '';
                    el.classList.add('sim-valid-succ')
                    succcss ? el.classList.add(succcss) : '';
                } else {
                    el.classList.remove('sim-valid-succ')
                    succcss ? el.classList.remove(succcss) : '';
                    el.classList.add('sim-valid-fail')
                    failcss ? el.classList.add(failcss) : '';
                }

                // ：回调函数
                if (succ && passed) {
                    if (typeof (succ) == 'function') {
                        succ(el, elValue)
                    }
                }else if (fail && !passed) {
                    if (typeof (fail) == 'function') {
                        fail(el, elValue)
                    }
                }
            }
        }
    })
}
  
if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue)
}

export default {
    install
}