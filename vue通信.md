##vuejs中的通信
###**父子组件**
####1、父组件向子组件传递数据(props)
```
//一般只传一次数据，场景：登录后向子组件传递用户信息
// 父 v-bind/ :

//父
<v-header :user="user"></v-header>

export default {
  data() {
    return {
      user: {
        name:
          get("userName"),
        roleId:
          get("roleId")
      }
	}
  }
}

//header.vue 子
<span class="el-dropdown-link">
  {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
</span>

export default {
  props: {
    user: {
      name: "",
      roleId: ""
    }
  }
}



```
####2、子组件向父组件传递数据（v-on:eventName/@eventName)
```
// 父组件
<template>
    <div>
        <child :img-width="344" :img-height="imgHeight" title="静态文字" @before-close="closeFuction"></child>
    </div>
</template>

methods: {
  closeFuction(val) {
	console.log(val);
	// todo
  }
}

//子组件
methods: {
    doSomething() {
        // todo
        const val = '需要传给父组件的参数';
        this.$emit('before-close', val);
        console.log('在需要调用的地方 用this.$emit触发');
    }
}

```

####3、父组件向子组件取数据（$ref）
// $ref用来引用dom或者组件（当然包含子组件）
//dash.vue
<chart-top5str ref="top5str" :chart-title="chartTitle"></chart-top5str>
data: {
  return {
	chartTitle:''
  }
}
methods: {
  reloadTop5() {
	this.$refs.top5str.getTop5Str();
	this.chartTitle = this.$refs.top5str.title;
  }
}

//top5str.vue
data: {
  return {
	title:'Top5决策'
  }
}
methods: {
  getTop5Str() {
	//do something
  }
}


###**兄弟组件**(vuex，eventBus)
```
//store.js
const store = new Vuex.Store({
    state: {
        stateName: 'xxxx'
    },
    mutations: {
       mutationsName(state, {params}) {
           state.stateName = params;
           console.log("只有在mutations中才能直接改变state中的值")
       } 
    },
    actions: {
        actionName({ state,commit}, {params}) {
        let actionParam = 'mmm';
            commit('mutationsName', actionParam );
            console.log(" 触发mutation 方法要用commit分发，以此改变state");
        }
    }
       
});
export default store;

//main.js
console.log("store为实例化生成的");
import store from './store/index.js';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//child.vue js部分
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
    computed: {
        ...mapState({ stateName })
    },
    methods: {
        ...mapActions(['actionName']),
        ...mapMutations(['mutationName'])
        console.log("使用辅助函数mapMutations直接将触发函数映射到methods上")
    }
    
    // 接下来在实例中就可以用this.stateName,this.actionName来调用

}
```
###**模块之间通信**(eventBus)
```
//新建vue实例，模块1监听事件，模块2触发事件
//eventBus.js
import Vue from 'vue';
export default new Vue();

//module1.vue
import eventBus from 'eventBus.js'; 
// 我们在create钩子中监听方法
create(){
    console.log("this.getTarget是一个带参数的方法，但是这边只要将两者关联起来");
    eventBus .$on('getTarget', this.getTarget); 
},
beforeDestroy() {
    console.log("组件销毁前需要解绑事件。否则会出现重复触发事件的问题");
    bus.$off('getTarget', this.getTarget);
},
methods: {
    getTarget(param) {
        // todo
    }
}

//module2.vue
import eventBus from 'eventBus.js'; 
// 必须引入同一个实例

methods： {
    doSomething() {
        eventBus.$emit("getTarget", 22);
        console.log("向getTarget方法传参22");
    }
}

```

部分代码引用自https://segmentfault.com/a/1190000015040856#articleHeader3