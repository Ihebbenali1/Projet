const express=require("express")
const Comment = require("../Models/Comment")


const commentRouter=express.Router()


commentRouter.post("/postComment",async(req,res)=>{
        try {
            const now = new Date(Date.now())
            const newComment = new Comment({...req.body,date : now.toLocaleString()})

            await newComment.save()

            res.status(200).send({msg : 'Comment added',newComment})
        } catch (error) {
            res.status(500).send({errors : [{msg : " could not comment "}]})
        }
    })

    commentRouter.put("/updateComment/:id",async(req,res)=>{
        try {
            const {id}=req.params
            const now = new Date(Date.now())
            await Comment.findByIdAndUpdate(id,{$set : {...req.body,date : now.toLocaleString()}})
            res.status(200).send({errors : [{msg : "Comment updated successfully"}]})
        } catch (error) {
            res.status(500).send({errors : [{msg : "Could not update comment"}]})
        }
    })
    commentRouter.delete("/DeleteComment/:id",async(req,res)=>{
        try {
            const {id}=req.params
            await Comment.findByIdAndDelete(id)
            res.status(200).send({errors:[{msg :'Comment deleted successfully'}]})
        } catch (error) {
            res.status(500).send({errors : [{msg : "Could not delete comment"}]})
        }
    })
    // commentRouter.get("/getOnePost/:id",async(req,res)=>{
    //     try {
    //         const {id}=req.params
    //         const found = await Post.findById(id).populate("owner")
    //         res.status(200).send({msg:"Here is the Post ",found})
    //     } catch (error) {
    //         res.status(500).send({errors : [{msg : "could not get post"}]})
    //     }
    // })
    // commentRouter.get("/getAllPosts",async(req,res)=>{
    //     try {
    //         const posts= await Post.find().populate("owner")
    //          res.status(200).send({msg :"Posts list",posts})
    //     } catch (error) {
    //         res.status(500).send({errors : [{msg : "could not get posts"}]})
    //     }})

    commentRouter.get('/getComments', async (req, res) => {
        try {
            
            const allComments = await Comment.find().populate('owner')
    
            res.status(200).send({ msg: 'My comments ', allComments })
        } catch (error) {
            res.status(500).send({ msg: 'Can not get my comments' })
    
        }
    })
module.exports=commentRouter
