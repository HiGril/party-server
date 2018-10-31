const { Router } = require("express")
// const mongoose = require("mongoose")
const auth = require("./auth")
const categoryModel = require("../model/category")

const router = Router()

//添加分类
router.post("/addcategory",auth,async (req,res,next)=>{
    try {
        let {
            title,
            icon,
        } = req.body
        // console.log(req.body)
        let category = await categoryModel.create({title, icon})
        res.json({
            code:200,
            msg:"添加分类成功",
            data:category
        })
         
    } catch (err) {
        next(err)   
    }

})
router.get("/", auth, async (req,res,next)=>{
    try {
        let data = await categoryModel.find()
        res.json({
            code:200,
            msg:"获取分类成功",
            data
        })   
    } catch (error) {
        next(error)
        
    }  
})


module.exports = router