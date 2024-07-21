import { AbstractCommand } from "./AbstractCommand";

export class NoopCommand implements AbstractCommand {
    execute() {
        console.log('Noop command');
    }
}