import { login } from "/Net.js"
import { userD, getChanges } from "./Net.js"
import { game } from "./Main.js"

export let activeCounter = null
export let unactiveCounter = null
export let unactiveD = null
let lastTurn = 'white'

export const generateLoginForm = () => {
    // global variable name
    let name = ""
    const form = document.createElement("form")
    // -- name input --
    const nameInput = document.createElement("input")
    nameInput.setAttribute("type", "text")
    nameInput.setAttribute("placeholder", "Podaj swoje imie: ")
    nameInput.onchange = (e) => name = e.target.value

    // -- login button --
    const loginButton = document.createElement("button")
    loginButton.innerText = "LOGIN"
    loginButton.onclick = (e) => {
        e.preventDefault()
        login(name)
        name = ""
        nameInput.value = ""
    }

    // -- reset button --
    const resetButton = document.createElement("button")
    resetButton.innerHTML = "RESET"
    resetButton.onclick = (e) => {
        e.preventDefault()
        reset()
    }


    // --- adding elements to form ---
    form.appendChild(nameInput)
    form.appendChild(loginButton)
    form.appendChild(resetButton)

    // --- appending form ---
    document.getElementById("main").appendChild(form)

    // ---- counter -----
    const counter = document.createElement('h3')
    counter.classList.add("active-counter")
    activeCounter = counter
    activeCounter.style.display = 'none'
    const unactiveDiv = document.createElement("div")
    unactiveDiv.classList.add("dark-screen")
    const counter2 = document.createElement('h3')
    counter2.classList.add("unactive-counter")
    unactiveCounter = counter2
    unactiveD = unactiveDiv
    unactiveD.style.display = 'none'
    unactiveDiv.appendChild(counter2)

    document.getElementById("main").appendChild(activeCounter)
    document.getElementById("main").appendChild(unactiveD)

}

export const deleteForm = () => {
    const main = document.getElementById("main")
    const form = document.getElementsByTagName("form")
    main.removeChild(form[0])
}

export const endScreen = (time, whoMoves) => {
    let won
    if (whoMoves === "white") {
        won = "Black"
    } else {
        won = 'White'
    }

    const div = document.createElement("div")
    div.innerHTML = `<h2>${won} wins!</h2>`
    div.classList.add("end-screen")
    document.getElementById("main").innerHTML = ""
    document.getElementById("main").appendChild(div)

}

export const informUserWhoseTurn = (time, whoMoves) => {
    if (userD.type === whoMoves) {
        // console.log(lastTurn, whoMoves)
        if (lastTurn !== whoMoves) {
            lastTurn = whoMoves
            getChanges()
            game.click()
        }
        unactiveD.style.display = 'none'
        activeCounter.style.display = "flex"
        activeCounter.innerText = time
    } else {
        unactiveD.style.display = 'flex'
        activeCounter.style.display = "none"
        unactiveCounter.innerText = time
        lastTurn = whoMoves
    }
}

const reset = async () => {
    try {
        const res = await fetch("/resetGame", {
            method: "POST"
        })
        const resData = await res.json()
        console.log(resData)
    } catch (err) {
        console.log(err)
    }
}