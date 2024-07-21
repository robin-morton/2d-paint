jest.mock("../Canvas");
import { Canvas } from "../Canvas";
import { CreateCommand } from "./CreateCommand";

describe("CreateCommand", () => {
    let command: CreateCommand;
    let canvas: Canvas;

    beforeEach(() => {
        command = new CreateCommand();
        canvas = new Canvas();
    });

    it("should create a new canvas with the given width and height", () => {
        const width = '3';
        const height = '5';
        command.execute(canvas, height, width);

        expect(canvas.create).toHaveBeenCalledWith(5, 3);
    });

    it('should throw an error when the height is not a number', () => {
        const width = '3';
        const height = 'a';

        expect(() => command.execute(canvas, height, width)).toThrow('Invalid height or width');
    });

    it('should throw an error when the width is not a number', () => {
        const width = 'a';
        const height = '5';

        expect(() => command.execute(canvas, height, width)).toThrow('Invalid height or width');
    });
});