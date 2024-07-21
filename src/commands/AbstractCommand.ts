export abstract class AbstractCommand {
    constructor() {
        console.log('Creating a new AbstractCommand');
    }

    abstract execute(...args: any | undefined): void;
}