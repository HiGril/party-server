const {Router} = require("express")
const admainUserModel = require("../model/admainUser")
//登录鉴权
const jwt = require('jsonwebtoken');
const auth = require("../utils/secret")
const router = Router()

router.post("/login",async (req,res,next)=>{
    try {
        let {username,password} = req.body
        const user = await admainUserModel.findOne({username})
        if(user){
            if(user.password == password){
             const token = jwt.sign({userId:user._id},auth,{expiresIn:60*60*7}) //签名
                res.json({
                    code:200,
                    data:user,
                    mag:"登录成功",
                    token

                })

            }else{
                res.json({
                    code:400,
                    msg:"密码不正确"
                })
            }

        }else{
            res.json({
                code:400,
                mag:"此用户不存在"
            })
        }

        
    } catch (error) {
        next(error)
        
    }

})



module.exports = router


