<template>
	<div id="app">
		<myheader :store="store"></myheader>
		<div class="tab">
			<router-link class="tab-item" to="/goods">商品</router-link>
			<router-link class="tab-item" to="/ratings">评论</router-link>
			<router-link class="tab-item" to="/store">商家</router-link>
		</div>
		<keep-alive>
			<router-view :store="store"></router-view>
		</keep-alive>
		
	</div>
</template>

<script>
	
import myheader from './components/header/header.vue'
import axios from 'axios'

const ERR_OK = 0;


export default {
	data() {
		return {
			store: {}
		};
	},
	
	created() {
		axios({
			method: 'get',
			url: '/api/store?id='+this.store.id
		}).then(res => {
			// console.log(res.data);
			if (res.data.errno === ERR_OK) {
				this.store = res.data.data
			}
		})
		
	},
	
	components: {
		myheader
	}
};
</script>

<style lang="scss" scoped>
.tab {
	display: flex;
	width: 100%;
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	.tab-item {
		flex: 1;
		text-align: center;
	}
}
.my-active {
	color: red;
}
</style>
