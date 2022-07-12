const Joi=require('joi');
const User=require('../../models/user');

const resister=async ctx=>{
    const schema=Joi.object().keys({
        username:Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
        password:Joi.string().required(),
    });

    const result=schema.validate(ctx.request.body);
    if(result.error){
        ctx.status=400;
        ctx.body=result.error;
        return;
    };

    const {username,password}=ctx.request.body;
    try{
        const exists=await User.findByUsername(username);
        if(exists){
            ctx.status=409;
            return;
        };

        const user=new User({
            username,
        });
        await user.setPassword(password);
        await user.save();

        ctx.body=user.serialize();
    }catch(e){
        ctx.throw(500,e);
    };
};

const login=async ctx=>{

};

const check=async ctx=>{

};

const logout=async ctx=>{

};

exports.resister=resister;
exports.login=login;
exports.check=check;
exports.logout=logout;