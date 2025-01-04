const { default: mongoose } = require("mongoose");

let blogSchema = mongoose.Schema({
    title : {
        type:String,
        required:true,
        unique:true
    },
    image :{
        type:String,
        required:true
    },
    category : {
        type:String,
        required:true
    },
    description :{
        type:String,
        required:true
    }
})

let Blog = mongoose.models.Blog || mongoose.model("Blog",blogSchema)
module.exports = Blog