import { Canvas } from "./Canvas";
import { Point } from "./Point";
import { toMatchCanvas } from "../tst/utils/jestMatcher";
describe("Canvas", () => {

    let canvas: Canvas;

    beforeEach(() => {
        canvas = new Canvas();
    });
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("create", () => {
        it("should create a new canvas with the given width and height", () => {
            const width = 3;
            const height = 5;
            const expectedCanvas =
                'O O O' + '\n' +
                'O O O' + '\n' +
                'O O O' + '\n' +
                'O O O' + '\n' +
                'O O O';

            canvas.create(width, height);
            canvas.print();

            expect(console.log).toHaveBeenCalledWith(expectedCanvas);
        });

        it('should not create a canvas with negative width and height', () => {
            const width = -3;
            const height = -5;

            canvas.create(width, height);

            expect(console.log).toHaveBeenCalledWith('Width and height must be greater than 0');
        });

        it('should not create a canvas with width 0', () => {
            const width = 0;
            const height = 5;

            canvas.create(width, height);

            expect(console.log).toHaveBeenCalledWith('Width and height must be greater than 0');
        });

        it('should not create a new canvas when one has already been created', () => {
            const width = 3;
            const height = 5;

            canvas.create(width, height);
            canvas.create(width, height);

            expect(console.log).toHaveBeenCalledWith('Canvas has already been created');
        });
    });

    describe('setPoint', () => {
        it('should set a point on the canvas', () => {
            const width = 3;
            const height = 5;
            const x = 2;
            const y = 3;
            const pixel = 'X';
            const expectedCanvas =
                'O O O' + '\n' +
                'O O O' + '\n' +
                `O ${pixel} O` + '\n' +
                'O O O' + '\n' +
                'O O O';

            canvas.create(width, height);
            canvas.setPoint(new Point(x, y), pixel);
            toMatchCanvas(canvas, expectedCanvas);
        });

        it('should not set a point on the canvas when the canvas has not been created', () => {
            const x = 2;
            const y = 3;
            const pixel = 'Y';

            canvas.setPoint(new Point(x, y), pixel);

            expect(console.log).toHaveBeenNthCalledWith(1, 'Canvas is not created yet, please execute \'create\' to create a canvas');
        });

        it('should not set a point when the pixel value is not a single character', () => {
            const width = 3;
            const height = 5;
            const x = 2;
            const y = 3;
            const pixel = 'XX';

            canvas.create(width, height);
            canvas.setPoint(new Point(x, y), pixel);

            expect(console.log).toHaveBeenNthCalledWith(2, 'Pixel must be a single character');
        });

        it('should not set a point on the canvas when the point is out of canvas', () => {
            const width = 3;
            const height = 5;
            const x = 6;
            const y = 3;
            const pixel = 'Z';

            canvas.create(width, height);
            canvas.setPoint(new Point(x, y), pixel);

            expect(console.log).toHaveBeenNthCalledWith(2, `Point is out of canvas: x:${x}, y:${y}`);
            expect(console.log).toHaveBeenNthCalledWith(3, `Please provide an X value between 1 and ${width} and a Y value between 1 and ${height}`);
        });


    });

    describe('clear', () => {
        it('should log a message when the canvas has not been created', () => {
            canvas.clear();
            expect(console.log).toHaveBeenCalledWith('Canvas is not created yet, please execute \'create\' to create a canvas');
        });

        it('should clear the canvas', () => {

            const width = 3;
            const height = 5;

            const blankCanvas =
                'O O O' + '\n' +
                'O O O' + '\n' +
                'O O O' + '\n' +
                'O O O' + '\n' +
                'O O O';

            canvas.create(width, height);
            canvas.print();
            expect(console.log).toHaveBeenLastCalledWith(blankCanvas);

            canvas.setPoint(new Point(2, 3), 'X');

            const expectedCanvas =
                'O O O' + '\n' +
                'O O O' + '\n' +
                `O X O` + '\n' +
                'O O O' + '\n' +
                'O O O';

            toMatchCanvas(canvas, expectedCanvas);

            canvas.clear();
            toMatchCanvas(canvas, blankCanvas);
        });
    });

    describe('line', () => {

        it('should not draw a line when the canvas has not been created', () => {
            canvas.drawLine(new Point(1, 1), new Point(3, 1), 'X');
            expect(console.log).toHaveBeenLastCalledWith('Canvas is not created yet, please execute \'create\' to create a canvas');
        });

        it('should not draw a line when a point is outside the canvas', () => {
            const width = 3;
            const height = 3;

            canvas.create(width, height);
            canvas.drawLine(new Point(1, 1), new Point(width + 1, height + 2), 'X');

            expect(console.log).toHaveBeenNthCalledWith(2, 'A point of the line is outside the canvas');
            expect(console.log).toHaveBeenNthCalledWith(3, 'Please provide an X value between 1 and 3 and a Y value between 1 and 3');
        });
        it('should draw a horizontal line on the canvas', () => {

            const expectedCanvas =
                'X X X' + '\n' +
                'O O O' + '\n' +
                'O O O';

            canvas.create(3, 3);
            canvas.drawLine(new Point(1, 1), new Point(3, 1), 'X');

            toMatchCanvas(canvas, expectedCanvas);
        });

        it('should draw a vertical line on the canvas', () => {
            const expectedCanvas =
                'X O O' + '\n' +
                'X O O' + '\n' +
                'X O O';

            canvas.create(3, 3);
            canvas.drawLine(new Point(1, 1), new Point(1, 3), 'X');

            toMatchCanvas(canvas, expectedCanvas);
        });

        it('should draw a diagonal line on the canvas', () => {
            const expectedCanvas =
                'X O O' + '\n' +
                'O X O' + '\n' +
                'O O X';

            canvas.create(3, 3);

            canvas.drawLine(new Point(1, 1), new Point(3, 3), 'X');
            toMatchCanvas(canvas, expectedCanvas);
        });

        it('should draw a diagonal line when the points are swapped', () => {
            const expectedCanvas =
                'X O O' + '\n' +
                'O X O' + '\n' +
                'O O X';

            canvas.create(3, 3);

            canvas.drawLine(new Point(3, 3), new Point(1, 1), 'X');
            toMatchCanvas(canvas, expectedCanvas);
        });

    });

    describe('area', () => {

        it('should not draw a rectangle when the canvas has not been created', () => {
            canvas.area(new Point(1, 1), new Point(3, 3), 'X');
            expect(console.log).toHaveBeenLastCalledWith('Canvas is not created yet, please execute \'create\' to create a canvas');
        });

        it('should not draw a rectangle when a point is outside the canvas', () => {
            const width = 3;
            const height = 3;

            canvas.create(width, height);
            canvas.area(new Point(1, 1), new Point(width + 1, height + 2), 'X');

            expect(console.log).toHaveBeenNthCalledWith(2, 'A point of the area is outside the canvas');
            expect(console.log).toHaveBeenNthCalledWith(3, 'Please provide an X value between 1 and 3 and a Y value between 1 and 3');
        });

        it('should draw a rectangle on the canvas', () => {
            const expectedCanvas =
                'X X O' + '\n' +
                'X X O' + '\n' +
                'X X O';

            canvas.create(3, 3);
            canvas.area(new Point(1, 1), new Point(2, 3), 'X');
            toMatchCanvas(canvas, expectedCanvas);
        });

        it('should draw a rectangle on the canvas when the points are swapped', () => {

            const expectedCanvas =
                'X X X' + '\n' +
                'X X X' + '\n' +
                'O O O';

            canvas.create(3, 3);
            canvas.area(new Point(3, 2), new Point(1, 1), 'X');

            toMatchCanvas(canvas, expectedCanvas);

        });
    });

    describe('fill', () => {

        it('should not fill the area when the canvas has not been created', () => {
            canvas.fill(new Point(1, 1), 'X');
            expect(console.log).toHaveBeenLastCalledWith('Canvas is not created yet, please execute \'create\' to create a canvas');
        });

        it('should not fill the area when a point is outside the canvas', () => {
            const width = 3;
            const height = 3;

            canvas.create(width, height);
            const fillPoint = new Point(1, height + 1);
            canvas.fill(fillPoint, 'X');

            expect(console.log).toHaveBeenNthCalledWith(2, `Point is out of canvas; x:${fillPoint.getX()}, y:${fillPoint.getY()}`);
            expect(console.log).toHaveBeenNthCalledWith(3, `Please provide an X value between 1 and ${width} and a Y value between 1 and ${height}`);
        });

        it('should fill the area on the canvas', () => {
            const expectedCanvas =
                'X Y O' + '\n' +
                'X X Y' + '\n' +
                'X X X';

            canvas.create(3, 3);
            canvas.drawLine(new Point(2, 1), new Point(3, 2), 'Y');
            canvas.fill(new Point(1, 1), 'X');

            toMatchCanvas(canvas, expectedCanvas);
        });
    });
});