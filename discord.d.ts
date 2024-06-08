// discord.d.ts
import { Collection, Client } from "discord.js";

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, any>;
  }
}
