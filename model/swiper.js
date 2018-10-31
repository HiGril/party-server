const mongoose = require("mongoose")
const Schema = mongoose.Schema

let swiper = new Schema({
    img:String,
    sort:{  //控制轮播图排序
        type:Number,
        default:0
    },
    status:Number,//控制显示不显示
    title:String, //轮播图标题
    newsId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"news"
    }
    
},
{versionKey: false,timestamps: {createdAt: "create_time",updatedAt: "update_time"}})

module.exports = mongoose.model("swiper", swiper)
