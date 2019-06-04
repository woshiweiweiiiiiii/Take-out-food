<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar"><img width="64px" height="64px" :src="store.avatar" /></div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{ store.name }}</span>
				</div>
				<div class="description">{{ store.description }}/{{ store.deliveryTime }}分钟送达</div>
				<div v-if="store.supports" class="support">
					<span class="icon" :class="classMap[store.supports[0].type]"></span>
					<span class="text">{{ store.supports[0].description }}</span>
				</div>
			</div>
			<div v-if="store.supports" class="support-count" @click="showDetail">
				<span class="count">{{ store.supports.length }}个</span>
				<i class="iconfont">&#xe602;</i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{ store.bulletin }}</span>
			<i class="iconfont">&#xe602;</i>
		</div>
		<div class="background">
			<img :src="store.avatar" width="100%">
		</div>
		<transition name="detail">
			<div v-show="detailShow" class="detail">
				<div class="detail-wrapper">
					<div class="detail-main">
						<h1 class="name">{{ store.name }}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="store.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="store.supports" class="supports">
							<li v-for="item in store.supports" class="support-item">
								<span class="icon" :class="classMap[item.type]"></span>
								<span class="text">{{item.description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{store.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="hideDetail">
					<i class="iconfont">&#xe641;</i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import star from '../star/star'
export default {
	
	data() {
		return {
			detailShow: false,
			classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
		}
	},
	methods: {
		showDetail() {
			this.detailShow = true
		},
		hideDetail() {
			this.detailShow = false
		}
	},
	props: ['store'],
	created() {
		
	},
	components: {
		star
	}
};
</script>

<style lang="scss" scoped>
.detail-enter,
.detail-leave-to {
   opacity: 0;
   transform: translateY(300px);
}

.detail-enter-active,
.detail-leave-active{
   transition: all 0.8s ease;
}
.header {
	position: relative;
	overflow: hidden;
	color: #fff;
	background: rgba(7,17,27,0.5);
	.content-wrapper {
		position: relative;
		padding: 24px 12px 18px 24px;
		.avatar {
			display: inline-block;
			vertical-align: top;
			img {
				border-radius: 2px;
			}
		}
		.content {
			display: inline-block;
			margin-left: 16px;
			.title {
				margin: 2px 0 8px 0;
				.brand {
					width: 30px;
					height: 18px;
					display: inline-block;
					background-image: url('./img/brand@2x.png');
					background-size: 30px 18px;
					background-repeat: no-repeat;
					vertical-align: top;
				}
				.name {
					margin-left: 6px;
					font-size: 16px;
					line-height: 18px;
					font-weight: bold;
				}
			}
			.description {
				margin-bottom: 10px;
				line-height: 12px;
				font-size: 12px;
			}
			.support {
				.icon {
					display: inline-block;
					vertical-align: top;
					width: 12px;
					height: 12px;
					margin-right: 4px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					&.decrease {
						background-image: url('./img/decrease_1@2x.png');
					}
					&.discount {
						background-image: url('./img/discount_1@2x.png');
					}
					&.guarantee {
						background-image: url('./img/guarantee_1@2x.png');
					}
					&.invoice {
						background-image: url('./img/invoice_1@2x.png');
					}
					&.special {
						background-image: url('./img/special_1@2x.png');
					}
				}
				.text {
					vertical-align: top;
					line-height: 12px;
					font-size: 12px;
				}
			}
		}
		.support-count {
			position: absolute;
			right: 12px;
			bottom: 18px;
			padding: 0 8px;
			height: 24px;
			line-height: 24px;
			border-radius: 14px;
			background-color: rgba(0, 0, 0, 0.2);
			text-align: center;
			.count {
				vertical-align: top;
				font-size: 16px;
			}
			i {
				font-size: 20px;
			}
		}
	}
	.bulletin-wrapper{
		position: relative;
		height: 28px;
		line-height: 28px;
		padding: 0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		background-color: rgba(7,17,27,0.2);
		.bulletin-title{
			display: inline-block;
			vertical-align: top;
			margin-top: 8px;
			width: 22px;
			height: 12px;
			background-image: url('./img/bulletin@2x.png');
			background-size: 22px 12px;
			background-repeat: no-repeat;
		}
		.bulletin-text{
			vertical-align: top;
			font-size: 12px;
			margin: 0 4px;
		}
		i{
			position: absolute;
			font-size: 20px;
			right: 6px;
			top: 1px;
		}
	}
	.background{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: blur(10px);
	}
	.detail{
		position: fixed;
		z-index: 1000;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background: rgba(7,17,27,0.8);
		.detail-wrapper{
			min-height: 100%;
			width: 100%;
			.detail-main{
				padding-top: 64px;
				padding-bottom: 64px;
				.name{
					line-height: 16px;
					text-align: center;
					font-size: 16px;
					font-weight: 700;
				}
				.star-wrapper{
					margin-top: 18px;
					padding: 2px 0;
					text-align: center;
				}
				.title{
					display: flex;
					width: 80%;
					margin: 28px auto 24px auto;
					.line{
						flex: 1;
						position: relative;
						top: -6px;
						border-bottom: 1px solid rgba(255,255,255,0.2);
					}
					.text{
						padding: 0 12px;
						font-weight: 500;
						font-size: 14px;
					}
				}
				.bulletin{
					width: 80%;
					margin: 0 auto;
					.content{
						padding: 0 12px;
						line-height: 24px;
						font-size: 14px;
					}
				}
				.supports{
					width: 80%;
					margin: 0 auto;
					.support-item{
						padding: 0 12px;
						margin-bottom: 12px;
						&:last-child{
							margin-bottom: 0;
						}
						.icon{
							display: inline-block;
							width: 16px;
							height: 16px;
							vertical-align: top;
							margin-right: 6px;
							background-size: 16px 16px;
							background-repeat: no-repeat;
							&.decrease {
								background-image: url('./img/decrease_2@2x.png');
							}
							&.discount {
								background-image: url('./img/discount_2@2x.png');
							}
							&.guarantee {
								background-image: url('./img/guarantee_2@2x.png');
							}
							&.invoice {
								background-image: url('./img/invoice_2@2x.png');
							}
							&.special {
								background-image: url('./img/special_2@2x.png');
							}
						}
						.text{
							line-height: 16px;
							font-size: 12px;
						}
					}
				}
			}
		}
		.detail-close{
			position: relative;
			width: 32px;
			height: 32px;
			margin: -64px auto 0 auto;
			clear: both;
			font-size: 32px;
			i{
				font-size: 32px;
			}
		}
	}
}
</style>
