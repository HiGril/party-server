const mongoose = require("mongoose")
const Schema = mongoose.Schema

let admainUser = new Schema({
    username: {  
         type:String,
         unique:true,
         required:true
    },
    nickname:String,
    avatar:String,
    password:{
       type: String,
       required:true
    },
    desc:String,
    job:String,
    phone:Number,
    sex:Number,
    salary:Number,
},
{versionKey: false,timestamps: {createdAt: "create_time",updatedAt: "update_time"}})

module.exports = mongoose.model("admainUser", admainUser)


