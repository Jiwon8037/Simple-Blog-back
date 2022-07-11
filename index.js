require('dotenv').config();
const Koa=require('koa');
const Router=require('koa-router');
const bodyparser=require('koa-bodyparser');
const mongoose=require('mongoose');

const app=new Koa();
const router=new Router();
const {port,MONGO_URI}=process.env;
const api=require('./routes');

mongoose.connect(MONGO_URI)
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch(e=>{
        console.error(e);
    });

app.use(bodyparser());

router.use('/api',api.routes());

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(port,()=>{
    console.log('%d server run!',port)
});