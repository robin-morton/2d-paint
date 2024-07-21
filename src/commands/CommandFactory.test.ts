import { CommandFactory } from "./CommandFactory";
import { CreateCommand } from "./CreateCommand";
import { ExitCommand } from "./ExitCommand";

describe("CommandFactory", () => {
    describe("fromString", () => {
        it('should throw an error if the command is not supported', () => {
            const command = 'unsupported command';
            expect(() => CommandFactory.fromString(command)).toThrowError('Invalid command');
        });

        it('should return a ExitCommand instance when called with \'exit\'', () => {
            const command = 'exit';
            const result = CommandFactory.fromString(command);
            expect(result).toBeInstanceOf(ExitCommand);
        });

        it('should return a CreateCommand instance when called with \'create\'', () => {
            const command = 'create';
            const result = CommandFactory.fromString(command);
            expect(result).toBeInstanceOf(CreateCommand);
        });
    });
});