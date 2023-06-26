const express=require("express")
const User = require("../Models/User")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { signUp, signIn, UpdateUser, DeleteUser, getOneUser, getAllUsers } = require("../Controllers/User");
const { signUpValidator, validation, signInValidator } = require("../Middlewares/Validator");
const { isAuth } = require("../Middlewares/isAuth");
const userRouter=express.Router()
    userRouter.post("/SignUp",signUpValidator,validation,signUp) 
    userRouter.post("/SignIn",signInValidator,validation,signIn)
    userRouter.get("/getCurrentUser",isAuth,(req,res)=>res.send(req.User) )
    userRouter.put("/updateUser/:id",UpdateUser)
    userRouter.delete("/DeleteUser/:id",DeleteUser)
    userRouter.get("/getOneUser/:id",getOneUser)
    userRouter.get("/getAllUsers",getAllUsers)
   
module.exports=userRouter