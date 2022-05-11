export class Pawn {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
        this.init()
    }

    init() {
        const imagePath = this.color === "white" ? "https://i.ibb.co/b5mvBR2/image-2022-03-31-193314.png" : "https://i.ibb.co/F017Qqr/image-2022-03-31-193057.png "

        this.geometry = new THREE.CylinderGeometry(3, 3, 4, 32, 2); // width-top, width-bottom, height, segments
        this.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(imagePath),
            side: THREE.DoubleSide,
            wireframe: false,
        });
        this.figure = new THREE.Mesh(this.geometry, this.material);

        this.figure.position.set((this.x - 4.5) * 10, 0, (this.y - 4.5) * 10)
    }

    getFigure() {
        return this.figure
    }

    showMoves(pawnsTab, moveTab) {

        const actualX = this.x - 1
        const actualY = this.y - 1
        // console.log(actualX, actualY)
        let iterator = 1

        if (this.color === "white") {
            const moveTab = []
            let canHitAgain = false

            // --- classic moves ---
            if (pawnsTab?.[actualY - 1]?.[actualX - 1] === 0) {
                moveTab.push({ x: actualX - 1, y: actualY - 1 })
            }
            if (pawnsTab?.[actualY - 1]?.[actualX + 1] === 0) {
                moveTab.push({ x: actualX + 1, y: actualY - 1 })
            }


            // --- attacks ---


            // !---- Stare bicie ----
            // while (!allMoves && iterator < 8) {
            // FIXME: jest bug przy biciu 2 pionków w różnych kierunkach
            // FIXME: bug przy podwójnym biciu drugiego pionka
            // FIXME: przy dużych biciach, pionek staje się niewrażliwy na bicia kolejne xD

            // let wasMove = false // czy wystąpił ruch w tej turze

            //     if (pawnsTab?.[actualY - iterator]?.[actualX - iterator] === 2) { // jeśli istnieje pionek
            //         if (pawnsTab?.[actualY - iterator - 1]?.[actualX - iterator - 1] === 0 && left) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
            //             console.log(actualY - iterator - 1, actualX - iterator - 1)
            //             moveTab.push({ x: actualX - iterator - 1, y: actualY - iterator - 1 })
            //             wasMove = true
            //         } else {
            //             left = false // nie sprawdzaj dalej bicia na lewo
            //         }
            //     }
            //     if (pawnsTab?.[actualY - iterator]?.[actualX + iterator] === 2) {
            //         if (pawnsTab?.[actualY - iterator - 1]?.[actualX + iterator + 1] === 0 && right) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na prawo
            //             console.log(actualY - iterator - 1, actualX + iterator + 1)
            //             moveTab.push({ x: actualX + iterator + 1, y: actualY - iterator - 1 })
            //             wasMove = true
            //         } else {
            //             right = false // nie sprawdzaj dalej bicia na prawo
            //         }
            //     }

            //     iterator++
            //     if (nextIteratorValid) {
            //         wasMove ? nextIteratorValid = false : null // gdy w następnej turze nie ma bicia, to się nie przejmuj (bo może być jeszcze w kolejnej, gdyż w tej wystąpiło)
            //         allMoves = !wasMove // jeśli nie dodano żadnego nowego ruchu, to przerwij pętle
            //     }
            // }
            // !-----

            // ----- hit -----
            if (pawnsTab?.[actualY - iterator]?.[actualX - iterator] === 2) { // jeśli istnieje pionek
                iterator++
                if (pawnsTab?.[actualY - iterator]?.[actualX - iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
                    moveTab.push({ x: actualX - iterator, y: actualY - iterator })
                    iterator++
                    if (pawnsTab?.[actualY - iterator]?.[actualX - iterator] === 2) {
                        iterator++
                        if (pawnsTab?.[actualY - iterator]?.[actualX - iterator] === 0) {
                            canHitAgain = true
                            iterator++
                        }
                    }
                }
            }
            iterator = 1
            if (pawnsTab?.[actualY - iterator]?.[actualX + iterator] === 2) {
                iterator++
                if (pawnsTab?.[actualY - iterator]?.[actualX + iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na prawo
                    moveTab.push({ x: actualX + iterator, y: actualY - iterator })
                    iterator++
                    if (pawnsTab?.[actualY - iterator]?.[actualX + iterator] === 2) {
                        iterator++
                        if (pawnsTab?.[actualY - iterator]?.[actualX + iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na prawo
                            canHitAgain = true
                            iterator++
                        }
                    }
                }
            }

            return { moveTab, canHitAgain }
        } else if (this.color === "black") {
            const moveTab = []
            let canHitAgain = false
            // --- classic moves (opposite to whites) ---
            if (pawnsTab?.[actualY + iterator]?.[actualX - iterator] === 0) {
                moveTab.push({ x: actualX - iterator, y: actualY + iterator })
            }
            if (pawnsTab?.[actualY + iterator]?.[actualX + iterator] === 0) {
                moveTab.push({ x: actualX + iterator, y: actualY + iterator })
            }


            // ---- hit ----
            if (pawnsTab?.[actualY + iterator]?.[actualX - iterator] === 1) { // jeśli istnieje pionek
                iterator++
                if (pawnsTab?.[actualY + iterator]?.[actualX - iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
                    moveTab.push({ x: actualX - iterator, y: actualY + iterator })
                    iterator++
                    if (pawnsTab?.[actualY + iterator]?.[actualX - iterator] === 1) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
                        iterator++
                        if (pawnsTab?.[actualY + iterator]?.[actualX - iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
                            canHitAgain = true
                            iterator++
                        }
                    }
                    iterator = 3
                    if (pawnsTab?.[actualY + iterator]?.[actualX + iterator] === 1) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
                        iterator++
                        if (pawnsTab?.[actualY + iterator]?.[actualX + iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
                            canHitAgain = true
                            iterator++
                        }
                    }
                }
            }
            iterator = 1
            if (pawnsTab?.[actualY + iterator]?.[actualX + iterator] === 1) {
                iterator++
                if (pawnsTab?.[actualY + iterator]?.[actualX + iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na prawo
                    moveTab.push({ x: actualX + iterator, y: actualY + iterator })
                    iterator++
                    // ----- sprawdzam możliwość dalszego bicia -----
                    if (pawnsTab?.[actualY + iterator]?.[actualX + iterator] === 1) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na prawo
                        iterator++
                        if (pawnsTab?.[actualY + iterator]?.[actualX + iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na prawo
                            canHitAgain = true
                            iterator++
                        }
                    }
                    iterator = 3
                    if (pawnsTab?.[actualY + iterator]?.[actualX - iterator] === 1) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
                        iterator++
                        if (pawnsTab?.[actualY + iterator]?.[actualX - iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
                            canHitAgain = true
                            iterator++
                        }
                    }
                }
            }

            return { moveTab, canHitAgain }
        }
    }

    moveTo(x, y) {
        this.x = x
        this.y = y
        this.figure.position.set((this.x - 4.5) * 10, 0, (this.y - 4.5) * 10)
    }

    removeFromBoard(scene) {
        scene.remove(this.figure)

    }
}