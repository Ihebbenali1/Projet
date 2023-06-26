const User = require("../Models/User")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
exports.signUp=async(req,res)=>{
    try {
        const {email,password} = req.body
        const found = await User.findOne({email})
        if (found){
            return res.status(400).send({errors :[{msg : " email already in use"}]})
        }
        const newUser = new User({...req.body,role :"client"})
        const saltRounds= 10 
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        newUser.password=hashedPassword
        await newUser.save()
        const payload = {id : newUser._id}
        var token = jwt.sign(payload, process.env.privateKey);
        res.status(200).send({msg :"user added",token,newUser})
    } catch (error) {
        res.status(500).send({errors : [{msg : "Could not register"}]})
    }
}

exports.signIn=async(req,res)=>{
    try {
        const {email,password}=req.body
        const found= await User.findOne({email})
        if(!found){
            return res.status(400).send({errors : [{msg : "Invalid email"}]})
        }
        const matched=bcrypt.compareSync(password, found.password)
        if(!matched){
            return res.status(500).send({errors : [{msg : "Wrong password"}]})
        }
        const payload = {id : found._id}
        var token = jwt.sign(payload, process.env.privateKey);
        res.status(200).send({msg : "Signed successfully",found,token})
    } catch (error) {
        res.status(500).send({errors : [{msg : "Could not sign in"}]})
    }
}

exports.UpdateUser=async(req,res)=>{
    try {
        const {id}=req.params
        const found= await User.findByIdAndUpdate(id,{$set : req.body})
        res.status(200).send({errors : [{msg : "User updated successfully"}]})
    } catch (error) {
        res.status(500).send({errors : [{msg : "Could not update user"}]})
    }
}

exports.DeleteUser=async(req,res)=>{
    try {
        const {id}=req.params
        const found=await User.findByIdAndDelete(id)
        res.status(200).send({errors:[{msg :'user deleted successfully'}]})
    } catch (error) {
        res.status(500).send({errors : [{msg : "could not delete user"}]})
    }
}

exports.getOneUser=async(req,res)=>{
    try {
        const {id}=req.params
        const found = await User.findById(id)
        res.status(200).send({msg:"here is the user ",found})
    } catch (error) {
        res.status(500).send({errors : [{msg : "could not get user"}]})
    }
}

exports.getAllUsers=async(req,res)=>{
    try {
        const users= await User.find()
         res.status(200).send({msg :"Users list",users})
    } catch (error) {
        res.status(500).send({errors : [{msg : "could not get users"}]})
    }
}