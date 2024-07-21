import { Canvas } from "../Canvas";
import { AbstractCommand } from "./AbstractCommand";

export class CreateCommand implements AbstractCommand {

    execute(canvas: Canvas, height: string, width: string) {

        const h = parseInt(height);
        const w = parseInt(width);

        if (isNaN(h) || isNaN(w)) {
            throw new Error('Invalid height or width, please provide a number');
        }

        canvas.create(h, w);
    }
}