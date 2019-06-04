<template>
	<div class="store" ref="store">
		<div class="store-content">
			<div class="overview">
				<h1 class="title">{{ store.name }}</h1>
				<div class="desc">
					<star :size="36" :score="store.score" class="star"></star>
					<span class="text">({{ store.ratingCount }})</span>
					<span class="text">月售{{ store.sellCount }}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{ store.minPrice }}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{ store.deliveryPrice }}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{ store.deliveryTime }}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<i class="iconfont" :class="{'active': favorite}">&#xe687;</i>
					<div class="text">{{ favoriteText }}</div>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">{{ store.bulletin }}</p>
					<ul v-if="store.supports" class="supports">
						<li v-for="item in store.supports" class="support-item">
							<span class="icon" :class="classMap[item.type]"></span>
							<span class="text">{{item.description}}</span>
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in store.infos">{{ info }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import star from '../star/star'
	import split from '../split/split'
	export default{
		props: {
			store: {
				type: Object
			},
		},
		data() {
			return {
				classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
				favorite: false
			}
		},
		methods: {
			toggleFavorite() {
				this.favorite = !this.favorite
			}
		},
		computed: {
			favoriteText() {
				return this.favorite ? '以收藏' : '未收藏'
			}
		},
		mounted() {
			this.scroll = new BScroll(this.$refs.store, {
				click: true
			})
		},
		components: {
			star,
			split
		}
	}
</script>

<style lang="scss" scoped>
	.store{
		position: absolute;
		top: 178px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		.overview{
			position: relative;
			padding: 18px;
			.title{
				margin-bottom: 8px;
				line-height: 14px;
				color: rgb(7,17,27);
				font-size: 14px;
			}
			.desc{
				padding-bottom: 18px;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				.star{
					display: inline-block;
					vertical-align: top;
					margin-right: 8px;
				}
				.text{
					display: inline-block;
					line-height: 18px;
					vertical-align: top;
					margin-right: 12px;
					font-size: 10px;
					color: rgb(77,85,93);
					
				}
			}
			.remark{
				display: flex;
				padding: 18px 0;
				.block{
					flex: 1;
					text-align: center;
					border-right: 1px solid rgba(7,17,27,0.1);
					&:last-child{
						border-right: none;
					}
					h2{
						margin-bottom: 4px;
						line-height: 10px;
						font-size: 10px;
						color: rgb(147,153,159);
					}
					.content{
						line-height: 24px;
						font-size: 10px;
						color: rgb(7,17,27);
						.stress{
							font-size: 24px;
						}
					}
				}
			}
			.favorite{
				position: absolute;
				top: 18px;
				right: 18px;
				text-align: center;
				i{
					display: block;
					margin-bottom: 4px;
					line-height: 24px;
					font-size: 24px;
					color: #d4d6d9;
					&.active{
						color: rgb(240,20,20);
					}
				}
				.text{
					line-height: 10px;
					font-size: 10px;
					color: rgb(7,17,27);
				}
			}
		}
		.bulletin{
			padding: 18px 18px 0 18px;
			.title{
				margin-bottom: 8px;
				line-height: 14px;
				color: rgb(7,17,27);
				font-size: 14px;
			}
			.content-wrapper{
				padding: 0 12px 16px 12px;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				.content{
					line-height: 24px;
					font-size: 12px;
					color: rgb(240,20,20);
				}
			}
			.supports{
				.support-item{
					padding: 16px 12px;
					border-bottom: 1px solid rgba(7,17,27,0.1);
					.icon{
						display: inline-block;
						vertical-align: top;
						width: 16px;
						height: 16px;
						margin-right: 6px;
						background-size: 16px 16px;
						background-repeat: no-repeat;
						&.decrease{
							background-image: url('./img/decrease_4@2x.png');
						}
						&.discount{
							background-image: url('./img/discount_4@2x.png');
						}
						&.guarantee{
							background-image: url('./img/guarantee_4@2x.png');
						}
						&.invoice{
							background-image: url('./img/invoice_4@2x.png');
						}
						&.special{
							background-image: url('./img/special_4@2x.png');
						}
					}
					.text{
						line-height: 16px;
						font-size: 12px;
						color: rgb(7,17,27);
					}
				}
			}
		}
		.info{
			padding: 18px 18px 0 18px;
			.title{
				padding-bottom: 8px;
				line-height: 14px;
				color: rgb(7,17,27);
				font-size: 14px;
				border-bottom: 1px solid rgba(7,17,27,0.1);
			}
			.info-item{
				padding: 16px 12px;
				line-height: 16px;
				font-size: 12px;
				color: rgb(7,17,27);
				border-bottom: 1px solid rgba(7,17,27,0.1);
				&:last-child{
					border-bottom: none;
				}
			}
		}
	}
</style>
