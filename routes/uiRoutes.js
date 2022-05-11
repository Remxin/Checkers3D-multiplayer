const { Router } = require("express")
const uiControllers = require("../controllers/uiControllers")
const router = Router()

router.get("/", uiControllers.serveMainPage)


module.exports = router