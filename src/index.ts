import inquirer from "inquirer";
import { Canvas } from "./Canvas";
import { CommandFactory } from "./commands/CommandFactory";
import { ExitCommand } from "./commands";

const prompts: any = [{
    name: 'input',
    type: 'input',
    message: '',
}]

const canvas = new Canvas();

const prompt = async () => {
    const answer = await inquirer.prompt(prompts);
    const { input } = answer;

    if (!CommandFactory.isValid(input)) {
        console.log('invalid input');
        await prompt();
    }

    const command = CommandFactory.fromString(input);
    const args = input.split(' ').slice(1);

    if (command instanceof ExitCommand) {
        command.execute();
    }

    command.execute(canvas, ...args);

    await prompt();
};

prompt();