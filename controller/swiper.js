const {Router} = require("express")
const swiperModel = require("../model/swiper")
const auth = require("./auth")

const router =Router()
//获取轮播图
router.get("/",auth,async(req,res,next)=>{
    try {
        let {page=1,page_size=10} = req.query
        page=parseInt(page)
        page_size = parseInt(page_size)
        let count = await swiperModel.count()
        let data = await swiperModel.find()
        .skip((page-1)*page_size)
        .limit(page_size)
        .sort({sort:-1,_id:-1})
        .populate({
            path:"newsId"
        })
        res.json({
            code:200,
            mag:"获取轮播图成功",
            data,
            count
        })    
    } catch (error) {
        next(error)   
    }

})
//获取轮播图信息
router.get("/swiperDetail/:id",auth,async(req,res,next)=>{
    try {
        let { id } = req.params
        let data = await swiperModel.findById(id)
        .populate({
            path:"newsId",
            select:""
        })
        res.json({
            code:200,
            msg:"获取轮播图详情成功",
            data
        })
        
    } catch (error) {
        next(error)
        
    }
  
})

//添加轮播图
router.post("/swiperAdd",auth,async(req,res,next)=>{
    try {
        let {img,
            sort,
            status,
            title,
            newsId } = req.body     
    let data = await swiperModel.create({
        img,
        sort,
        status,
        title,
        newsId 
    })  
    res.json({
        data,
        code:200,
        msg:"添加轮播图成功"
    })
          
    } catch (error) {
        next(error)
        
    }
})

//删除轮播图
router.delete("/swiperDelete/:id",auth,async(req,res,next)=>{
    try {
        let {id} = req.params
        const data = await swiperModel.deleteOne({_id:id})
        res.json({
            code:200,
            msg:"成功删除轮播图",
            data
        })     
    } catch (error) {
        next(err)
        
    }
})
//编辑轮播图
router.patch("/swiperEdit/:id",auth,async(req,res,next)=>{
    try {
        let {id} = req.params
        // console.log(id)
        let {
            img,
            sort,
            status,
            title,
            newsId 
        } = req.body
        let data = await swiperModel.findById(id)
        let updataData = await data.updateOne({$set:{
            img,
            sort,
            status,
            title,
            newsId 
        }})
        // console.log(updataData);
        res.json({
            code:200,
            msg:"修改成功",
            data: updataData
        })    
    } catch (error) {
        next(error)
        
    }
})

module.exports = router