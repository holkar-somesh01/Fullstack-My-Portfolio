const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/cheackEmpty")
const Technology = require("../models/Technology")

exports.addTechnology = asyncHandler (async (req, res) => {
    const { name, category }= req.body
    const {error ,isError}= checkEmpty({name, category })
    if (isError) {
        return res.status(400).json({message:"ALL Feilds Required.",error:error})
    }
    await Technology.create({name, category})
    res.json({message:"Technology Create Success"})
})
exports.getTechnology = asyncHandler (async (req, res) => {
    const result = await Technology.find()
    res.json({message:"Technology Fetch Success", result })
})
exports.updateTechnology = asyncHandler (async (req, res) => {
    await  Technology.findByIdAndUpdate(req.params.id, req.body)
    res.json({message:"Technology Update Success"})
})
exports.deleteTechnology = asyncHandler (async (req, res) => {
    await  Technology.findByIdAndDelete(req.params.id)
    res.json({message:"Technology Delete Success"})
})