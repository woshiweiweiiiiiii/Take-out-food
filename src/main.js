// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.prototype.$axios = axios

Vue.use(VueRouter)
Vue.use(MintUI)
Vue.use(Vuex)

Vue.config.productionTip = false



let store = new Vuex.Store({
  state: {
    shopCar: localStorage.getItem('car') || []
  },
  mutations: {
    addFood(state, foodinfo) {
		let flag = false
		state.shopCar.some(item => {
			if(item.name == foodinfo.name) {
				if(item.count === 0){
					item.count = 1
				}else {
					item.count ++
				}
				flag = true
				return true
			}
		})
		if(!flag) {
			state.shopCar.push(foodinfo)
		}
		
		// state.shopCar.push(foodinfo)
	},
	decreaseFood(state, foodinfo) {
		state.shopCar.some(item => {
			if(item.name == foodinfo.name) {
				item.count --
			}
		})
	}
  }
})
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	// template: '<App/>'
	render: c => c(App),
	store
})
