const { Router } = require("express")
const authControllers = require("../controllers/authControllers")
const router = Router()

router.post("/login", authControllers.login)
router.post("/getUsersLen", authControllers.getUsersLenght)
router.post("/changeMovement", authControllers.changeMovement)


module.exports = router