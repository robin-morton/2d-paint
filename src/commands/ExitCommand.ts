import { AbstractCommand } from "./AbstractCommand";

export class ExitCommand implements AbstractCommand {
    execute() {
        console.log('Exiting the program. Thank you!');
        process.exit(0);
    }
}