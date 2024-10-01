const asyncHandler = require("express-async-handler")
const Validator = require("validator")
const Projects = require("../models/Projects")
const Carousel = require("../models/Carousel")
const Enquery = require("../models/Enquery")
const { checkEmpty } = require("../utils/cheackEmpty")

exports.fetchProjects = asyncHandler(async (req, res) => {
    const result = await Projects.find()
    res.json({message:"Project Fetch Success...!", result})
})
exports.getAllCarousel = asyncHandler(async (req, res) => {
    const result = await Carousel.find()
    res.status(200).json({ message: "blog fetch success", result })
})
exports.getProjectDetail = asyncHandler(async (req, res) => {
    const {id }=req.params
    const result = await Projects.findById(id)
    res.status(200).json({ message: "Project Details Fetch success", result })
})

// Enquery

exports.fetchEnqueryMessage = asyncHandler(async (req, res) => {
    const result = await Enquery.find()
    res.json({message:"Enquery Message Fetch Success...!", result})
})
exports.AddEnqueryMessage = asyncHandler(async (req, res) => {
    const {name, email, mobile, message, company} = req.body 
    const { isError, error } = checkEmpty({ name, email, mobile, message, company }) 
    if (isError) {
        return res.status(400).json({message:"All Fields Required",error})
    }
    if (!Validator.isEmail(email)) {
        return res.status(400).json({message:"Invalid Email"})
    }
    if (!Validator.isMobilePhone(mobile,"en-IN")) {
        return res.status(400).json({message:"Invalid Mobile"})
    }
    await Enquery.create({name, email, mobile, message, company})
    res.json({message:"Enquery Message Added Success...!",})
})
exports.updateEnqueryMessage = asyncHandler(async (req, res) => {
    await Enquery.findByIdAndUpdate(req.params.id,req.body)
    res.json({message:"Enquery Message Updated Success...!",})
})
exports.deleteEnqueryMessage = asyncHandler(async (req, res) => {
    await Enquery.findByIdAndDelete(req.params.id,)
    res.json({message:"Enquery Message Delete Success...!",})
})
