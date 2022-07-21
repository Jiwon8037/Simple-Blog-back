const Router=require('koa-router');
const postsCtrl=require('./posts.ctrl');
const checkLoggedIn=require('../../lib/checkLoggedIn');

const {list,write,read,remove,update,checkOwnPost,getPostById}=postsCtrl;
const posts=new Router();

posts.get('/',list);
posts.post('/',checkLoggedIn,write);

posts.get('/:id',getPostById,read);
posts.delete('/:id',getPostById,checkLoggedIn,checkOwnPost,remove);
posts.patch('/:id',getPostById,checkLoggedIn,checkOwnPost,update);

// const post=new Router();
// post.get('/',read);
// post.delete('/',checkLoggedIn,checkOwnPost,remove);
// post.patch('/',checkLoggedIn,checkOwnPost,update);

// posts.use('/:id',getPostById,post.routes());

module.exports = posts;