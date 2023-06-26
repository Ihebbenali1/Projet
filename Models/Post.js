const mongoose=require("mongoose")
const postSchema= new mongoose.Schema({
    date : String ,
    subject : String,
    contenu : String,
    valid : Boolean,
    owner : {
        type : mongoose.Types.ObjectId,
        ref : "user"
    }
})      
module.exports=mongoose.model("post",postSchema)