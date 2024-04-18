#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const rainbowTittle = chalkAnimation.rainbow('Who Wants To Answer Some Questions? \n');
    await sleep();
    rainbowTittle.stop();
    console.log(`${chalk.bgBlue('How To Play')}
        I'm a process on your computer.
        If you get any question wrong I will be ${chalk.bgRedBright('killed.')}
        So get all the questions right...`);
}
;
await welcome();
let playerName = await inquirer.prompt({
    name: 'playerName',
    type: 'input',
    message: 'What is your name?',
    default() {
        return 'Player';
    },
});
async function que1() {
    const ans = await inquirer.prompt({
        name: 'que1',
        type: 'list',
        message: `What number is missing in this sequence? \n 2,4,6.8`,
        choices: [
            '10', '12', '14', '16'
        ],
    });
    return handleAns(ans.que1 === '10');
}
async function que2() {
    const ans = await inquirer.prompt({
        name: 'que2',
        type: 'list',
        message: 'What comes with a shell, white walls, and a golden treasure inside?',
        choices: [
            'A) A snail', 'B) An egg', 'C) A treasure chest', 'D) A pearl'
        ],
    });
    return handleAns(ans.que2 === 'B) An egg');
}
async function que3() {
    const ans = await inquirer.prompt({
        name: 'que3',
        type: 'list',
        message: 'What has countless shelves but keeps its contents always on display?',
        choices: [
            'A) A museum', 'B) A library', 'C) A supermarket', 'D) A wardrobe'
        ],
    });
    return handleAns(ans.que3 === 'B) A library');
}
async function que4() {
    const ans = await inquirer.prompt({
        name: 'que4',
        type: 'list',
        message: 'What can be filled with a whole room but takes up no space?',
        choices: [
            'A) A vacuum', 'B) A dream', 'C) Light', 'D) A shadow'
        ],
    });
    return handleAns(ans.que4 === 'D) A shadow');
}
async function handleAns(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName.playerName}. That's a legit answer` });
    }
    else {
        spinner.error({ text: `💀💀💀 Game over, you lose ${playerName.playerName}!` });
        process.exit(1);
    }
}
await que1();
await que2();
await que3();
await que4();
function winner() {
    console.clear();
    const msg = `Congrats! ${playerName.playerName} You Won`;
    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}
winner();
