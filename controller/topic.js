const {Router} = require("express")
const mongoose = require("mongoose")
const topicModel = require("../model/topic")
// const newsModel = require("../model/news")
const commentModel = require("../model/comment")
const admainUserModel = require("../model/admainUser")
const auth = require("./auth")
const router = Router()
//添加话题
router.post("/topicAdd",auth,async(req,res,next)=>{
    try {
        let { content } = req.body
        let userId = req.session.user._id
        let data = await topicModel.create({
            content,
            user:userId
        })
        res.json({
            code:200,
            msg:"添加话题成功",
            data
        })      
    } catch (error) {
        next(error)    
    }
 
})
//查看话题列表
router.get("/", async (req, res, next) => {
    try {
        let { page = 1, page_size = 10 } = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        let count = await topicModel.count()
        // console.log(count);
        let data = await topicModel.find()
            .skip((page - 1) * page_size)
            .limit(page_size)
            .sort({ _id: -1 })
            .populate({
                path:"user",
                select:"username avatar"
            })
            .populate({
                path:"comment",
                select:"commentUser content"
            })
            
            
        res.json({
            code: 200,
            msg: "查找成功",
            data,
            count
        })
    } catch (error) {
        next(error)
    }
})

// router.get("/", async (req, res, next) => {
//     try {
//         let { page = 1, page_size = 10 } = req.query
//         page = parseInt(page)
//         page_size = parseInt(page_size)
//         let count = await topicModel.count()
//         // console.log(count);
//         let data = await topicModel.find()
//             .skip((page - 1) * page_size)
//             .limit(page_size)
//             .sort({ _id: -1 })
//             .populate({
//                 path: "user",
//                 select: "username avatar"
//             })
//             .populate({
//                 path: "comment",
//                 select: "commentUser content"
//             })
//         res.json({
//             code: 200,
//             msg: "查找成功",
//             data,
//             count
//         })
//     } catch (error) {
//         next(error)
//     }
// })

//删除话题
router.delete("/topicDelete/:id",auth,async(req,res,next)=>{
    try {
                let { id } = req.params
                let _id = mongoose.Types.ObjectId(id)
                let data = await topicModel.deleteOne({ _id: id })
               
                if (data.n) {  
                    await admainUserModel.deleteOne({ user: _id })
                    await commentModel.deleteOne({ user: _id })
                    res.json({
                        msg: "删除成功",
                        data,
                        code: 200
                    })
                } 
         
        
    } catch (error) {
        next(error)
        
    }
})





module.exports = router
