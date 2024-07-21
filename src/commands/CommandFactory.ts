import { AbstractCommand } from "./AbstractCommand";
import { ExitCommand } from "./ExitCommand";
import { NoopCommand } from "./NoopCommand";

export class CommandFactory {

    private static validInputs = ['exit'];


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