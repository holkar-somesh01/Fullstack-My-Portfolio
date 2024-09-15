const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const JWT = require("jsonwebtoken")
const { checkEmpty } = require("../utils/cheackEmpty")

exports.registerUser = asyncHandler(async( req, res ) => {
    const pass =  await bcrypt.hash(req.body.password, 10 )
    await User.create({...req.body, password: pass })
    res.json({message:"User Register Success"})
})
exports.loginUser = asyncHandler(async(req,res)=>{
    // Cheack Emapty
    const { email, password } = req.body
    const {error,isError} = checkEmpty({ email, password })
    if(isError){
        return res.status(401).json({message:"All Fields Required", error })
    }
    // Verify email
    const result = await User.findOne({ email })
    if (!result) {
        return res.status(401).json({message:"Invalid Email"})
    }
    // Verify pasword    
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(401).json({message:"Invalid Password"})
    }
    // create Token
    const Token =  JWT.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })
    // send Cookie
    res.cookie("user", Token,{
        httpOnly:true,
        maxAge: 1000 * 60 * 60 * 24
    })
    // send Responce
    res.json({message:"User Login Success",result:{
        _id:result._id,
        email:result.email,
        name:result.name,
    }})
})

exports.logoutUser = asyncHandler(async( req, res ) => {
    res.clearCookie("user")
    res.json({message:"User Logout Success"})
})