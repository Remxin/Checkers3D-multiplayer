const { users } = require("../data/users")
const path = require("path")
const { countReset } = require("console")
// const { move } = require("../routes/authRoutes")

let counter = 30
let whoMoves = 'white'
let movement = {}


const login = (req, res) => {
    const userName = req.body.name
    // -- if users exists --
    const isUser = users.find((user) => user.userName === userName)
    if (!!isUser) {
        return res.send({ err: "User already exist" })
    }

    if (users.length === 0) {
        users.push({ userName, type: "white" })
    } else if (users.length === 1) {
        users.push({ userName, type: "black" })
    } else {
        users.push({ userName, type: "spectator" })
    }
    // -- success in logging -- 
    return res.status(200).send({ msg: "User successfully logged!", user: users.find((u) => u.userName === userName) })
}

// ----- returning users lenght (if > 1, game begins)------
const getUsersLenght = (req, res) => {
    return res.status(200).send({ len: users.length })
}

const changeMovement = (req, res) => {
    const { user, prevPos, actualPos } = JSON.parse(req.body)
    // console.log(user, prevPos, actualPos)
    movement.prev = prevPos
    movement.actual = actualPos
    movement.color = user.type
    console.log(movement)

    counter = 30
    if (whoMoves === "white") {
        whoMoves = "black"
    } else if (whoMoves === "black") {
        whoMoves = "white"
    }

    console.log(counter, whoMoves)
    return res.status(200)
}

const getMovementInfo = (req, res) => {
    return res.status(200).send({ time: counter, whoMoves })
}

const getBoardUpdate = (req, res) => {
    return res.status(200).send({ movement })
}

module.exports = { login, getUsersLenght, changeMovement, getMovementInfo, getBoardUpdate }