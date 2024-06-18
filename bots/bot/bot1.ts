import fs from "fs";
import path from "path";
import { Client, Collection, GatewayIntentBits } from "discord.js";
const colors = require("colors");

//bot1 client
export const bot1 = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

//commands collection for bot1
bot1.commands = new Collection();

//commands handler for bot1
export function handlerCommandsBotOne() {
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const commands = require(filePath);
    if ("data" in commands && "execute" in commands) {
      bot1.commands.set(commands.data.name, commands);
      //console.log(`these commands on ${filePath} are valid`);
    } else {
      console.log(`these commands on ${filePath} are not valid`);
    }
  }
  //console.log(bot1.commands);
}

//load events for bot1
export function loadEventsBotOne() {
  const eventsPath = path.join(__dirname, "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if ("name" in event && "execute" in event) {
      bot1.on(event.name, event.execute);
      console.log(`Event ${event.name} loaded`);
    } else {
      console.log(`Event ${file} not valid`);
    }
  }
}

//bot1 interactionCreate event
bot1.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = bot1.commands.get(interaction.commandName);
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

//bot1 ready event
bot1.once("ready", () => {
  console.log(`Bot 1 connected as ${bot1.user?.tag}`);
  handlerCommandsBotOne();
  loadEventsBotOne();
});
