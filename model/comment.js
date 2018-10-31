const mongoose = require("mongoose")
const Schema = mongoose.Schema

let comment = new Schema({
    commentUser:{ //评论者
        type:mongoose.SchemaTypes.ObjectId,
        ref:"admainUser"
    },
    content:String, //评论的内容
    topicId:{   //评论的是那一条信息
        type:mongoose.SchemaTypes.ObjectId,
        ref:"topic"
    }
},
{versionKey: false,timestamps: {createdAt: "create_time",updatedAt: "update_time"}})

module.exports = mongoose.model("comment", comment)
