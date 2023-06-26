const express=require("express")
const Post = require("../Models/Post")


const postRouter=express.Router()


postRouter.post("/postPost",async(req,res)=>{
        try {
            const now = new Date(Date.now())
            const newPost = new Post({...req.body,date : now.toLocaleString()})

            await newPost.save()

            res.status(200).send({msg : 'Post added',newPost})
        } catch (error) {
            res.status(500).send({errors : [{msg : " could not post "}]})
        }
    })

    postRouter.put("/updatePost/:id",async(req,res)=>{
        try {
            const {id}=req.params
            const now = new Date(Date.now())
            await Post.findByIdAndUpdate(id,{$set : {...req.body,date : now.toLocaleString()}})
            res.status(200).send({errors : [{msg : "Post updated successfully"}]})
        } catch (error) {
            res.status(500).send({errors : [{msg : "Could not update post"}]})
        }
    })
    postRouter.delete("/DeletePost/:id",async(req,res)=>{
        try {
            const {id}=req.params
            await Post.findByIdAndDelete(id)
            res.status(200).send({errors:[{msg :'Post deleted successfully'}]})
        } catch (error) {
            res.status(500).send({errors : [{msg : "Could not delete post"}]})
        }
    })
    postRouter.get("/getOnePost/:id",async(req,res)=>{
        try {
            const {id}=req.params
            const found = await Post.findById(id).populate("owner")
            res.status(200).send({msg:"Here is the Post ",found})
        } catch (error) {
            res.status(500).send({errors : [{msg : "could not get post"}]})
        }
    })
    postRouter.get("/getAllPosts",async(req,res)=>{
        try {
            const posts= await Post.find().populate("owner")
             res.status(200).send({msg :"Posts list",posts})
        } catch (error) {
            res.status(500).send({errors : [{msg : "could not get posts"}]})
        }})

    postRouter.get('/getMyposts/:id', async (req, res) => {
        try {
            const {id} = req.params
            const Allposts = await Post.find({owner : id}).populate('owner')
    
            res.status(200).send({ msg: 'My Posts ', Allposts })
        } catch (error) {
            res.status(500).send({ msg: 'Can not get my posts' })
    
        }
    })
module.exports=postRouter
