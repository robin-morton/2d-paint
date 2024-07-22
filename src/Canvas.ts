
import { bgBlue, bgCyan, bgGreen, bgMagenta, bgRed, bgWhite, bgYellow, Format } from 'cli-color';
import { Point } from './Point';

export class Canvas {

    private height: number;
    private width: number;
    private canvas: string[][] = []
    private pixelColors: { [key: string]: Format } = {};

    static EMPTY_PIXEL = 'O';

    constructor() {
        this.height = 0;
        this.width = 0;
    }

    private isAlreadyCreated() {
        return this.height !== 0 && this.width !== 0;
    }

    private createBlankCanvas() {
        this.pixelColors = {};
        this.canvas = [];

        const rows = Array(this.width).fill(Canvas.EMPTY_PIXEL);

        for (let i = 0; i < this.height; i++) {
            this.canvas.push([...rows]);
        }

    }
    private isWithinCanvas(point: Point): boolean {
        return point.getX() >= 1 && point.getX() <= this.width && point.getY() >= 1 && point.getY() <= this.height;
    }

    private randomPixel(): string {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return possible.charAt(Math.floor(Math.random() * possible.length));
    }

    private applyColor(pixel: string): string {
        if (!this.pixelColors[pixel]) {
            const color = this.randomColor();
            this.pixelColors[pixel] = color;
        }
        return this.pixelColors[pixel](pixel);
    }

    private randomColor(): Format {

        const colors: Format[] = [bgBlue, bgGreen, bgMagenta, bgRed, bgYellow, bgCyan, bgWhite];

        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return randomColor;
    }

    private getPixel(point: Point): string {
        return this.canvas[point.getY() - 1][point.getX() - 1];
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
     * Draws a rectangle on the canvas with one corner at point1
     * and point2 being the corner opposite point1. If a pixel is not provided, a
     * random pixel will be generated.
     * 
     * If the canvas has not been created, it will not draw a rectangle.
     * 
     * If a point of the rectangle is outside the canvas, it will not draw a
     * rectangle.
     * 
     * @param point1 {Point} top left corner of the rectangle
     * @param point2 {Point} bottom right corner of the rectangle
     * @param pixel 
     */
    area(point1: Point, point2: Point, pixel = this.randomPixel()): void {
        if (!this.isAlreadyCreated()) {
            console.log('Canvas is not created yet, please execute \'create\' to create a canvas');
            return;
        }

        if (!this.isWithinCanvas(point1) || !this.isWithinCanvas(point2)) {
            console.log('A point of the area is outside the canvas');
            console.log(`Please provide an X value between 1 and ${this.width} and a Y value between 1 and ${this.height}`);
            return;
        }

        console.log('Filling area with pixel:', pixel);

        const smallestX = Math.min(point1.getX(), point2.getX());
        const largestX = Math.max(point1.getX(), point2.getX());
        const largestY = Math.max(point1.getY(), point2.getY());
        const smallestY = Math.min(point1.getY(), point2.getY());

        for (let x = smallestX; x <= largestX; x++) {
            for (let y = smallestY; y <= largestY; y++) {
                this.setPoint(new Point(x, y), pixel);
            }
        }
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

        if (pixel && pixel.length > 1) {
            console.log('Pixel must be a single character');
            return;
        }

        this.canvas[point.getY() - 1][point.getX() - 1] = this.applyColor(pixel);;
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

    /**
     * Fills an area of the canvas with the given pixel. If a pixel is not
     * provided, a random pixel will be generated.
     * Any pixel which is the same color as the starting point will be
     * replaced with the new pixel. All adjacent pixels with the same value
     * as the starting point will also be replaced.
     * 
     * i.e. all pixels which are connected to the starting point will be
     * replaced within either the bounds of the canvas or a bounding line.
     * 
     * The fill does not fill diagonally adjacent pixels.
     * 
     * If the canvas has not been created, it will not fill an area.
     * 
     * If the point is out of the canvas, it will not fill an area.
     * 
     * @param point {Point}
     * @param pixel {string?}
     */
    fill(point: Point, pixel: string = this.randomPixel()): void {
        if (!this.isAlreadyCreated()) {
            console.log('Canvas is not created yet, please execute \'create\' to create a canvas');
            return;
        }

        if (!this.isWithinCanvas(point)) {
            console.log(`Point is out of canvas; x:${point.getX()}, y:${point.getY()}`);
            console.log(`Please provide an X value between 1 and ${this.width} and a Y value between 1 and ${this.height}`);
            return;
        }

        console.log('Filling area with pixel:', pixel);
        const startingPixel = this.getPixel(point);

        const stack: Point[] = [point];

        // If the point is out of the canvas or the pixel is not the same as the starting pixel, skip it
        const shouldSkip = (point: Point): boolean => {
            return !this.isWithinCanvas(point) || this.getPixel(point) !== startingPixel;
        }

        while (stack.length > 0) {
            const currentPoint = stack.pop();

            if (!currentPoint) {
                break;
            }

            if (shouldSkip(currentPoint)) {
                continue;
            }

            this.setPoint(currentPoint, pixel);

            stack.push(new Point(currentPoint.getX() + 1, currentPoint.getY()));
            stack.push(new Point(currentPoint.getX() - 1, currentPoint.getY()));
            stack.push(new Point(currentPoint.getX(), currentPoint.getY() + 1));
            stack.push(new Point(currentPoint.getX(), currentPoint.getY() - 1));
        }
    }
}