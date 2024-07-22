jest.mock('../Canvas');
import { Canvas } from '../Canvas';
import { Point } from '../Point';
import { LineCommand } from './LineCommand';

describe("LineCommand", () => {

    let command: LineCommand;
    let canvas: Canvas;

    beforeEach(() => {
        command = new LineCommand();
        canvas = new Canvas();
    });
    describe("execute", () => {
        it("should throw an error when the supplied x1 is not a number", () => {
            const x1 = 'a';
            const y1 = '5';
            const x2 = '5';
            const y2 = '5';
            expect(() => command.execute(canvas, x1, y1, x2, y2)).toThrow('Invalid x or y');
        });

        it("should throw an error when the supplied y1 is not a number", () => {
            const x1 = '5';
            const y1 = 'a';
            const x2 = '4';
            const y2 = '3';
            expect(() => command.execute(canvas, x1, y1, x2, y2)).toThrow('Invalid x or y');
        });

        it("should throw an error when the supplied x2 is not a number", () => {
            const x1 = '1';
            const y1 = '7';
            const x2 = 'a';
            const y2 = '2';
            expect(() => command.execute(canvas, x1, y1, x2, y2)).toThrow('Invalid x or y');
        });

        it("should throw an error when the supplied y2 is not a number", () => {
            const x1 = '3';
            const y1 = '3';
            const x2 = '6';
            const y2 = 'a';
            expect(() => command.execute(canvas, x1, y1, x2, y2)).toThrow('Invalid x or y');
        });

        it("should draw a line on the canvas", () => {
            const x1 = 2;
            const y1 = 3;
            const x2 = 2;
            const y2 = 5;
            const pixel = 'T'
            command.execute(canvas, `${x1}`, `${y1}`, `${x2}`, `${y2}`, pixel);
            expect(canvas.drawLine).toHaveBeenCalledWith(new Point(x1, y1), new Point(x2, y2), pixel);
        });
    });

});