import { Client, GatewayIntentBits } from "discord.js";

export const bot1 = new Client({ intents: [GatewayIntentBits.Guilds] });

bot1.on("ready", () => {
  console.log(`Bot 1 conectado como ${bot1.user?.tag}`);
});
