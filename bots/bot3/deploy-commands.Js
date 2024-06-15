const { BOT3 } = require("../../config.json");
const fs = require("node:fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const path = require("node:path");
var colors = require("colors");

// Reading all the commands
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js")); // ou .js, dependendo do caso

const commands = [];

// Looping through all the commands
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// Rest instance
const rest = new REST({ version: "10" }).setToken(BOT3.TOKEN3);

// Deploying commands
(async () => {
  try {
    console.log(
      "Bot3:".cyan +
        `Started refreshing ${commands.length} application (/) commands.`
    );
    const data = await rest.put(
      Routes.applicationGuildCommands(BOT3.CLIENT_ID3, BOT3.GUILD_ID3),
      { body: commands }
    );
    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`.green
        .bold
    );
  } catch (error) {
    console.error(error);
  }
})();
