<template>
	<div class="container">
		<div class="shopcar">
			<div class="content" @click="toggleList">
				<div class="content-left">
					<div class="logo-wrapper">
						<div class="logo" :class="{'highlight':totalCount>0}">
							<i class="iconfont" :class="{'highlight':totalCount>0}">&#xe63a;</i>
						</div>
						<div class="num" v-show="totalCount>0">{{ totalCount }}</div>
					</div>
					<div class="price" :class="{'highlight':totalPrice>0}">￥{{ totalPrice }}</div>
					<div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
				</div>
				<div class="content-right" @click.stop="pay">
					<div class="pay" :class="payClass">
						{{ payDesc }}
					</div>
				</div>
			</div>
			<div class="shopcar-list" v-show="listShow">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li class="food" v-for="food in selectFoods">
							<span class="name">{{ food.name }}</span>
							<div class="price">
								<span>￥{{ food.price * food.count }}</span>
							</div>
							<div class="carcontrol-wrapper">
								<carcontrol :food="food"></carcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="list-mask" v-show="listShow"></div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'

	import carcontrol from '../carcontrol/carcontrol'

	export default {
		data() {
			return {
				fold: true,
				carCount: 0
			}
		},
		props: {
			deliveryPrice: {
				type: Number
			},
			minPrice: {
				type: Number
			},
			selectFoods: {
				type: Array
			}
		},
		methods: {
			toggleList() {
				if(!this.totalCount) {
					return
				}
				this.fold = !this.fold
			},
			empty() {
				this.selectFoods.forEach((food) => {
					food.count = 0
				})
			},
			pay() {
				if(this.totalPrice < this.minPrice) {
					return
				}
				window.alert(`支付${this.totalPrice}元`)
			}
		},
		watch: {
			carCount(newValue, oldValue) {
				if(newValue === 0) {
					this.$emit('hideCar')
				}
			}
		},
		computed: {
			totalPrice() {
				let total = 0
				this.selectFoods.forEach((food) => {
					total += food.price * food.count
				})
				return total
			},
			totalCount() {
				let count = 0
				this.selectFoods.forEach((food) => {
					count += food.count
				})
				this.carCount = count
				return count
			},
			payDesc() {
				if(this.totalPrice === 0) {
					return `￥${this.minPrice}元起送`
				}else if(this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice
					return `还差￥${diff}元起送`
				}else{
					return '去结算'
				}
			},
			payClass() {
				if(this.totalPrice < this.minPrice) {
					return 'not-enough'
				}else{
					return 'enough'
				}
			},
			listShow() {
				if(!this.totalCount) {
					this.fold = true
					return false
				}
				let show = !this.fold
				if(show) {
					this.$nextTick(() => {
						if(!this.scroll){
							this.scroll = new BScroll(this.$refs.listContent, {
								click: true
							})
						}else{
							this.scroll.refresh()
						}
						
					})
				}
				return show
			}
		},
		components: {
			carcontrol
		}
	}
</script>

<style lang="scss" scoped>
	
	.shopcar{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 888;
		width: 100%;
		height: 48px;
		.content{
			display: flex;
			background: #141d27;
			.content-left{
				flex: 1;
				z-index: 1111;
				.logo-wrapper{
					display: inline-block;
					position: relative;
					top: -10px;
					margin: 0 12px;
					padding: 6px;
					width: 56px;
					height: 56px;
					box-sizing: border-box;
					vertical-align: top;
					border-radius: 50%;
					background: #000;
					.logo{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background: rgb(90,90,90);
						text-align: center;
						&.highlight{
							background: rgb(0,160,220);
						}
						i{
							color: #80858a;
							font-size: 24px;
							line-height: 44px;
							&.highlight{
								color: #fff;
							}
						}
					}
					.num{
						position: absolute;
						top: 0;
						right: 0;
						width: 24px;
						height: 16px;
						line-height: 16px;
						text-align: center;
						border-radius: 16px;
						font-size: 9px;
						font-weight: 700;
						color: #fff;
						background: rgb(240,20,20);
						box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
					}
				}
				.price{
					display: inline-block;
					vertical-align: top;
					line-height: 24px;
					margin-top: 12px;
					box-sizing: border-box;
					padding-right: 12px;
					border-right: 1px solid rgba(255,255,255,0.1);
					font-size: 16px;
					font-weight: 700;
					color: rgba(255,255,255,0.4);
					&.highlight{
						color: #fff;
					}
				}
				.desc{
					display: inline-block;
					vertical-align: top;
					line-height: 24px;
					margin: 12px 0 0 12px;
					color: rgba(255,255,255,0.4);
					font-size: 12px;
				}
			}
			.content-right{
				flex: 0 0 105px;
				width: 105px;
				.pay{
					height: 48px;
					line-height: 48px;
					text-align: center;
					font-size: 12px;
					color: rgba(255,255,255,0.4);
					font-weight: 700;
					background: #2b333b;
					&.not-enough{
						background: #2b333b;
					}
					&.enough{
						background: #00b43c;
						color: #fff;
					}
				}
			}
		}
		.shopcar-list{
			position: absolute;
			bottom: 48px;
			left: 0;
			z-index: 777;
			width: 100%;
			.list-header{
				height: 40px;
				line-height: 40px;
				padding: 0 18px;
				background: #f3f5f7;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				.title{
					float: left;
					font-size: 14px;
					color: rgb(7,17,27);
				}
				.empty{
					float: right;
					font-size: 12px;
					color: rgb(0,160,220);
				}
			}
			.list-content{
				padding: 0 18px;
				max-height: 217px;
				background: #fff;
				overflow: hidden;
				.food{
					position: relative;
					padding: 12px 0;
					box-sizing: border-box;
					border-bottom: 1px solid rgba(7,17,27,0.1);
					.name{
						line-height: 24px;
						font-size: 14px;
						color: rgb(7,17,27);
					}
					.price{
						position: absolute;
						right: 90px;
						bottom: 12px;
						line-height: 24px;
						font-size: 14px;
						font-weight: 700;
						color: rgb(240,20,20);
					}
					.carcontrol-wrapper{
						position: absolute;
						right: 0;
						bottom: 6px;
					}
				}
			}
		}
	}
	.list-mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 111;
		background: rgba(7,17,27,0.6);
	}
</style>
