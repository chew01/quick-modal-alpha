import type { Client } from 'discord.js';
import fs from 'fs';
import path from 'path';
import type { BotEventHandler } from '../types/event';
import log from '../utils/logger';

export const eventArray: BotEventHandler[] = [];
const eventPaths = fs.readdirSync(path.resolve(__dirname, 'eventHandlers/')).filter((filename) => filename.endsWith('.js'));
eventPaths.forEach((eventHandler) => {
  import(`./eventHandlers/${eventHandler}`).then((event) => eventArray.push(event.default));
});

/**
 * Set up all event handlers in eventHandlers directory onto the bot.
 * @param bot The bot client instance.
 * @param events The array of event handlers.
 */
async function setUpEventHandlers(bot: Client, events: BotEventHandler[]) {
  log.info('[INITIALIZING] Setting up event handlers...');
  events.forEach((event) => {
    if (event.once) {
      bot.once(event.name, (...args) => event.execute(bot, ...args));
    } else {
      bot.on(event.name, (...args) => event.execute(bot, ...args));
    }
  });
  log.info('[INITIALIZING] Event handlers set up successfully.');
}

export default setUpEventHandlers;
