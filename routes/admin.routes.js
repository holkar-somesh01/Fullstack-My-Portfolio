const router = require("express").Router()
const adminController = require("../controller/admin.controller")

router
    .get("/get-tech",adminController.getTechnology)
    .post("/add-tech",adminController.addTechnology)
    .put("/update-tech/:id",adminController.updateTechnology)
    .delete("/delete-tech/:id",adminController.deleteTechnology)

    //   SOCIAL MEDIA
    .post("/add-social", adminController.addSocial)
    .get("/get-social", adminController.getSocial)
    .put("/update-social/:id", adminController.updateSocial)
    .delete("/delete-social/:id", adminController.deleteSocial)

    // Carousel
    .post("/add-caro", adminController.addCarousel)
    .get("/fetch-caro", adminController.getAllCarousel)
    .put("/update-caro/:id", adminController.updateCarousel)
    .delete("/delete-caro/:id", adminController.deleteCarousel)
    
    // ADD Project
    .get("/fetch-project",adminController.fetchProjects)
    .post("/add-project",adminController.addProject)
    .delete("/delete-project/:id", adminController.deleteProject)
module.exports = router