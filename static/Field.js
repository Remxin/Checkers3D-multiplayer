export class Field {
    constructor(x, y, fieldValue) {
        this.x = x
        this.y = y
        this.fieldValue = fieldValue
        this.init()
    }
    init() {
        const imagePath = this.fieldValue === 0 ? "https://i.ibb.co/rx96D0h/image-2022-03-31-193603.png" : "https://i.ibb.co/Ph69mQZ/image-2022-03-31-204238.png"
        this.color = this.fieldValue === 0 ? 0xffffff : 0x000000
        this.geometry = new THREE.BoxGeometry(10, 2, 10);
        this.mesh = new THREE.MeshBasicMaterial({
            color: this.color,
            map: new THREE.TextureLoader().load(imagePath),
            side: THREE.DoubleSide,
            wireframe: false,
        });
        this.figure = new THREE.Mesh(this.geometry, this.mesh);
        // ---- position cords calculation ---- 
        this.figure.position.set((this.x - 4.5) * 10, 0, (this.y - 4.5) * 10)
    }
    getFigure() {
        return this.figure
    }

    setColor(color) {
        this.figure.material.color.setHex(color)
    }
}