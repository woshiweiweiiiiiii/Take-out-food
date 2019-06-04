<template>
	<div class="carcontrol">
		<div class="car-decrease" @click="decreaseCar" v-show="food.count>0">
			<i class="iconfont">&#xe632;</i>
		</div>
		<div class="car-count" v-show="food.count>0">{{ food.count }}</div>
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
			}
		},
		methods: {
			
			addCar() {
				if(!this.food.count) {
					Vue.set(this.food, 'count', 1)
				}else{
					this.food.count ++
				}
			},
			decreaseCar() {
				this.food.count --
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
