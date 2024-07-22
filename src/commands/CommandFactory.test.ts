import { ClearCommand } from "./ClearCommand";
import { CommandFactory } from "./CommandFactory";
import { CreateCommand } from "./CreateCommand";
import { ExitCommand } from "./ExitCommand";
import { PointCommand } from "./PointCommand";
import { ShowCommand } from "./ShowCommand";

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

        it('should return a PointCommand instance when called with \'point\'', () => {
            const command = 'point';
            const result = CommandFactory.fromString(command);
            expect(result).toBeInstanceOf(PointCommand);
        });

        it('should return a ShowCommand instance when called with \'show\'', () => {
            const command = 'show';
            const result = CommandFactory.fromString(command);
            expect(result).toBeInstanceOf(ShowCommand);
        });

        it('should return a ClearCommand instance when called with \'clear\'', () => {
            const command = 'clear';
            const result = CommandFactory.fromString(command);
            expect(result).toBeInstanceOf(ClearCommand);
        });

        it('should return a LineCommand instance when called with \'line\'', () => {
            const command = 'line';
            const result = CommandFactory.fromString(command);
            expect(result).toBeInstanceOf(LineCommand);
        });
    });
});