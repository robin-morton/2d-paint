jest.mock("../Canvas");

import { Canvas } from "../Canvas";
import { Point } from "../Point";
import { AreaCommand } from "./AreaCommand";
describe(("AreaCommand"), () => {

    let command: AreaCommand;
    let canvas: Canvas;

    beforeEach(() => {
        command = new AreaCommand();
        canvas = new Canvas();
    });

    describe("execute", () => {
        it("should throw an error when x1 is not a number", () => {
            const x1 = 'a';
            const y1 = '5';
            const x2 = '5';
            const y2 = '5';

            expect(() => command.execute(canvas, x1, y1, x2, y2)).toThrow('Invalid x or y');
        });

        it("should throw an error when y1 is not a number", () => {
            const x1 = '5';
            const y1 = 'a';
            const x2 = '4';
            const y2 = '3';

            expect(() => command.execute(canvas, x1, y1, x2, y2)).toThrow('Invalid x or y');
        });

        it("should throw an error when x2 is not a number", () => {
            const x1 = '1';
            const y1 = '7';
            const x2 = 'a';
            const y2 = '2';

            expect(() => command.execute(canvas, x1, y1, x2, y2)).toThrow('Invalid x or y');
        });

        it("should throw an error when y2 is not a number", () => {
            const x1 = '3';
            const y1 = '3';
            const x2 = '6';
            const y2 = 'a';

            expect(() => command.execute(canvas, x1, y1, x2, y2)).toThrow('Invalid x or y');
        });

        it('should call the area method on the canvas', () => {
            const x1 = 1;
            const y1 = 1;
            const x2 = 3;
            const y2 = 3;
            const pixel = 'A';
            command.execute(canvas, `${x1}`, `${y1}`, `${x2}`, `${y2}`, pixel);
            expect(canvas.area).toHaveBeenCalledWith(new Point(x1, y1), new Point(x2, y2), pixel);
        });
    });

});