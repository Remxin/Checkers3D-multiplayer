const { Router } = require("express")
const authControllers = require("../controllers/authControllers")
const router = Router()

router.post("/login", authControllers.login)
router.post("/getUsersLen", authControllers.getUsersLenght)
router.post("/changeMovement", authControllers.changeMovement)
router.post("/getInfo", authControllers.getMovementInfo)
router.post("/startGame", authControllers.startGame)
router.post("/getPawnsChanges", authControllers.getBoardUpdate)


module.exports = router