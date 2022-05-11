import { login } from "/Net.js"

export const generateLoginForm = () => {
    console.log('leci')
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

    // --- adding elements to form ---
    form.appendChild(nameInput)
    form.appendChild(loginButton)
    form.appendChild(resetButton)

    // --- appending form ---
    document.getElementById("main").appendChild(form)

}

export const deleteForm = () => {
    const main = document.getElementById("main")
    const form = document.getElementsByTagName("form")
    main.removeChild(form[0])
}

// export const displayGame = () => {

//     // --- scena 3D ---
//     const scene = new THREE.Scene();

//     // --- axes ---
//     const axes = new THREE.AxesHelper(1000)
//     scene.add(axes)

//     // ---kamera ---
//     const camera = new THREE.PerspectiveCamera(
//         45,    // kąt patrzenia kamery (FOV - field of view)
//         4 / 3,    // proporcje widoku, powinny odpowiadać proporcjom ekranu przeglądarki użytkownika
//         0.1,    // minimalna renderowana odległość
//         10000    // maksymalna renderowana odległość od kamery
//     );

//     // renderer wykorzystujący WebGL - działa stabilnie na wszystkich
//     // najnowszych przeglądarkach zarówno desktopowych jak mobilnych

//     const renderer = new THREE.WebGLRenderer();

//     // kolor tła sceny - uwaga na prefix 0x a nie #

//     renderer.setClearColor(0xdddddd);

//     // ustal rozmiary renderowanego okna w px (szer, wys)

//     renderer.setSize(window.innerWidth, window.innerHeight);

//     renderer.domElement.setAttribute("id", "renderer")
//     $("#main").append(renderer.domElement);

//     camera.position.set(100, 100, 100)
//     camera.lookAt(scene.position)


//     camera.position.set(100, 100, 100)


//     camera.lookAt(scene.position);

//     function render() {


//         requestAnimationFrame(render);
//         console.log("render leci")

//         renderer.render(scene, camera);
//     }

//     render();
// }