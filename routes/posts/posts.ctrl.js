const Post=require('../../models/post');
const mongoose=require('mongoose');
const Joi=require('joi');

const {ObjectId}=mongoose.Types;

const checkObjectId=(ctx,next)=>{
    const {id}=ctx.params;
    if(!ObjectId.isValid(id)){
        ctx.status=400;
        return;
    }
    return next();
};

const write=async ctx=>{
    const schema=Joi.object().keys({
        title:Joi.string().required(),
        body:Joi.string().required(),
        tags:Joi.array().items(Joi.string()).required(),
    });

    const result=schema.validate(ctx.request.body);
    if(result.error){
        ctx.status=400;
        ctx.body=result.error;
        return;
    };

    const {title,body,tags}=ctx.request.body;
    const post=new Post({
        title,
        body,
        tags,
    });
    try{
        await post.save();
        ctx.body=post;
    }catch(e){
        ctx.throw(500, e);
    }
};

const list=async ctx=>{
    try{
        const posts=await Post.find().exec();
        ctx.body=posts;
    }catch(e){
        ctx.throw(500,e);
    }
};

const read=async ctx=>{
    const {id}=ctx.params;
    try{
        const post=await Post.findById(id).exec();
        if(!post){
            ctx.status=404;
            return;
        };
        ctx.body=post;
    }catch(e){
        ctx.throw(500,e);
    }
};

const remove=async ctx=>{
    const {id}=ctx.params;
    try{
        await Post.findByIdAndRemove(id).exec();
        ctx.status=204;//No Content
    }catch(e){
        ctx.throw(500,e);
    }
};

const update=async ctx=>{
    const schema=Joi.object().keys({
        title:Joi.string(),
        body:Joi.string(),
        tags:Joi.array().items(Joi.string()),
    });
    const result=schema.validate(ctx.request.body);
    if(result.error){
        ctx.status=400;
        ctx.body=result.error;
        return;
    };

    const {id}=ctx.params;
    try{
        const post=await Post.findByIdAndUpdate(id,ctx.request.body,{new:true,}).exec();
        if(!post){
            ctx.status=404;
            return;
        }
        ctx.body=post;
    }catch(e){
        ctx.throw(500,e);
    }
}

exports.checkObjectId=checkObjectId;
exports.write=write;
exports.list=list;
exports.read=read;
exports.remove=remove;
exports.update=update;