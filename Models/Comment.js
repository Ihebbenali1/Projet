const mongoose=require("mongoose")
const commentSchema= new mongoose.Schema({
    contenu : String ,
    owner : {
        type : mongoose.Types.ObjectId,
        ref : "user"
    },
    post : {
        type : mongoose.Types.ObjectId,
        ref : "post"
    },
    date :String
})

module.exports=mongoose.model("comment",commentSchema)