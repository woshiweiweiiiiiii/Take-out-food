const koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')

const app = new koa()
const router = new Router()

var store
var goods
var ratings

// const appData = require('./data.json')

var p = new Promise((resolve, reject) => {
		fs.readFile('./data.json','utf-8', (err, data) => {
			resolve(data)
		})
	})


p.then((data) => {
	var appData = JSON.parse(data)
	store = appData.store;
	goods = appData.goods;
	ratings = appData.ratings;
})
// 
// const store = appData.store;
// const goods = appData.goods;
// const ratings = appData.ratings;

router.get('/api/store', async ctx => {
	ctx.body = {
		errno: 0,
		data: store
	}
})
router.get('/api/goods', async ctx => {
	ctx.body = {
		errno: 0,
		data: goods
	}
})
router.get('/api/ratings', async ctx => {
	ctx.body = {
		errno: 0,
		data: ratings
	}
})

app.use(router.routes())
app.use(router.allowedMethods())


const port = 8081

app.listen(port, ()=>{
	console.log(`server is running ${port} ...`);
})