<template>
	<div class="comment">
		<!-- <form action="/api/pinglun" method="get">
			<input type="text" name="text" placeholder="请发表您的评论" class="text">
			<input type="radio" name="comment" value="1" checked="checked" />好评
			<input type="radio" name="comment" value="2" />差评
			<button type="submit" class="comment">发表评论</button>
		</form> -->
		<!-- <mt-button type="primary" size="large" @click="aaa">发表</mt-button> -->
	</div>
</template>

<script>
	import { Button } from 'mint-ui'
	import axios from 'axios'

	export default {
		methods: {
			aaa() {
				axios({
					method: 'get',
					url: '/api/pinglun'
				})
			}
		},
	}
</script>

<style lang="scss" scoped="">
	.comment{
		width: 100%;
		.text{
			width: 100%;
			height: 40px;
			line-height: 40px;
			margin:5px 0;
			border: none;
			border: 1px solid #ccc;
			border-radius: 4px;
			font-size: 16px;
			padding-left:5px;
			box-sizing: border-box;
		}
		.comment{
			width: 100%;
			height: 40px;
			margin-bottom: 5px;
			border-radius: 5px;
			font-size: 20px;
			background-color: rgb(38,162,255);
		}
		
	}
	
</style>
