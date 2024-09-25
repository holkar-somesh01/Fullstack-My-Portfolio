const asyncHandler = require("express-async-handler")
const Projects = require("../models/Projects")
const Carousel = require("../models/Carousel")

exports.fetchProjects = asyncHandler(async (req, res) => {
    const result = await Projects.find()
    res.json({message:"Project Fetch Success...!", result})
})
exports.getAllCarousel = asyncHandler(async (req, res) => {
    const result = await Carousel.find()
    res.status(200).json({ message: "blog fetch success", result })
})