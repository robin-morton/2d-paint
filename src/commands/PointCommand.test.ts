jest.mock("../Canvas");

import { Canvas } from "../Canvas";
import { PointCommand } from "./PointCommand";
describe("PointCommand", () => {

    let command: PointCommand;
    let canvas: Canvas;

    beforeEach(() => {
        command = new PointCommand();
        canvas = new Canvas();
    });

    describe("execute", () => {
        it('should throw an error when x is not a number', () => {
            const x = 'a';
            const y = '5';
            const pixel = 'A';

            expect(() => command.execute(canvas, x, y, pixel)).toThrow('Invalid x or y');
        });

        it('should throw an error when y is not a number', () => {
            const x = '5';
            const y = 'a';
            const pixel = 'B';

            expect(() => command.execute(canvas, x, y, pixel)).toThrow('Invalid x or y');
        });

        it('should throw an error when x is less than 1', () => {
            const x = '-1';
            const y = '5';
            const pixel = 'C';

            expect(() => command.execute(canvas, x, y, pixel)).toThrow('Invalid x or y');
        });

        it('should throw an error when y is less than 1', () => {
            const x = '6';
            const y = '0';
            const pixel = 'D';

            expect(() => command.execute(canvas, x, y, pixel)).toThrow('Invalid x or y');
        });

        it('should set the point on the canvas', () => {
            const x = '3';
            const y = '5';
            const pixel = 'X';

            command.execute(canvas, x, y, pixel);

            expect(canvas.setPoint).toHaveBeenCalledWith({ x: 3, y: 5 }, pixel);
        });
    });
});