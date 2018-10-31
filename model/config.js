const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/eHome", { useNewUrlParser: true });

let connection = mongoose.connection;

connection.on("error", console.error.bind(console,"connection error"))

connection .once("open",function () {
    console.log("connection success");  
})

module.exports = connection







