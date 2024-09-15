const router = require("express").Router()
const projectController = require("./../controller/project.controller")

router
    .get("/fetch-project",projectController.fetchProjects)
    .post("/add-project",projectController.addProject)
    .put("/update-project/:id",projectController.updateProject)
    .delete("/delete-project/:id", projectController.deleteProject)
     
module.exports = router