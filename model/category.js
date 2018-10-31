const mongoose = require("mongoose")
const Schema = mongoose.Schema
let category = new Schema({
    title:String,
    icon:String, 
},
{versionKey: false,timestamps: {createdAt: "create_time",updatedAt: "update_time"}})

module.exports = mongoose.model("category", category)
