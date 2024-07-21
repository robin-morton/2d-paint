import { Canvas } from "./Canvas";
import { Point } from "./Point";
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
            canvas.print();

            expect(console.log).toHaveBeenNthCalledWith(3, expectedCanvas);
        });

        it('should not set a point on the canvas when the canvas has not been created', () => {
            const x = 2;
            const y = 3;
            const pixel = 'Y';

            canvas.setPoint(new Point(x, y), pixel);

            expect(console.log).toHaveBeenNthCalledWith(1, 'Canvas is not created yet, please execute \'create\' to create a canvas');
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
});