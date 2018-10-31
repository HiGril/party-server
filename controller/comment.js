const {Router} = require("express")
const auth = require("./auth")
const commentModel = require("../model/comment")
const topicModel = require("../model/topic")
const admainModel = require("../model/admainUser")

const router = Router()

//添加评论信息

router.post("/commentAdd",auth,async (req,res,next)=>{
    try {
        let {content,topicId } = req.body
        let userId = req.session.user._id

        let comment  
        let topic = await topicModel.findById(topicId)
        let user = await admainModel.findById(userId)
        if (topicId){  //如果话题存在
             comment = await commentModel.create({
                content,
                topicId:topic._id,
                commentUser: user
            })
            await topic.update({ $push: { comment: comment._id}})
            res.json({
                code: 200,
                data: comment,  
                msg: "添加信息成功"
            }) 

        }else{
            res.json({
                code:400,
                msg:"此条信息不存在"
            })
        }
            
    } catch (error) {
        next(error)     
    }

})
//获取评论列表
router.get("/:id",async(req,res,next)=>{
    try {
        let {page = 1, page_size = 10} = req.query
        page = parseInt(page)
        page_size=parseInt(page_size)
        let { id } = req.params 
        let commentList = await commentModel.find({ topicId: id })
        .skip((page-1)*page_size)
        .limit(page_size)
        .sort({_id:-1})
        .populate({
            path:"commentUser",
            select:"-password"
        })
        .populate({
            path:"topicId"
        })

        let count = await commentList.length
        res.json({
            code:200,
            msg:"获取评论列表成功",
            data: commentList,
            count
        })    
    } catch (error) {
        next(error)
        
    }
})









module.exports = router