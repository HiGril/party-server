//用户鉴权,判断用户有没有登录,如果没有登录则不能用某些功能
module.exports = function (req,res,next) {
    if(req.session && req.session.user){ //如果登录
        next()

    }else{
        res.json({
            code:403,   //重定向到登录
            msg:"登陆状态失效" 
        })

    }
    
}