import { game } from './Main.js'
class Helpers {
    checkIfThereWasBeating(prevPos, actualPos) {
        const difference = Math.abs(actualPos.y - prevPos.y)
        if (difference === 1) {
            return false
        }
        return true
    }

    removeEnemyPawn(prevPos, actualPos) { // usuń pionka przeciwnika po biciu
        return new Promise((resolve, reject) => {
            const enemyPos = { x: (prevPos.x + actualPos.x) / 2, y: (prevPos.y + actualPos.y) / 2 }

            const enemyPawn = game.pawns.find((pawn) => {
                return pawn.x === enemyPos.x && pawn.y === enemyPos.y
            })
            console.log(enemyPawn)
            // ---- usunięcie ze sceny ----
            enemyPawn.removeFromBoard(game.scene)


            // ---- usunięcie z tablicy ----
            game.pionki[enemyPos.y - 1][enemyPos.x - 1] = 0
            // console.log(game.pionki)
            resolve()
        })

    }

}

export const helpers = new Helpers