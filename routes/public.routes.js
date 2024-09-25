const router = require("express").Router()
const publicController = require("../controller/public.controller")

router 
    .get("/fetch-project",publicController.fetchProjects)
    .get("/fetch-caro", publicController.getAllCarousel)
      
module.exports = router
     
