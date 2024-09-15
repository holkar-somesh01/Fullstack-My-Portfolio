const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    title: {type: String, required: true },
    shortdesc: {type: String, required: true },
    desc: {type: String, required: true },
    duration: {type: String, required: true },
    learning: {type: String, required: true },
    images: {type: String, required: true },
    technologies: {type: [String], required: true },
    sections: {type: [String] ,required: true },
})

module.exports = new mongoose.model("projects", projectSchema)