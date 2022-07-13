const mongoose=require('mongoose');

const PostSchema=new mongoose.Schema({
    title:String,
    body:String,
    tags:[String],
    publishedDate:{
        type:Date,
        default:Date.now,
    },
    user:{
        _id:mongoose.Types.ObjectId,
        username:String
    }
});

const Post=mongoose.model('Post',PostSchema);

module.exports = Post;