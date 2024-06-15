import dotenv from "dotenv";
dotenv.config();

import { bot1 } from "./bots/bot/bot1";
import { bot2 } from "./bots/bot2/bot2";
import { bot3 } from "./bots/bot3/bot3";

bot1.login(process.env.TOKEN1);
//bot2.login(process.env.TOKEN2);
//bot3.login(process.env.TOKEN3);
