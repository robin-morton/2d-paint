import { Canvas } from "../Canvas";
import { Point } from "../Point";
import { AbstractCommand } from "./AbstractCommand";

export class PointCommand implements AbstractCommand {

    private isValidCoordinate(coordinate: string): boolean {
        const num = parseInt(coordinate);
        return !isNaN(num) && num >= 1;
    }

    execute(canvas: Canvas, x: string, y: string, pixel: string): void {
        const x1 = parseInt(x);
        const y1 = parseInt(y);

        if (!this.isValidCoordinate(x) || !this.isValidCoordinate(y)) {
            throw new Error('Invalid x or y, x and y must be numbers greater than 0');
        }

        canvas.setPoint(new Point(x1, y1), pixel);
    }
}