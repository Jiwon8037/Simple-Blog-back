const Router=require('koa-router');
const postsCtrl=require('./posts.ctrl');
const checkLoggedIn=require('../../lib/checkLoggedIn');

const {list,write,read,remove,update,checkOwnPost,getPostById}=postsCtrl;
const posts=new Router();

posts.get('/',list);
posts.post('/',checkLoggedIn,write);

posts.get('/:id',checkOwnPost,getPostById,read);
posts.delete('/:id',checkLoggedIn,checkOwnPost,getPostById,remove);
posts.patch('/:id',checkLoggedIn,checkOwnPost,getPostById,update);

module.exports = posts;