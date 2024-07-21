import { AbstractCommand } from "./AbstractCommand";
import { ClearCommand } from "./ClearCommand";
import { CreateCommand } from "./CreateCommand";
import { ExitCommand } from "./ExitCommand";
import { NoopCommand } from "./NoopCommand";
import { PointCommand } from "./PointCommand";
import { ShowCommand } from "./ShowCommand";

export class CommandFactory {

    private static validInputs = ['exit',
        'create',
        'show',
        'point',
        'clear'];


    static isValid(command: string): boolean {

        return CommandFactory.validInputs.some((validInput) => {
            return command.startsWith(validInput);
        });
    }

    static fromString(command: string): AbstractCommand {
        if (!CommandFactory.isValid(command)) {
            throw new Error('Invalid command');
        }

        const commandName = command.split(' ')[0];

        switch (commandName) {
            case 'create':
                return new CreateCommand();
            case 'show':
                return new ShowCommand();
            case 'point':
                return new PointCommand();
            case 'clear':
                return new ClearCommand();
            case 'exit':
                return new ExitCommand();
        }

        // TODO fix this
        return new NoopCommand();

    }

    static getValidCommandNames(): string[] {
        return CommandFactory.validInputs;
    }
}