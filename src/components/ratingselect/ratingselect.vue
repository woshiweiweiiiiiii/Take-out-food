<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span class="block positive" :class="{'active':selectType===2}" @click="select(2)">
				{{ desc.all }}
				<span class="count">{{ ratings.length }}</span>
			</span>
			<span class="block positive" :class="{'active':selectType===0}" @click="select(0)">
				{{ desc.positive }}
				<span class="count">{{ positives.length }}</span>
			</span>
			<span class="block negative" :class="{'active':selectType===1}" @click="select(1)">
				{{ desc.negative }}
				<span class="count">{{ negatives.length }}</span>
			</span>
		</div>
		<div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
			<span>
				<i class="iconfont">&#xe621;</i>
			</span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	const POSITIVE = 0
	const NEGATIVE = 1
	const ALL = 2
	export default {
		data() {
			return {
				selectType: ALL,
				onlyContent: false
			}
		},
		props: {
			ratings: {
				type: Array,
				default() {
					return []
				}
			},
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			}
		},
		computed: {
			positives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE
				})
			},
			negatives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE
				})
			}
		},
		methods: {
			select(type) {
				this.selectType = type
				this.$emit('changeSelectType', type)
			},
			toggleContent() {
				this.onlyContent = !this.onlyContent
				this.$emit('changeOnlyContent', this.onlyContent)
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.ratingselect{
		.rating-type{
			padding: 18px 0;
			margin: 0 18px;
			border-bottom: 1px solid rgba(7,17,27,0.1);
			.block{
				display: inline-block;
				padding: 8px 12px;
				margin-right: 8px;
				font-size: 16px;
				border-radius: 4px;
				line-height: 16px;
				color: rgb(77,85,93);
				&.active{
					color: #fff;
				}
				&.positive{
					background: rgba(0,160,220,0.2);
					&.active{
						background: rgb(0,160,220);
					}
				}
				&.negative{
					background: rgba(77,85,93,0.2);
					&.active{
						background: rgb(77,85,93);
					}
				}
				.count{
					margin-left: 2px;
					font-size: 12px;
				}
			}
		}
		.switch{
			padding: 12px 18px;
			line-height: 24px;
			border-bottom: 1px solid rgba(7,17,27,0.1);
			color: rgb(147,153,159);
			&.on{
				i{
					color: #00c850;
				}
			}
			i{
				display: inline-block;
				vertical-align: top;
				font-size: 24px;
				margin-right: 4px;
			}
			.text{
				font-size: 16px;
			}
		}
	}
</style>
