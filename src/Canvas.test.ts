import { Canvas } from "./Canvas";
describe("Canvas", () => {

    let canvas: Canvas;

    beforeEach(() => {
        canvas = new Canvas();
    });
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterAll(() => {
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
});