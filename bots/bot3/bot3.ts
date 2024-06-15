import { Client, GatewayIntentBits, Collection } from "discord.js";
import fs from "fs";
import path from "path";

export const bot3 = new Client({ intents: [GatewayIntentBits.Guilds] });

//commands collection for bot3
bot3.commands = new Collection();

//commands handler for bot3
export function handlerCommandsBotThree() {
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const commands = require(filePath);
    if ("data" in commands && "execute" in commands) {
      bot3.commands.set(commands.data.name, commands);
      //console.log(`these commands on ${filePath} are valid`);
    } else {
      console.log(`these commands on ${filePath} are not valid`);
    }
  }
  //console.log(bot3.commands);
}

//bot3 interactionCreate event
bot3.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = bot3.commands.get(interaction.commandName);
  if (!command) {
    console.log(`Command ${interaction.commandName} not found`);
    return;
  }

  try {
    console.log(`Executing command ${interaction.commandName}`);
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing command ${interaction.commandName}:`, error);
    await interaction.reply({
      content: "There was an error executing this command!",
      ephemeral: true,
    });
  }
});

bot3.on("ready", () => {
  console.log(`Bot 3 connected as ${bot3.user?.tag}`);
  handlerCommandsBotThree();
});
