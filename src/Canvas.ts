
export class Canvas {

    private height: number;
    private width: number;
    private canvas: string[][] = []

    static EMPTY_PIXEL = 'O';

    constructor() {
        this.height = 0;
        this.width = 0;
    }

    private isAlreadyCreated() {
        return this.height !== 0 && this.width !== 0;
    }

    private createBlankCanvas() {
        this.canvas = [];

        const rows = Array(this.width).fill(Canvas.EMPTY_PIXEL);

        for (let i = 0; i < this.height; i++) {
            this.canvas.push([...rows]);
        }

    }
    private isWithinCanvas(point: Point): boolean {
        return point.getX() >= 1 && point.getX() <= this.width && point.getY() >= 1 && point.getY() <= this.height;
    }

    /**
     * Creates a new canvas with the given width and height which will be
     * filled with 'O' characters to represent empty pixels.
     * 
     * If a canvas has already been created, it will not create a new 
     * canvas.
     * 
     * If the width or height is less than or equal to 0, it will not 
     * create a canvas.
     * 
     * @param width {number} The width of the canvas
     * @param height {number} The height of the canvas
     */
    create(width: number, height: number) {

        if (this.isAlreadyCreated()) {
            console.log('Canvas has already been created');
        }

        console.log('Creating a new canvas with width:', width, 'and height:', height);
        if (width <= 0 || height <= 0) {
            console.log('Width and height must be greater than 0');
            return;
        }

        this.height = height;
        this.width = width;

        this.createBlankCanvas();
    }

    /**
     * Clears the canvas by filling it with 'O' characters.
     * The original width and height will be preserved.
     */
    clear(): void {
        if (!this.isAlreadyCreated()) {
            console.log('Canvas is not created yet, please execute \'create\' to create a canvas');
            return;
        }

        this.createBlankCanvas();
    }

    /**
     * Prints the canvas to the console.
     */
    print(): void {
        if (!this.isAlreadyCreated()) {
            console.log('Canvas is not created yet, please execute \'create\' to create a canvas');
            return;
        }
        console.log('Printing canvas');
        const stringCanvas = this.canvas.map((row) => {
            return row.join(' ');
        });

        console.log(stringCanvas.join('\n'));
    }

    /**
     * Sets a point on the canvas to the given pixel. If a pixel is not
     * provided, a random pixel will be generated.
     * 
     * If the canvas has not been created, it will not set a point.
     * 
     * If the point is out of the canvas, it will not set a point.
     * 
     * @param point {Point}
     * @param pixel {string | undefined}
     */
    setPoint(point: Point, pixel: string | undefined = this.randomPixel()): void {
        if (!this.isAlreadyCreated()) {
            console.log('Canvas is not created yet, please execute \'create\' to create a canvas');
            return;
        }

        if (!this.isWithinCanvas(point)) {
            console.log(`Point is out of canvas: x:${point.getX()}, y:${point.getY()}`);
            console.log(`Please provide an X value between 1 and ${this.width} and a Y value between 1 and ${this.height}`);
            return;
        }

        this.canvas[point.getY() - 1][point.getX() - 1] = pixel;
    }

    /**
     * Draws a line from point1 to point2 on the canvas. If a pixel is not
     * provided, a random pixel will be generated.
     * 
     * If the canvas has not been created, it will not draw a line.
     * 
     * If a point of the line is outside the canvas, it will not draw a line.
     * 
     * @param point1 {Point} starting point of the line
     * @param point2 {Point} ending point of the line
     * @param pixel {string?} the pixel to draw the line with
     */
    drawLine(point1: Point, point2: Point, pixel: string | undefined = this.randomPixel()): void {
        if (!this.isAlreadyCreated()) {
            console.log('Canvas is not created yet, please execute \'create\' to create a canvas');
            return;
        }

        if (!this.isWithinCanvas(point1) || !this.isWithinCanvas(point2)) {
            console.log('A point of the line is outside the canvas');
            console.log(`Please provide an X value between 1 and ${this.width} and a Y value between 1 and ${this.height}`);
            return;
        }

        const xDiff = point2.getX() - point1.getX();
        const yDiff = point2.getY() - point1.getY();

        const length = Math.round(Math.sqrt(xDiff ** 2 + yDiff ** 2));

        for (let i = 0; i <= length; i++) {
            const x = Math.round(point1.getX() + (xDiff / length) * i);
            const y = Math.round(point1.getY() + (yDiff / length) * i);

            this.setPoint(new Point(x, y), pixel);
        }
    }

    fill(point: Point, pixel = this.randomPixel()): void {
        if (!this.isAlreadyCreated()) {
            console.log('Canvas is not created yet, please execute \'create\' to create a canvas');
            return;
        }

        if (!this.isWithinCanvas(point)) {
            console.log('Point is out of canvas; x:', point.getX(), 'y:', point.getY());
            console.log('Please provide an X value between 1 and', this.width, 'and a Y value between 1 and', this.height);
            return;
        }

        this.canvas[point.getY() - 1][point.getX() - 1] = pixel;
    }

}