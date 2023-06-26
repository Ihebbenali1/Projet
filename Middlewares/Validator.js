const { body, validationResult } = require('express-validator');


exports.signUpValidator = [
    body('email','You must enter un email').isEmail(),
    body('password','Your password must contain 8 characters at least').isLength({min : 8})

]
exports.signInValidator = [
    body('email','You must enter un email').isEmail(),
    

]

exports.validation=(req,res,next)=>{
    const result = validationResult(req);
  if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() }) ; 
      
  }
  next()
}