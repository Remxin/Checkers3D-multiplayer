import { Field } from "./Field.js";
import { Pawn } from './Pawn.js'
import { helpers } from "./Helpers.js";
import { userD, informThereWasMove } from "./Net.js";

export class Game {
    constructor() {
        this.player = "" // "white" or "black"
        this.szachownica = [ // 1 - czarne, 0 - białe
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
        ]
        this.pionki = [ // 2 - czarne, 1 - białe
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0]
        ]
        this.pawns = [] // tablica z obiektami pionków
        this.tiles = [] // tablica z obiektami pól
        this.isPawnClicked = false // czy pionek został kliknięty
        this.canMoveTiles = [] // pola na które może ruszyć się pionek
        this.pawnClicked = null // który pionek ma się poruszyć
        this.wasBeating = false // definiuje, czy było bicie w tej turze
        this.canHitAgain = false // drfinije, czy gracz ma dostać dodatkowy ruch (po biciu)

        this.init()

    }
    init = () => {
        // ---- basic settings -----
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xdddddd);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // --- axes ---
        const axes = new THREE.AxesHelper(1000)
        this.scene.add(axes)

        // --- camera --- 
        this.camera.position.set(0, 50, 100)

        this.camera.lookAt(this.scene.position)

        // --- ray tracer --- 


        // --- show board ---
        this.showBoard()
        // this.placeStartPawns()
        document.getElementById("main").append(this.renderer.domElement);
        this.render() // wywołanie metody render
    }

    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    }

    showBoard = () => {
        let x = 1
        let z = 1
        this.szachownica.forEach((row) => {
            row.forEach((field) => {
                const square = new Field(x, z, field)
                this.tiles.push(square)
                this.scene.add(square.getFigure())
                x += 1
            })
            x = 1
            z += 1
        })
    }

    placeStartPawns() {
        let x = 1
        let y = 1
        this.pionki.forEach((row) => {
            row.forEach((field) => {
                if (field === 2) {
                    const blackPawn = new Pawn(x, y, "black")
                    this.pawns.push(blackPawn)
                    this.scene.add(blackPawn.getFigure())
                } else if (field === 1) {
                    const whitePawn = new Pawn(x, y, "white")
                    this.pawns.push(whitePawn)
                    this.scene.add(whitePawn.getFigure())
                }
                x += 1
            })
            x = 1
            y += 1
        })
    }

    rotateCam() {
        // this.camera.position.x = 
        this.camera.position.z = -100
        this.camera.lookAt(this.scene.position)
    }

    click() {
        console.log('robi się click')
        const raycaster = new THREE.Raycaster()
        const mouseVector = new THREE.Vector2()
        $(document).mousedown((e) => {
            mouseVector.x = (e.clientX / $(window).width()) * 2 - 1;
            mouseVector.y = -(e.clientY / $(window).height()) * 2 + 1;
            raycaster.setFromCamera(mouseVector, this.camera);

            const intersects = raycaster.intersectObjects(this.scene.children);

            if (intersects.length > 0) {
                // -------- RUCHY PIONKA ------ --
                if (!this.isPawnClicked) {
                    const tracedPawn = findPawnObject(this.pawns, intersects[0].object)
                    if (tracedPawn && tracedPawn.color === userD.type) { // jeśli faktycznie kliknięto w pionka
                        this.isPawnClicked = true // teraz można klikać pola
                        const moves = tracedPawn.showMoves(this.pionki, []).moveTab
                        this.canHitAgain = tracedPawn.showMoves(this.pionki, []).canHitAgain
                        this.pawnClicked = tracedPawn

                        // const canMoveTiles = [] // znalezione podświetlone bloczki
                        moves.forEach((move) => {
                            const foundTile = findTileObjectByCords(this.tiles, move)
                            if (foundTile) {
                                this.canMoveTiles.push(foundTile) // w te pola można kliknąć w następnym kliknięciu, aby się ruszyć
                            }
                        })
                        // console.log(this.canMoveTiles)
                        this.canMoveTiles.forEach((tile) => {
                            tile.setColor(0xffff00) // podświetlenie możliwości poruszenia się
                        })
                    }
                } else {
                    // ! -- 
                    if (!this.canHitAgain) {
                        this.isPawnClicked = false // teraz można klikać pionki
                    }
                    const clickedFile = this.canMoveTiles.find((tile) => { // szukanie, czy na wybrane pole istnieje możliwość ruchu

                        return tile.figure.uuid == intersects[0].object.uuid
                    })
                    if (clickedFile) {
                        // -------- kliknięto w pionka (pokazywanie ruchów) --------

                        const pawnPrevPosition = { x: this.pawnClicked.x, y: this.pawnClicked.y }
                        this.pawnClicked.moveTo(clickedFile.x, clickedFile.y) // właściwy ruch


                        this.canMoveTiles.forEach((tile) => { // usuwanie podświetlenia innym kolorem
                            tile.setColor(tile.color)
                        })
                        // -- aktualizacja tablicy --
                        const pawnActualPosition = { x: this.pawnClicked.x, y: this.pawnClicked.y }
                        const pawnValue = this.pawnClicked.color === "white" ? 1 : 2 // 1 pionek jest biały, 2 - pionek jest czarny

                        this.pionki[pawnPrevPosition.y - 1][pawnPrevPosition.x - 1] = 0 // na wcześniejszym polu nie ma już pionka
                        this.pionki[pawnActualPosition.y - 1][pawnActualPosition.x - 1] = pawnValue // ustawia na nowym polu czarnego/białego pionka\

                        // ----- sprawdzenie, czy było bicie -----
                        this.wasBeating = helpers.checkIfThereWasBeating(pawnPrevPosition, { x: clickedFile.x, y: clickedFile.y })
                        // console.log(this.wasBeating)
                        if (this.wasBeating) { // usuwanie pionka przeciwnika
                            helpers.removeEnemyPawn(pawnPrevPosition, { x: clickedFile.x, y: clickedFile.y })
                            // if (this.canHitAgain) { // kolejny ruch
                            //     // ! nie pozwalam na zerowanie
                            //     console.log('kolejne bicie')
                            //     let tracedPawn = this.pawnClicked
                            //     const moves = tracedPawn.showMoves(this.pionki, []).moveTab
                            //     moves.forEach((move) => {
                            //         const foundTile = findTileObjectByCords(this.tiles, move)
                            //         if (foundTile) {
                            //             this.canMoveTiles.push(foundTile) // w te pola można kliknąć w następnym kliknięciu, aby się ruszyć
                            //         }
                            //     })
                            //     // console.log(this.canMoveTiles)
                            //     this.canMoveTiles.forEach((tile) => {
                            //         tile.setColor(0xffff00) // podświetlenie możliwości poruszenia się
                            //     })
                            //     return
                            // }
                        }

                        // -- zerowanie danych, by kolejny pionek mógł się ruszać --
                        this.canMoveTiles = [] // tablica ruchów jest pusta
                        this.pawnClicked = null // nie ma pionka klikniętego

                        // ! usuwam onclicka
                        console.log('tutaj')
                        $(document).off("mousedown")
                        informThereWasMove(pawnPrevPosition, pawnActualPosition)

                        // ------- odznaczanie pionka
                    } else {
                        this.canMoveTiles.forEach((tile) => {
                            tile.setColor(tile.color)
                        })
                        this.canMoveTiles = []
                        this.pawnClicked = null
                    }
                }
            }
        })

    }


}

function findPawnObject(pawnsTab, pawnMesh) {
    const foundPawn = pawnsTab.find((pawn) => {
        // console.log(pawn.figure == pawnMesh)
        return pawn.figure == pawnMesh
    })
    return foundPawn
}

function findTileObjectByCords(tilesTab, cords) {

    const { x, y } = cords
    const foundTile = tilesTab.find((tile) => {
        if (tile.x === x + 1 && tile.y === y + 1) {

            return tile
        }
    })
    return foundTile
}

function findTileObjectByClick(tilesTab, cords) {

}