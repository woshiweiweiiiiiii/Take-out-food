<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{ store.score }}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{ store.rankRate }}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="store.serviceScore" class="star"></star>
						<span class="score">{{ store.serviceScore }}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="store.foodScore"></star>
						<span class="score">{{ store.foodScore }}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery-time">{{ store.deliveryTime }}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :ratings="ratings" @changeOnlyContent="changeOnlyContent" @changeSelectType="changeSelectType"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
						<div class="avatar">
							<img :src="rating.avatar" width="28" height="28">
						</div>
						<div class="content">
							<h1 class="name">{{ rating.username }}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score" class="star"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
							</div>
							<p class="text">{{ rating.text }}</p>
							<div class="time">{{ rating.rateTime | formatDate }}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import star from '../star/star'
	import split from '../split/split'
	import ratingselect from '../ratingselect/ratingselect'
	import BScroll from 'better-scroll'
	
	const ALL = 2
	const ERR_OK = 0
	
	export default {
		props: {
			store: {
				type: Object
			},
		},
		data() {
			return {
				selectType: ALL,
				onlyContent: false,
				ratings: []
			}
		},
		methods: {
			changeSelectType(type) {
				this.selectType = type
			},
			changeOnlyContent(flag) {
				this.onlyContent = flag
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
		created() {
			axios({
				method: 'get',
				url: '/api/ratings'
			}).then(res => {
				if (res.data.errno === ERR_OK) {
					this.ratings = res.data.data
					this.$nextTick( () => {
						this.scroll = new BScroll(this.$refs.ratings, {
							click: true
						})
					})	
					
				}
			});
		},
		components: {
			star,
			split,
			ratingselect
		}
	}
</script>

<style lang="scss" scoped>
	.ratings{
		position: absolute;
		top: 178px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		.overview{
			display: flex;
			padding: 18px 0;
			.overview-left{
				flex: 0 0 137px;
				padding: 6px 0;
				border-right: 1px solid rgba(7,17,27,0.1);
				text-align: center;
				.score{
					margin-bottom: 6px;
					line-height: 28px;
					font-size: 24px;
					color: rgb(255,153,0);
				}
				.title{
					margin-bottom: 8px;
					line-height: 12px;
					font-size: 12px;
					color: rgb(7,17,27);
				}
				.rank{
					line-height: 12px;
					font-size: 12px;
					color: rgb(147,153,159);
				}
			}
			.overview-right{
				flex: 1;
				padding: 6px 0 6px 24px;
				.score-wrapper{
					margin-bottom: 8px;
					.title{
						display: inline-block;
						line-height: 18px;
						vertical-align: top;
						font-size: 12px;
						color: rgb(7,17,27);
					}
					.star{
						display: inline-block;
						vertical-align: top;
						margin: 0 6px;
					}
					.score{
						display: inline-block;
						line-height: 18px;
						vertical-align: top;
						font-size: 12px;
						color: rgb(255,153,0);
					}
				}
				.delivery-wrapper{
					.title{
						display: inline-block;
						line-height: 18px;
						font-size: 12px;
						color: rgb(7,17,27);
					}
					.delivery-time{
						margin-left: 12px;
						font-size: 12px;
						color: rgb(147,153,159);
					}
				}
			}
		}
		.rating-wrapper{
			padding: 0 18px;
			.rating-item{
				display: flex;
				padding: 18px 0;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				.avatar{
					flex: 0 0 28px;
					width: 28px;
					margin-right: 6px;
					img{
						border-radius: 50%;
					}
				}
				.content{
					flex: 1;
					position: relative;
					.name{
						margin-bottom: 4px;
						line-height: 12px;
						font-size: 12px;
						color: rgb(7,17,27);
					}
					.star-wrapper{
						margin-bottom: 6px;
						.star{
							display: inline-block;
							vertical-align: top;
							font-size: 10px;
							margin-right: 6px;
						}
						.delivery{
							display: inline-block;
							vertical-align: top;
							font-size: 10px;
							color: rgb(147,153,159);
						}
					}
					.text{
						line-height: 18px;
						color: rgb(7,17,27);
						font-size: 14px;
					}
					.time{
						position: absolute;
						top: 0;
						right: 0;
						line-height: 12px;
						font-size: 10px;
						color: rgb(147,153,159);
					}
				}
			}
		}
	}
</style>
