const mongoose = require("mongoose")
const Schema = mongoose.Schema

let topic = new Schema({
    content: {   //所发话题的内容
         type:String,
         required:true
    },
    user:{ //发话题的用户
        type:mongoose.SchemaTypes.ObjectId,
        ref:"admainUser"
    },
    comment:[ //话题的回复信息
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:"comment"
        }
    ], 
    count:Number //回复的数量
},
{versionKey: false,timestamps: {createdAt: "create_time",updatedAt: "update_time"}})

module.exports = mongoose.model("topic", topic)
