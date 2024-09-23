const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    title: {type: String, required: true },
    shortdesc: {type: String, required: true },
    desc: {type: String, required: true },
    duration: {type: String, required: true },
    learning: {type: String, required: true },
    images: { type: String, required: true },
    isMobileApp:{type: Boolean ,required: true },
    live:{type: String,required: true },
    source:{type: String ,required: true },
    screenshots: {
        web: {
            main: {type: String ,required: true },
            other: {type: [String] },
        },
        mobile: {
            main: {type: String ,required: true },
            other: {type: [String]  },
        }
    },
    sections: {
        web: [{ title: String, desc: String, images:String}],
        mobile: [{ title: String, desc: String, images:String}]
    },
    technologies: {
        frontend:  [String],
        backend:  [String],
        mobile:  [String],
        collabration:  [String],
        hoisting:  [String],
    }, 
},{timestamps: true})

module.exports = new mongoose.model("projects", projectSchema)