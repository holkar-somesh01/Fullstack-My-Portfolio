const router = require("express").Router()
const { rateLimit } = require("express-rate-limit")
const publicController = require("../controller/public.controller")

router
    .get("/fetch-project", publicController.fetchProjects)
    .get("/fetch-caro", publicController.getAllCarousel)
    .get("/project-details/:id", publicController.getProjectDetail)

    .get("/fetch-enquery", publicController.fetchEnqueryMessage)
    .post("/add-enquery", rateLimit({ windowMs: 15 * 60 * 1000, limit: 2 }), publicController.AddEnqueryMessage)
    .put("/update-enquery/:id", publicController.updateEnqueryMessage)
    .delete("/delete-enquery/:id", publicController.deleteEnqueryMessage)

module.exports = router

