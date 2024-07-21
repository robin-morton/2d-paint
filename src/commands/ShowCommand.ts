import { Canvas } from "../Canvas";
import { AbstractCommand } from "./AbstractCommand";

export class ShowCommand implements AbstractCommand {

    execute(canvas: Canvas) {
        canvas.print();
    }
}