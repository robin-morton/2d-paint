import { Canvas } from "../Canvas";
import { Point } from "../Point";
import { AbstractCommand } from "./AbstractCommand";

export class FillCommand implements AbstractCommand {
    execute(canvas: Canvas, x: string, y: string, pixel: string): void {
        const xInt = parseInt(x);
        const yInt = parseInt(y);

        if (!Point.isValid(xInt, yInt)) {
            throw new Error('Invalid x or y, x and y must be numbers greater than 0');
        }

        const point1 = new Point(xInt, yInt);

        canvas.fill(point1, pixel);
    }
}