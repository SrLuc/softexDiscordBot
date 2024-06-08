const { CLIENT_ID3, GUILD_ID3, TOKEN3 } = require("../../config.json");
const fs = require("node:fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const path = require("node:path");

// Reading all the commands
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".ts")); // ou .js, dependendo do caso

const commands = [];

// Looping through all the commands
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// Rest instance
const rest = new REST({ version: "10" }).setToken(TOKEN3);

// Deploying commands
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );
    const data = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID3, GUILD_ID3),
      { body: commands }
    );
    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
