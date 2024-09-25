const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/cheackEmpty")
const Technology = require("../models/Technology")
const Social = require("../models/Social")
const Carousel = require("../models/Carousel")
const cloudinary  = require("../utils/cloudinary.config")
const {upload, projectUpload} = require("../utils/upload")
const path = require("path")
const Projects = require("../models/Projects")

// Technology
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
//   SOCIAL MEDIA
exports.addSocial = asyncHandler(async (req, res) => {
    await Social.create(req.body)
    res.json({ message: "SocialMedia Added Success" })
})
exports.getSocial = asyncHandler(async (req, res) => {
    const result = await Social.find()
    res.json({ message: "SocialMedia Fetch Success", result })
})
exports.updateSocial = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Social.findByIdAndUpdate(id, req.body)
    res.json({ message: "SocialMedia Updated Success" })
})
exports.deleteSocial = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Social.findByIdAndDelete(id)
    res.json({ message: "SocialMedia Deleted Success" })
})
// Carousel
exports.getAllCarousel = asyncHandler(async (req, res) => {
    const result = await Carousel.find()
    res.status(200).json({ message: "blog fetch success", result })
})
exports.addCarousel = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: "upload Error",error: err })
        }
        console.log(req.file)
        if (!req.file) {
            return res.status(400).json({ message: "Hero Image Required" })
        }
        const { secure_url } = await cloudinary.uploader.upload(req.file.path)
        const result = await Carousel.create({ ...req.body, hero: secure_url })
        res.json({ message: "Carousel Add Success", result })
    })
})
exports.updateCarousel = asyncHandler(async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "Multer error" });
            }

            const { id } = req.params;

            if (req.file) {
                // Check if the carousel item exists
                const result = await Carousel.findById(id);
                if (!result) {
                    return res.status(404).json({ message: "Carousel item not found" });
                }

                // Delete old image from Cloudinary
                console.log(result);
                try {
                    
                    await cloudinary.uploader.destroy(path.basename(result.hero));
                } catch (cloudinaryErr) {
                    return res.status(500).json({ message: "Error deleting image from Cloudinary" });
                }

                // Upload new image to Cloudinary
                let secure_url;
                try {
                    const uploadResult = await cloudinary.uploader.upload(req.file.path);
                    secure_url = uploadResult.secure_url;
                } catch (uploadErr) {
                    return res.status(500).json({ message: "Error uploading image to Cloudinary" });
                }

                // Update carousel item with new image URL
                await Carousel.findByIdAndUpdate(id, { caption: req.body.caption, hero: secure_url });
            } else {
                // Update carousel item without changing the image
                await Carousel.findByIdAndUpdate(id, { caption: req.body.caption });
            }

            res.json({ message: "Carousel update success" });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.deleteCarousel = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Carousel.findById(id)
    console.log(result);

    await cloudinary.uploader.destroy(path.basename(result.hero))
    await Carousel.findByIdAndDelete(id)
    res.json({ message: "Carousel Deleted Success" })
})
// ADD PROJECTS
exports.addProject = asyncHandler(async (req, res) => {
    projectUpload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({message:"Multer Error"})
        }
        if (
            !req.files["images"]                  ||
            !req.files["screenshots-Web-main"]    ||
            !req.files["screenshots-Web-other"]   ||
            !req.files["screenshots-Mobile-main"] ||
            !req.files["screenshots-Mobile-other"]||
            !req.files["sections-web-images"]     ||
            !req.files["sections-mobile-images"]
        ) {
            return res.status(400).json({message:"All Images Required"})
        }
        let images = {}
        for (const key in req.files) {
            if (key === "screenshots-Web-other" || key === "screenshots-Mobile-other") {   
                if (!images[key]) {
                    images[key] = []
                } 
                const uploadALLImages = []
                for (const item of req.files[key]) {
                    uploadALLImages.push(cloudinary.uploader.upload(item.path))
                }
                const allData = await Promise.all(uploadALLImages)
                images[key] = allData.map(item=>item.secure_url)
            } else {
                const { secure_url } = await cloudinary.uploader.upload(req.files[key][0].path)
                images[key] = secure_url
            }
        }
        await Projects.create({
            title: req.body.title,
            shortdesc: req.body.shortdesc,
            desc:req.body.desc,
            duration:req.body.duration,
            learning: req.body.learning,
            images:images.images,
            live:req.body.live,
            source:req.body.source,
            isMobileApp: req.body.isMobileApp,
            technologies: {
                frontend:req.body.FrontEnd,
                backend:req.body.BackEnd,
                mobile:req.body.Mobile,
                collabration:req.body.Collabration,
                hoisting:req.body.Hoisting,
            },
            sections: {
                web: [
                    {
                        title: req.body["sections-web-title"], 
                        desc: req.body["sections-web-desc"], 
                        images: images["sections-web-images"], 
                    }
                ],
                mobile: [
                    {
                        title: req.body["sections-mobile-title"], 
                        desc: req.body["sections-mobile-desc"], 
                        images: images["sections-mobile-images"], 
                    }
                ],
            },
            screenshots: {  
                    web: {
                        main: images["screenshots-Web-main"],
                        other: images["screenshots-Web-other"]
                    },
                    mobile: {
                        main:images["screenshots-Mobile-main"],
                        other: images["screenshots-Mobile-other"]
                    }
            },
        })
        res.json({ message: "Project Add Success...!" })
    })
})
exports.fetchProjects = asyncHandler(async(req,res)=> {
    const result = await Projects.find()
    res.json({message:"Project Fetch Success...!", result})
})
exports.deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Projects.findById(id)
    const allImages = []
    allImages.push(cloudinary.uploader.destroy(path.basename(result.images)))
    for (const item of result.sections.web) {
        allImages.push(cloudinary.uploader.destroy(path.basename(item.images)))
    }
    for (const item of result.sections.mobile) {
        allImages.push(cloudinary.uploader.destroy(path.basename(item.images)))
    }
    allImages.push(cloudinary.uploader.destroy(path.basename(result.screenshots.web.main)))
    allImages.push(cloudinary.uploader.destroy(path.basename(result.screenshots.mobile.main)))
    for (const item of result.screenshots.web.other) {
        allImages.push(cloudinary.uploader.destroy(path.basename(item)))
    }
    for (const item of result.screenshots.mobile.other) {
        allImages.push(cloudinary.uploader.destroy(path.basename(item)))
    }
    await Promise.all(allImages)
    await Projects.findByIdAndDelete(id)
    res.json({message:"Project Delete Success...!"})
})