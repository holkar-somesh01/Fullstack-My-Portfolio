const mongoose = require("mongoose")

const carouselSchema = new mongoose.Schema({
    hero: {
        type: String
    },
    caption: {
        type: String
    },
}, { timestamps: true })

module.exports = mongoose.model("carousel", carouselSchema)