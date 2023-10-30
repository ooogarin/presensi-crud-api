const { exec } = require('child_process');

console.log("run seeders");

const commands = [
        "npx sequelize-cli db:seed --seed 20231026173300-demo-account-device",
        "npx sequelize-cli db:seed --seed 20231026173505-demo-shift-turn",
        "npx sequelize-cli db:seed --seed 20231026173515-demo-shift-type",
        "npx sequelize-cli db:seed --seed 20231026173359-demo-division",
        "npx sequelize-cli db:seed --seed 20231026173534-demo-shifting",
        "npx sequelize-cli db:seed --seed 20231026173232-demo-account-level",
        "npx sequelize-cli db:seed --seed 20231026173332-demo-account",
        "npx sequelize-cli db:seed --seed 20231026173454-demo-schedule",
        "npx sequelize-cli db:seed --seed 20231026173409-demo-locator",
        "npx sequelize-cli db:seed --seed 20231026173344-demo-attendance",
        "npx sequelize-cli db:seed --seed 20231026173351-demo-cuti"
    ];

async function runCommands() {
    for (let i = 0; i < commands.length; i++) {
      await executeCommand(commands[i]);
    }
  }

async function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject(error);
            } else {
                console.log(stdout);
                resolve();
            }
        });
    });
}

runCommands();
