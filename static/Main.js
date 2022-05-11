import { generateLoginForm } from "/Ui.js";
import { Game } from "./Game.js"

export let game
// -- displaying form --
window.onload = () => {
    generateLoginForm() // generowanie formularza
    game = new Game()
    game.render()
}