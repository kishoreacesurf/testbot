import Ext from 'recime-bot-extension';

const __ = Ext.default;

export default class Bot {
    constructor(args) {
        this.args = args;
    }

    execute() {
        return new Promise((resolve) => {
            resolve(__.text(`Hello! I'm a Recime bot. How may I help you?`));
        });
    }
}