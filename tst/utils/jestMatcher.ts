import { strip } from "cli-color";
import { Canvas } from "../../src/Canvas";


export const toMatchCanvas = (canvas: Canvas, expected: string) => {

    canvas.print();

    const log = console.log as unknown as jest.SpiedFunction<any>;

    const received = log.mock.calls[log.mock.calls.length - 1] as unknown as string;

    const strippedReceived = strip(received);
    const strippedExpected = strip(expected!);

    expect(strippedReceived).toMatch(strippedExpected);
}