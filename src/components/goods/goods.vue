<template>
	<div class="goods-container">
		<div class="goods">
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li v-for="item,index in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
						<span class="text">
							<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
							{{ item.name }}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper" ref="foodsWrapper">
				<ul>
					<li v-for="item in goods" class="foods-list foods-list-hook">
						<h1 class="title">{{ item.name}}</h1>
						<ul>
							<li v-for="food in item.foods" class="food-item">
								<div class="icon" @click="selectFood(food)">
									<img :src="food.icon" width="57" height="57">
								</div>
								<div class="content">
									<h2 class="name">{{ food.name }}</h2>
									<p class="desc">{{ food.description}}</p>
									<div class="extra">
										<span class="count">月售{{ food.sellCount }}份</span>
										<span>好评率{{ food.rating }}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{ food.price }}</span>
										<span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
									</div>
									<div class="carcontrol-wrapper">
										<carcontrol :food="food"></carcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shopcar v-show="carShow" :selectFoods="selectFoods" :deliveryPrice="store.deliveryPrice" :minPrice="store.minPrice" @hideCar="hideCar"></shopcar>
		</div>
		<transition name="food">
			<food v-show="foodShow" :food="selectedFood" @closeFood="closeFood"></food>
		</transition>
	</div>
</template>

<script>
	import axios from 'axios'
	import BScroll from 'better-scroll'
	import shopcar from '../shopcar/shopcar'
	import carcontrol from '../carcontrol/carcontrol'
	import food from '../food/food'
	
	const ERR_OK = 0
	export default {
		props: ["store"],
		data() {
			return {
				goods: [],
				classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
				listHeight: [],
				scrollY: 0,
				carShow: false,
				selectedFood: {},
				foodShow: false
			}
		},
		computed: {
			currentIndex() {
				for(let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i]
					let height2 = this.listHeight[i+1]
					if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i
					}
				}
				return 0
			},
			selectFoods() {
				let foods = []
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count) {
							foods.push(food)
							this.carShow = true//显示购物车
						}
					})
				})
				return foods
			}
		},
		methods: {
			hideCar() {
				this.carShow = false//购物车数量为0隐藏购物车
			},
			closeFood() {
				this.foodShow = false
			},
			selectFood(food) {
				this.selectedFood = food
				this.foodShow = true
			},
			selectMenu(index) {
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook')
				let el = foodList[index]
				this.foodsScroll.scrollToElement(el, 400)//滑动到指定位置
			},
			initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				})
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
					probeType: 3,
					click: true
				})
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y))
				})
			},
			calculateHeight() {
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook')
				let height = 0
				this.listHeight.push(height)
				for(let i = 0; i < foodList.length; i++) {
					let item = foodList[i]
					height += item.clientHeight
					this.listHeight.push(height)
				}
			}
			
		},
		created() {
			
			axios({
				method: 'get',
				url: '/api/goods'
			}).then(res => {
				if (res.data.errno === ERR_OK) {
					this.goods = res.data.data
					this.$nextTick( () => {//操作dom搭配使用
						this.initScroll()
						this.calculateHeight()
				})	
				}
			});
		},
		components: {
			shopcar,
			carcontrol,
			food
		}
	}
</script>

<style lang="scss" scoped>
	.food-enter,
	.food-leave-to {
	   opacity: 0;
	   transform: translateX(300px);
	}
	
	.food-enter-active,
	.food-leave-active{
	   transition: all 0.4s ease;
	}
	.goods{
		display: flex;
		position: absolute;
		width: 100%;
		top: 174px;
		bottom: 0px;
		overflow: hidden;
		.menu-wrapper{
			flex: 0 0 80px;
			width: 80px;
			background: #f3f5f7;
			.menu-item{
				padding: 0 12px;
				display: table;
				height: 54px;
				width: 56px;
				line-height: 14px;
				&.current{
					position: relative;
					z-index: 10;
					margin-top: -1px;
					background: #fff;
					font-weight: 700;
					.text{
						border: none;
					}
				}
				.icon {
					display: inline-block;
					vertical-align: top;
					width: 12px;
					height: 12px;
					margin-right: 2px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					&.decrease {
						background-image: url('./img/decrease_3@2x.png');
					}
					&.discount {
						background-image: url('./img/discount_3@2x.png');
					}
					&.guarantee {
						background-image: url('./img/guarantee_3@2x.png');
					}
					&.invoice {
						background-image: url('./img/invoice_3@2x.png');
					}
					&.special {
						background-image: url('./img/special_3@2x.png');
					}
				}
				.text{
					display: table-cell;
					font-size: 12px;
					width: 56px;
					vertical-align: middle;
					border-bottom: 1px solid rgba(7,17,27,0.1);
				}
			}
		}
		.foods-wrapper{
			flex: 1;
			z-index: 22;
			.title{
				padding-left: 14px;
				height: 26px;
				line-height: 26px;
				border-left: 2px solid #d9dde1;
				font-size: 12px;
				color: rgb(147,153,159);
				background: #f3f5f7;
			}
			.food-item{
				display: flex;
				margin: 18px;
				padding-bottom: 18px;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				&:last-child{
					border-bottom: none;
					margin-bottom: 0;
				}
				.icon{
					flex: 0 0 57px;
					margin-right: 10px;
				}
				.content{
					position: relative;
					flex: 1;
					.name{
						margin: 2px 0;
						height: 14px;
						line-height: 14px;
						font-size: 14px;
						color: rgb(7,17,27);
					}
					.desc{
						margin-bottom: 8px;
						line-height: 10px;
						font-size: 10px;
						color: rgb(147,153,159);
					}
					.extra{
						line-height: 10px;
						font-size: 10px;
						color: rgb(147,153,159);
						.count{
							margin-right: 12px;
						}
					}
					.price{
						font-weight: 700;
						line-height: 24px;
						.now{
							margin-right: 8px;
							font-size: 14px;
							color: rgb(240,20,20);
						}
						.old{
							text-decoration: line-through;
							font-size: 10px;
							color: rgb(147,153,159);
						}
					}
					.carcontrol-wrapper{
						position: absolute;
						right: 0;
						bottom: 0;
						margin-bottom: -10px;
					}
				}
			}
		}
	}
</style>
