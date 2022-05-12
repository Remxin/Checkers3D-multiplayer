import { deleteForm, endScreen, informUserWhoseTurn } from "./Ui.js"
import { game } from './Main.js'

export let userD

export const login = async (name) => {
    let user
    console.log(name)
    // --- creating spinner ---
    const spinnerBG = document.createElement("div")
    const spinner = document.createElement("img")
    spinner.setAttribute("src", "/img/spinner.gif")
    spinner.setAttribute("alt", "spinner")
    spinner.classList.add("spinner")
    spinnerBG.classList.add("spinner-bg")
    // spinnerBG.setAttribute("id", "spinnerBG")
    // --- creating text above spinner ---
    const h2 = document.createElement("h2")
    h2.innerText = "Oczekiwanie na kolejnego gracza..."
    h2.classList.add("loading-text")
    spinnerBG.appendChild(h2)
    spinnerBG.appendChild(spinner)
    // --- actual fetch ---
    try {
        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
        })
        const resData = await res.json()
        // console.log(resData)
        if (resData.err) {
            return
        }

        userD = resData.user
        // console.log(userD)
        // console.log(user)
        // --- wyświetlanie spinnera ---
        document.getElementById("main").appendChild(spinnerBG)
        deleteForm()

        // --- oczekiwanie na kolejnego gracza ---
        const checkIfGameBeginsInterval = setInterval(async () => {
            // console.log("interval")
            let playersNum = await checkIfGameBegins()
            // console.log(playersNum)
            if (playersNum >= 2) {
                document.getElementById("main").removeChild(spinnerBG)
                clearInterval(checkIfGameBeginsInterval)

                game.placeStartPawns()
                if (userD.type === 'black') {
                    game.rotateCam()
                }

                if (userD.type === 'white') {
                    game.click()
                    serverStartCounter()
                }
                getRoundTime()
            }
        }, 500)
    } catch (err) {
        console.log(err)
    }
}

const checkIfGameBegins = async () => {
    try {
        const res = await fetch("/getUsersLen", {
            method: "POST",
        })
        const resData = await res.json()
        return resData.len
    } catch (err) {
        console.log(err)
    }
}

const getRoundTime = () => {
    try {
        const counterInterval = setInterval(async () => {
            const res = await fetch("/getInfo", {
                method: "POST",
            })
            // console.log('leci')
            const resData = await res.json()
            // console.log(resData)
            if (resData) {
                // console.log(resData.pawns)
                if (resData.pawns.white === 0) { // zwycięstwo poprzez bicia
                    console.log('win')
                    endScreen(resData.time, "white")
                    clearInterval(counterInterval)
                } else if (resData.pawns.black === 0) {
                    // console.log('win')
                    endScreen(resData.time, "black")
                    clearInterval(counterInterval)
                }
                informUserWhoseTurn(resData.time, resData.whoMoves)
                if (resData.time < 0) { // zwycięstwo poprzez czas
                    // console.log('win')
                    clearInterval(counterInterval)
                    endScreen(resData.time, resData.whoMoves)
                }
            }

        }, 1000)
    } catch (err) {
        console.log(err)
    }
}


export const informThereWasMove = async (prevPos, actualPos, wasBeating) => {
    try {
        const res = await fetch("/changeMovement", {
            method: "POST",
            body: JSON.stringify({ user: userD, prevPos, actualPos, wasBeating })
        })

        // const resData = await res.json()
        // console.log(resData)

    } catch (err) {
        console.log(err)
    }
}

async function serverStartCounter() {
    try {
        const res = await fetch("/startGame", {
            method: "POST",
        })

    } catch (err) {
        console.log(err)
    }
}


export const getChanges = async () => {
    const gameH = game
    try {
        const res = await fetch("/getPawnsChanges", {
            method: "POST",
        })
        const resData = await res.json()
        gameH.movePawn(resData.movement.prev, resData.movement.actual, resData.movement.color, resData.movement.wasBeating)

    } catch (err) {
        console.log(err)
    }
}


