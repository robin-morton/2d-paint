jest.mock("../Canvas");
import { Canvas } from "../Canvas";
import { ShowCommand } from "./ShowCommand";

describe("ShowCommand", () => {
    it("should print the canvas", () => {

        const showCommand = new ShowCommand();
        const canvas = new Canvas();

        showCommand.execute(canvas);

        expect(canvas.print).toHaveBeenCalled();
    });
});