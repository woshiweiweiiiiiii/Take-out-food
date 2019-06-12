<template>
	<div class="carcontrol">
		<div class="car-decrease" @click="decreaseCar" v-show="foodCount>0">
			<i class="iconfont">&#xe632;</i>
		</div>
		<div class="car-count" v-show="foodCount>0">{{ foodCount }}</div>
		<div class="car-add" @click="addCar">
			<i class="iconfont">&#xe631;</i>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		props: {
			food: {
				type: Object
			},
			msg: {
				type: Object
			}
		},
		methods: {
			addCar() {
				
				let foodinfo = {name: this.food.name, price: this.food.price, count: 1}
				this.$store.commit('addFood', foodinfo)
			},
			decreaseCar() {
				let foodinfo = {name: this.food.name, price: this.food.price, count: 1}
				this.$store.commit('decreaseFood', foodinfo)
			}
		},
		computed: {
			foodCount() {
				let count = 0
				let foodinfo = {name: this.food.name, price: this.food.price, count: 1}
				this.$store.state.shopCar.some(item => {
					if(item.name == foodinfo.name) {
						count = item.count
					}
				})
				return count
			}
		},
		created() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.carcontrol{
		.car-decrease{
			display: inline-block;
			padding: 6px;
			color: rgb(0,160,220);
			i{
				font-size: 20px;
				line-height: 20px;
			}
		}
		.car-count{
			display: inline-block;
			transform: translateY(-2px);
			color: #ff0000;
		}
		.car-add{
			display: inline-block;
			padding: 6px;
			color: rgb(0,160,220);
			i{
				font-size: 20px;
				line-height: 20px;
			}
		}
	}
</style>
