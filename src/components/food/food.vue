<template>
	<div class="food" ref="food">
		<div class="food-content">
			<div class="img-header">
				<img :src="food.image">
				<div class="food-close" @click="close">
					<i class="iconfont">&#xe62f;</i>
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{ food.name }}</h1>
				<div class="detail">
					<span class="sell-count">月售{{ food.sellCount}}份</span>
					<span class="rating">好评率{{ food.rating }}%</span>
				</div>
				<div class="price">
					<span class="now">￥{{ food.price }}</span>
					<span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
				</div>
				<div class="carcontrol-wrapper">
					<carcontrol :food="food"></carcontrol>
				</div>
				<!-- <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst">加入购物车</div> -->
				<!-- <div class="buy" v-show="false" @click="addFirst">加入购物车</div> -->
			</div>
			<split v-show="food.info"></split>
			<div class="info" v-show="food.info">
				<h1 class="title">商品信息</h1>
				<p class="text">{{ food.info }}</p>
			</div>
			<split></split>
			<div class="rating">
				<h1 class="title">商品评价</h1>
				<ratingselect :desc="desc" :ratings="food.ratings" @changeOnlyContent="changeOnlyContent" @changeSelectType="changeSelectType"></ratingselect>
				<div class="rating-wrapper">
					<ul v-show="food.ratings && food.ratings.length">
						<li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item">
							<div class="time">{{ rating.rateTime | formatDate }}</div>
							<div class="user">
								<span class="name">{{ rating.username }}</span>
								<img class="avatar" :src="rating.avatar" width="12" height="12">
							</div>
							<p class="text">
								<span>
									<i class="iconfont good" v-if="rating.rateType===0">&#xe64f;</i>
									<i class="iconfont bad" v-else="rating.rateType===1">&#xe64c;</i>
								</span>
								<span class="content">{{ rating.text }}</span>
							</p>
						</li>
					</ul>
					<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'Vue'
	import BScroll from 'better-scroll'
	import carcontrol from '../carcontrol/carcontrol'
	import split from '../split/split'
	import ratingselect from '../ratingselect/ratingselect'

	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	
	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				selectType: ALL,
				onlyContent: false,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		filters: {
			formatDate(time) {
				let date =new Date(time)
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
				let hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
				let min = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
				let se = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`
				return `${year}-${month}-${day}  ${hour}:${min}:${se}`
			}
		},
		methods: {
			changeSelectType(type) {
				this.selectType = type
			},
			changeOnlyContent(flag) {
				this.onlyContent = flag
			},
			close() {
				this.$emit('closeFood')
			},
			addFirst() {
				Vue.set(this.food, 'count', 1)
			},
			needShow(type, text) {
				if(this.onlyContent && !text) {
					return false
				}
				if(this.selectType === ALL) {
					return true
				}else{
					return type === this.selectType
				}
			}
		},
		created() {
			this.$nextTick(() => {
				if(!this.foodScroll) {
					this.foodScroll = new BScroll(this.$refs.food, {
						click: true
					})
				}else{
					this.foodScroll.refresh()
				}
			})
		},
		components: {
			carcontrol,
			split,
			ratingselect
		}
	}
</script>

<style lang="scss" scoped>
	.food{
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		height: 100%;
		z-index: 33;
		width: 100%;
		// overflow: auto;
		background: #fff;
		.food-content{
			position: relative;
			top: 0;
			.img-header{
				position: relative;
				width: 100%;
				height: 0;
				padding-top: 100%;//黑科技，让图片宽高和屏幕一致
				img{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
				.food-close{
					position: absolute;
					top: 10px;
					left: 0;
					z-index: 999;
					i{
						padding: 10px;
						font-size: 40px;
						color: #fff;
					}
				}
			}
			.content{
				padding: 18px;
				position: relative;
				.title{
					color: rgb(7,17,27);
					line-height: 14px;
					margin-bottom: 8px;
					font-size: 14px;
					font-weight: 700;
				}
				.detail{
					margin-bottom: 18px;
					outline-width: 10px;
					height: 10px;
					.sell-count,.rating{
						font-size: 10px;
						color: rgb(147,153,159);
					}
					.sell-count{
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
					right: 12px;
					bottom: 12px;
				}
				.buy{
					position: absolute;
					right: 18px;
					bottom: 18px;
					z-index: 10;
					height: 24px;
					line-height: 24px;
					padding: 0 12px;
					box-sizing: border-box;
					font-size: 10px;
					border-radius: 12px;
					color: #fff;
					background: rgb(0,160,220);
				}
			}
			.info{
				padding: 18px;
				.title{
					line-height: 14px;
					margin-bottom: 6px;
					font-size: 14px;
					color: rgb(7,17,27);
				}
				.text{
					font-size: 12px;
					line-height: 24px;
					padding: 0 8px;
					color: rgb(77,85,93);
				}
			}
			.rating{
				padding-top: 18px;
				.title{
					line-height: 14px;
					margin-left: 18px;
					font-size: 14px;
					color: rgb(7,17,27);
				}
				.rating-wrapper{
					padding: 0 18px;
					.rating-item{
						position: relative;
						padding: 16px 0;
						border-bottom: 1px solid rgba(7,17,27,0.1);
						.user{
							position: absolute;
							right: 0;
							top: 16px;
							line-height: 12px;
							.name{
								display: inline-block;
								margin-right: 6px;
								vertical-align: top;
								font-size: 10px;
								color: rgb(147,153,159);
							}
							.avatar{
								border-radius: 50%;
							}
						}
						.time{
							margin-bottom: 6px;
							line-height: 12px;
							font-size: 10px;
							color: rgb(147,153,159);
						}
						.text{
							line-height: 16px;
							font-size: 16px;
							color: rgb(7,17,27);
							i{
								line-height: 16px;
								margin-right: -10px;
								font-size: 16px;
								&.good{
									color: rgb(0,160,220);
								}
								&.bad{
									color: rgb(147,153,159);
								}
							}
						}
					}
					.no-rating{
						padding: 16px 0;
						font-size: 16px;
						color: rgb(147,153,159);
					}
				}
			}
		}
	}
</style>
