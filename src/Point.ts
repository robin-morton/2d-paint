export class Point {
    constructor(public x: number, public y: number) {
    }

    /**
     * Returns true if the x and y coordinates are 
     * a valid Cartesian point. False otherwise.
     * 
     * This is designed to be used to validate 
     * Cartesian points to be used in a canvas to 
     * be drawn by a computer.
     * 
     * i.e. the top left corner of the canvas is (1, 1) 
     * and the bottom right corner is (width, height)
     * 
     * This function will not validate if a point 
     * is within a canvas' boundaries.
     * 
     * @param x {number}
     * @param y {number}
     * @returns {boolean}
     */
    static isValid(x: number, y: number): boolean {
        return x >= 1 && y >= 1;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}