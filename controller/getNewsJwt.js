//鉴权和不鉴权两种获取新闻的方式
const {Router} = require("express")
const newsModel = require("../model/news")
const jwt =require("jsonwebtoken")
const auth = require("../utils/secret")
const admainModel = require("../model/admainUser")
const router = Router()
router.get("/getNews1",async(req,res,next)=>{
    try {
        const news = await newsModel.find()
        res.json({
            code:200,
            mag:"success",
            data:news
        })     
    } catch (error) {
        next(error)   
    }
})
//  鉴权情况下获取新闻 ---->有token情况下----->登录状态下

router.get("/getNews2",(req,res,next)=>{
    try {
        let token =  req.headers.token ||req.query.token ||req.body.token
        if(token){
            jwt.verify(token, auth, function (err, decode) {     //解码
                if(err){
                    res.json({
                        code:403,
                        msg:"登录状态失效"
                    })
                    return
                }
                // console.log(decode);
                 admainModel.findOne({ _id: decode.userId}).then(user=>{
                     newsModel.find().then(news=>{
                         res.json({
                            code:200,
                            msg:"查找成功", 
                            data:{
                                news,
                                user
                            }
                        })
                     })
                 })
            })                      
        }else{
            res.json({
                code:403,
                mag:"没有token"
            })
        }



        
    } catch (error) {
        next(error)
        
    }
})









module.exports = router





