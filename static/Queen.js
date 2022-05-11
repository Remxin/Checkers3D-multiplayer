import { Pawn } from './Pawn.js'
export class Queen extends Pawn {
    constructor(x, y, color) {
        super(x, y, color)
        // this.x = x
        // this.y = y
        // this.color = color
        this.materials
        this.init()
    }

    init() {
        const topImage = this.color === "white" ? "https://i.ibb.co/CwRwDTn/white-Queen.png" : "https://i.ibb.co/7bk7ghM/black-Queen.png"

        // const materials = [];
        // this.materials = materials

        // materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load(topImage) }));
        // const imagePath = this.color === "white" ? "https://i.ibb.co/b5mvBR2/image-2022-03-31-193314.png" : "https://i.ibb.co/F017Qqr/image-2022-03-31-193057.png "

        this.geometry = new THREE.CylinderGeometry(3, 3, 4, 32, 2); // width-top, width-bottom, height, segments
        this.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(topImage),
            side: THREE.DoubleSide,
            wireframe: false,
        });

        this.geometry = new THREE.CylinderGeometry(3, 3, 4, 32, 2); // width-top, width-bottom, height, segments
        this.figure = new THREE.Mesh(this.geometry, this.material);

        if (this.color === "white") {
            this.figure.rotation.y = 0.5 * Math.PI
        } else {
            this.figure.rotation.y = 1.5 * Math.PI
        }

        this.figure.position.set((this.x - 4.5) * 10, 0, (this.y - 4.5) * 10)
    }

    showMoves(pawnsTab, mt) {
        const actualX = this.x - 1
        const actualY = this.y - 1
        let iterator = 1


        const moveTab = []
        let canHitAgain = false

        // --- classic moves ---
        if (pawnsTab?.[actualY - iterator]?.[actualX - iterator] === 0) {
            moveTab.push({ x: actualX - iterator, y: actualY - 1 })
        }
        if (pawnsTab?.[actualY - iterator]?.[actualX + iterator] === 0) {
            moveTab.push({ x: actualX + iterator, y: actualY - iterator })
        }

        if (pawnsTab?.[actualY + iterator]?.[actualX - iterator] === 0) {
            moveTab.push({ x: actualX - iterator, y: actualY + iterator })
        }
        if (pawnsTab?.[actualY + iterator]?.[actualX + iterator] === 0) {
            moveTab.push({ x: actualX + iterator, y: actualY + iterator })
        }

        if (this.color === "white") {



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

            iterator = 1




            // ---- hit ----
            if (pawnsTab?.[actualY + iterator]?.[actualX - iterator] === 2) { // jeśli istnieje pionek
                iterator++
                if (pawnsTab?.[actualY + iterator]?.[actualX - iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
                    moveTab.push({ x: actualX - iterator, y: actualY + iterator })
                    iterator++
                    if (pawnsTab?.[actualY + iterator]?.[actualX - iterator] === 2) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
                        iterator++
                        if (pawnsTab?.[actualY + iterator]?.[actualX - iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
                            canHitAgain = true
                            iterator++
                        }
                    }
                    iterator = 3
                    if (pawnsTab?.[actualY + iterator]?.[actualX + iterator] === 2) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
                        iterator++
                        if (pawnsTab?.[actualY + iterator]?.[actualX + iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
                            canHitAgain = true
                            iterator++
                        }
                    }
                }
            }
            iterator = 1
            if (pawnsTab?.[actualY + iterator]?.[actualX + iterator] === 2) {
                iterator++
                if (pawnsTab?.[actualY + iterator]?.[actualX + iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na prawo
                    moveTab.push({ x: actualX + iterator, y: actualY + iterator })
                    iterator++
                    // ----- sprawdzam możliwość dalszego bicia -----
                    if (pawnsTab?.[actualY + iterator]?.[actualX + iterator] === 2) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na prawo
                        iterator++
                        if (pawnsTab?.[actualY + iterator]?.[actualX + iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na prawo
                            canHitAgain = true
                            iterator++
                        }
                    }
                    iterator = 3
                    if (pawnsTab?.[actualY + iterator]?.[actualX - iterator] === 2) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
                        iterator++
                        if (pawnsTab?.[actualY + iterator]?.[actualX - iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
                            canHitAgain = true
                            iterator++
                        }
                    }
                }


            }
        } else {

            // ----- hit -----
            if (pawnsTab?.[actualY - iterator]?.[actualX - iterator] === 1) { // jeśli istnieje pionek
                iterator++
                if (pawnsTab?.[actualY - iterator]?.[actualX - iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na lewo
                    moveTab.push({ x: actualX - iterator, y: actualY - iterator })
                    iterator++
                    if (pawnsTab?.[actualY - iterator]?.[actualX - iterator] === 1) {
                        iterator++
                        if (pawnsTab?.[actualY - iterator]?.[actualX - iterator] === 0) {
                            canHitAgain = true
                            iterator++
                        }
                    }
                }
            }
            iterator = 1
            if (pawnsTab?.[actualY - iterator]?.[actualX + iterator] === 1) {
                iterator++
                if (pawnsTab?.[actualY - iterator]?.[actualX + iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na prawo
                    moveTab.push({ x: actualX + iterator, y: actualY - iterator })
                    iterator++
                    if (pawnsTab?.[actualY - iterator]?.[actualX + iterator] === 1) {
                        iterator++
                        if (pawnsTab?.[actualY - iterator]?.[actualX + iterator] === 0) { // jeśli pole za nim na ukos jest puste i dozwolone jest bicie na prawo
                            canHitAgain = true
                            iterator++
                        }
                    }
                }
            }

            iterator = 1




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
        }
        console.log(moveTab, canHitAgain)
        return { moveTab, canHitAgain }

    }
}