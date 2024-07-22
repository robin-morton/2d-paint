import { Canvas } from "../Canvas";
import { Point } from "../Point";

export class AreaCommand {
    execute(canvas: Canvas, x1: string, y1: string, x2: string, y2: string, pixel?: string): void {
        const x1Int = parseInt(x1);
        const y1Int = parseInt(y1);
        const x2Int = parseInt(x2);
        const y2Int = parseInt(y2);

        if (!Point.isValid(x1Int, y1Int) || !Point.isValid(x2Int, y2Int)) {
            throw new Error('Invalid x or y, x and y must be numbers greater than 0');
        }

        const point1 = new Point(x1Int, y1Int);
        const point2 = new Point(x2Int, y2Int);

        canvas.area(point1, point2, pixel);
    }
}