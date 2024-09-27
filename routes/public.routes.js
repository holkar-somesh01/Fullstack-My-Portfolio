const router = require("express").Router()
const publicController = require("../controller/public.controller")

router 
    .get("/fetch-project",publicController.fetchProjects)
    .get("/fetch-caro", publicController.getAllCarousel)
    .get("/project-details/:id", publicController.getProjectDetail)
      
module.exports = router
     
