import { Canvas } from "../Canvas";
import { AbstractCommand } from "./AbstractCommand";

export class ClearCommand implements AbstractCommand {
    execute(canvas: Canvas) {
        canvas.clear();
    }
}