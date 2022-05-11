const { users } = require("../data/users")
const path = require("path")


const serveMainPage = (req, res) => {
    res.sendFile(path.join(__dirname + "/../static/html/index.html"))
}


module.exports = { serveMainPage }