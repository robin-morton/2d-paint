jest.mock("../Canvas");
import { Canvas } from "../Canvas";
import { ClearCommand } from "./ClearCommand";
describe('ClearCommand', () => {
    describe("execute", () => {
        it("should clear the canvas", () => {
            const canvas = new Canvas();
            const clearCommand = new ClearCommand();

            clearCommand.execute(canvas);

            expect(canvas.clear).toHaveBeenCalled();
        });
    });
});