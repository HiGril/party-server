const {Router} = require("express")
const auth = require("./auth")
const newsModel = require("../model/news")

const router  = Router()
//添加新闻
router.post("/newsAdd",auth,async (req,res,next)=>{
    try {
        let {
            title,
            content, //存放富文本
            contentText,
            author,
            type,
            img
        } = req.body        
        let data =  await newsModel.create({
            title,
            content, //存放富文本
            contentText,
            author,
            type,
            look_num,
            img
        })
        res.json({
            code:200,
            data,
            msg:"添加新闻成功"
        })      
    } catch (error) {
        next(error)     
    }
})
//获取新闻列表
router.get("/",async(req,res,next)=>{
    try {
        let {page=1,page_size=10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        let count = await newsModel.count()
        let data = await newsModel.find()
        .limit(page_size)
        .skip((page - 1) * page_size)
        .sort({ _id: -1 })
        .populate({path:"type",select:'title'})
        .populate({path:"author",select:"-password"})
        res.json({
            data,
            msg:"获取新闻列表成功",
            code:200,
            count
        })        
    } catch (error) {
        next(error)
    }
})
//获取某位作者写的新闻
router.get("/:id",async(req,res,next)=>{
    try {
        let {id} = req.params  //作者的id
        let news = await newsModel.find({author:id})
       

        let count  = news.length
        // console.log(news);
        res.json({
            code:200,
            data:news,
            count,
            msg:"查找成功"
        })      
    } catch (error) {
        next(error)     
    }
})
//获取新闻详情
router.get("/newsDetail/:id",auth,async(req,res,next)=>{
    try {
        const {id} = req.params
        let data = await newsModel
        .findById(id)
        .populate({
            path:"author",
            select:"username"
        })
        .populate({
            path:"type",
            select:"title icon"
        })
        // console.log(data.id);
        // await newsModel.update({ _id:data._id}, {$inc: {look_num:1}})
        await data.update({$inc: {look_num: 1}})
        
        res.json({
            code:200,
            msg:"查找成功",
            data
        })          
    } catch (error) {
        next(error)    
    }
})
//删除新闻
router.delete("/newsDelete/:id",auth,async (req,res,next)=>{
    try {
        let {id} = req.params
        let data  = await newsModel.deleteOne({_id:id})
            res.json({
                code:200,
                msg:'删除新闻成功',
                data
            })    
    } catch (error) {
        next(error)   
    }
})
//编辑新闻
router.post("/newsEdit/:id",auth,async(req,res,next)=>{
    try {
        let {id} = req.params   //要编辑新闻的id
        let {
            title,
            content, //存放富文本
            contentText,
            author,
            type,
            look_num,
            img
        } = req.body  

       let news = await newsModel.findById(id)
        let data = await news.updateOne({$set:{
            title,
            content, //存放富文本
            contentText,
            author,
            type,
            look_num,
            img
        }})
        if(news){
            res.json({
                code:200,
                msg:"修改成功",
                data
            })
        }else{
            res.json({
                code:400,
                msg:"没有这条新闻"
            })
        }     
    } catch (error) {
        next(error)
        
    }

})

module.exports = router

