import fs from "fs";
import path from "path";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";

import dotenv from "dotenv";
dotenv.config();

import { bot1 } from "./bots/bot/bot1";
//import { bot2 } from "./bots/bot2";
//import { bot3 } from "./bots/bot3";


//bot2.login(process.env.TOKEN2);
//bot3.login(process.env.TOKEN3);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    //GatewayIntentBits.GuildMessages,
    //GatewayIntentBits.GuildMessageReactions,
    //GatewayIntentBits.GuildMembers,
    //GatewayIntentBits.GuildVoiceStates,
    //GatewayIntentBits.GuildPresences,
  ],
});

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".ts"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});



bot1.login(process.env.TOKEN1);