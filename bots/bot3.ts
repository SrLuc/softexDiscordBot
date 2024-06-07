import { Client, GatewayIntentBits } from "discord.js";

export const bot3 = new Client({ intents: [GatewayIntentBits.Guilds] });

bot3.on("ready", () => {
  console.log(`Bot 3 conectado como ${bot3.user?.tag}`);
});
