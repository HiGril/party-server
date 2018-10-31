const mongoose = require("mongoose")
const Schema = mongoose.Schema

let news = new Schema({
    title:String,
    content:String, //存放富文本
    contentText:String, 
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"admainUser"
    },
    type:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"category"
    },
    look_num:{
        type:Number,
        default: 0
    },
    img:String

  
},
{versionKey: false,timestamps: {createdAt: "create_time",updatedAt: "update_time"}})

module.exports = mongoose.model("news", news)
