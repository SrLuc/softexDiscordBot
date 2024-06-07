import { Client, GatewayIntentBits } from "discord.js";

export const bot2 = new Client({ intents: [GatewayIntentBits.Guilds] });

bot2.on("ready", () => {
    console.log(`Bot 2 conectado como ${bot2.user?.tag}`);
  });
