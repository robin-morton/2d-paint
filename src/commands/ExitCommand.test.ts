import { ExitCommand } from "./ExitCommand";

describe('ExitCommand', () => {

    let realProcess: NodeJS.Process;
    let mockedProcess: NodeJS.Process;

    const mockedExit = jest.fn().mockImplementation(() => { }) as never;

    beforeEach(() => {
        realProcess = process;
        mockedProcess = { ...realProcess, exit: mockedExit };
        process = mockedProcess;
    });
    afterAll(() => {
        process = realProcess;
    });

    describe('execute', () => {
        it('should exit the process', () => {
            const exitCommand = new ExitCommand();
            exitCommand.execute();

            expect(mockedExit).toHaveBeenCalledWith(0);
        });
    });
});