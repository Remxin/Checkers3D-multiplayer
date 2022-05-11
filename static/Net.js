import { deleteForm } from "./Ui.js"
import { game } from './Main.js'

export let userD

export const login = async (name) => {
    let user
    console.log(name)
    // --- creating spinner ---
    // const spinnerBG = document.createElement("div")
    // const spinner = document.createElement("img")
    // spinner.setAttribute("src", "/img/spinner.gif")
    // spinner.setAttribute("alt", "spinner")
    // spinner.classList.add("spinner")
    // spinnerBG.classList.add("spinner-bg")
    // spinnerBG.appendChild(spinner)
    // --- creating text above spinner ---
    const h2 = document.createElement("h2")
    h2.innerText = "Oczekiwanie na kolejnego gracza..."
    h2.classList.add("loading-text")
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
        console.log(resData)
        if (resData.err) {
            return
        }

        userD = resData.user
        console.log(userD)
        // console.log(user)
        // --- wyświetlanie spinnera ---
        // document.getElementById("main").innerHTML = ""
        // document.getElementById("main").appendChild(h2)
        // document.getElementById("main").appendChild(spinnerBG)
        // game.showBoard()

        // --- oczekiwanie na kolejnego gracza ---
        const checkIfGameBeginsInterval = setInterval(async () => {
            console.log("interval")
            let playersNum = await checkIfGameBegins()
            console.log(playersNum)
            if (playersNum >= 2) {
                clearInterval(checkIfGameBeginsInterval)
                deleteForm()
                game.placeStartPawns()
                if (userD.type === 'black') {
                    game.rotateCam()
                    // getRoundTime()
                }

                if (userD.type === 'white') {
                    game.click()
                }
            }
        }, 1000)
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

// const getRoundTime = async () => {
//     try {
//         setInterval(async () => {
//             const res = await fetch("/getTime", {
//                 method: "POST",
//             })
//             // const resData = await res.json()
//         }, 1000)
//         console.log(resData)
//     } catch (err) {
//         console.log(err)
//     }
// }


export const informThereWasMove = async (prevPos, actualPos) => {
    try {
        const res = await fetch("/changeMovement", {
            method: "POST",
            body: JSON.stringify({ user: userD, prevPos, actualPos })
        })

        const resData = await res.json()
        console.log(resData)

    } catch (err) {
        console.log(err)
    }
}

