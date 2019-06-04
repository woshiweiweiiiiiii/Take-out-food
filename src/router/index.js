import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods/goods.vue'
import ratings from '../components/ratings/ratings.vue'
import store from '../components/store/store.vue'


Vue.use(Router)

export default new Router({
  routes: [
		{ path: '/',redirect: '/goods'},
		{ path: '/goods',component: goods},
		{ path: '/ratings',component: ratings},
		{ path: '/store',component: store}
  ],
	linkActiveClass: 'my-active'
})

