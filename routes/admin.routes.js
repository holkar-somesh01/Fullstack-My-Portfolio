const router = require("express").Router()
const adminController = require("./../controller/admin.controller")

router 
     .get("/get-tech",adminController.getTechnology)
     .post("/add-tech",adminController.addTechnology)
     .put("/update-tech/:id",adminController.updateTechnology)
     .delete("/delete-tech/:id",adminController.deleteTechnology)

module.exports = router