
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
}