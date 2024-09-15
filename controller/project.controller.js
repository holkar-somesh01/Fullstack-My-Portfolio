const asyncHandler = require("express-async-handler")
const upload = require("../utils/upload")
const Projects = require("../models/Projects")

exports.addProject = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        const {title, shortdesc, desc, duration, learning, images, technologies, sections }= req.body

        res.json({ message: "Project Add Success...!" })
    })
})
exports.fetchProjects = asyncHandler(async(req,res)=> {
    const result = await Projects.find()
    res.json({message:"Project Fetch Success...!", result})
})
exports.updateProject = asyncHandler(async (req, res) => {
    const { id}=req.params
    await Projects.findByIdAndUpdate(id, req.body)
    res.json({message:"Project  Update Success...!"})
})
exports.deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Projects.findByIdAndDelete(id)
    res.json({message:"Project Delete Success...!"})
})