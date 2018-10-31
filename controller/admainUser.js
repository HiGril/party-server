
const {Router} = require("express")
const mongoose = require("mongoose")
const admainUserModel = require("../model/admainUser")
const auth = require("./auth")
const newsModel = require("../model/news")
const topicModel = require("../model/topic")
const router = Router()

//添加管理员
router.post("/admainAdd",auth,async(req,res,next)=>{
    try{
        let {
            username,
            nickname,
            avatar,
            password,
            desc,
            job,
            phone,
            sex,
            salary
        } = req.body
        if(username==""||password==""){
            res.json({
                code:400,
                msg:"缺少必要参数"
            })    
        }
        const name = await admainUserModel.findOne({ username })
        if (name) {
            res.json({
                code: 402,
                msg: "用户已存在"
            })
        }
        const  data = await admainUserModel.create({
            username,
            nickname,
            avatar,
            password,
            desc,
            job,
            phone,
            sex,
            salary
        })
        res.json({
            code: 200,
            data,
            msg: "添加成功"
        })    
    } catch(err){
        next(err)
    }
})
//获取管理员详细信息
router.get("/admainDetail/:id",auth,async(req,res,next)=>{
    try {
        let {id} = req.params  
        const data = await admainUserModel.findById(id).select("-password")
        if(data){
            res.json({
                code: 200,
                msg: "success",
                data
            }) 
        }else{
            res.json({
                code:400,
                msg:"用户信息不存在"
            })
        }
          
    } catch (error) {
        next(error)       
    }   
})
//获取所有管理员信息
router.get("/",auth,async(req,res,next)=>{
    try{
        let {page=1,page_size=10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        let count = await admainUserModel.count()
        const data = await admainUserModel.find().limit(page_size).skip((page-1)*page_size).sort({id:1}).select("-password")
        res.json({
            code: 200,
            msg: "succsee",
            data,
            count
        })
    }catch(err){
        next(err)
    } 
})
//删除管理员
router.delete("/admainDelete/:id",auth,async(req,res,next)=>{
    try{
        let{id}= req.params
        let _id = mongoose.Types.ObjectId(id)
        // let user = await admainUserModel.findById(id)  //法一
        let data = await admainUserModel.deleteOne({_id:id})

        // console.log(data)
        if (data.n){  //判断是否查找到用户
            // await newsModel.deleteOne({ author: user._id})   //法一
            await newsModel.deleteOne({author: _id})
            await topicModel.deleteOne({user:_id})
            res.json({
                msg: "删除成功",
                data,
                code: 200
            })
        }else{
            res.json({
                code:400,
                msg:"用户信息不存在"
            })
        }      
    }catch(err){
        next(err)
    }
})

//编辑管理员个人信息 (不包括密码)
router.post("/admainEdit/:id",auth,async(req,res,next)=>{
    try {
        let {
            nickname,
            avatar,
            desc,
            job,
            phone,
            sex,
            salary
        } = req.body
        let {id} = req.params
        
        let admainEdit = await admainUserModel.findById(id)
        // console.log(admainEdit);
         let admain = await admainEdit.updateOne({$set:{
             nickname,
             avatar,
             desc,
             job,
             phone,
             sex,
             salary
         }})
         res.json({
             code:200,
             msg:"修改成功",
             data:admain
         })
        
    } catch (error) {
        
    }
})

//登录
router.post("/login",async (req,res,next)=>{
    try{
        let { username, password } = req.body
            let user = await admainUserModel.findOne({ username })
            // console.log(user);
            if (user) { //有该用户
                if (user.username == username && user.password == password) { //该用户的用户账号和密码都正确
                    req.session.user = user //将用户信息存放到session里面
                    res.json({
                        code: 200,
                        msg: "登录成功",
                        data:user
                        
                    })
                } else {
                    res.json({
                        code: 401,
                        msg: '用户名或密码不正确'
                    })
                }
            } else {
                res.json({
                    code: 400,
                    msg: "此用户不存在"
                })
            }
    }catch(err){
        next(err)
    }   
})

module.exports = router


 