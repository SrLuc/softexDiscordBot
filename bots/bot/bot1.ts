import fs from "fs";
import path from "path";
import { Client, Collection, GatewayIntentBits } from "discord.js";

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
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".ts"));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const commands = require(filePath);
  if ("data" in commands && "execute" in commands) {
    bot1.commands.set(commands.data.name, commands);
  } else {
    console.log(`these commands on ${filePath} are not valid`);
  }
}
console.log(bot1.commands);

//bot1 ready event
bot1.once("ready", () => {
  console.log(`Bot 1 connected as ${bot1.user?.tag}`);
});
