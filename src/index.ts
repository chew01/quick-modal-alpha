import { Client } from 'discord.js';
import { DEVELOPMENT_MODE, DISCORD_TOKEN, GATEWAY_INTENTS } from './config';
import { updateDevCommands, updateGlobalCommands } from './utils/commandUpdater';
import log from './utils/logger';
import setUpEventHandlers, { eventArray } from './events';
import { devDirsArray, globalDirsArray, setUpCommandCollections } from './commands';

const bot = new Client({ intents: GATEWAY_INTENTS });

async function initialize(botClient: Client) {
  // Add commands to bot client
  await setUpCommandCollections(devDirsArray, globalDirsArray);
  // Add event listeners to bot client
  await setUpEventHandlers(botClient, eventArray);
  if (DEVELOPMENT_MODE) {
    log.info('[DEV MODE] Updating slash commands for dev server.');
    await updateDevCommands();
  } else {
    log.info('[PROD MODE] Propagating commands globally. This may take up to an hour.');
    await updateGlobalCommands();
  }
  await botClient.login(DISCORD_TOKEN);
}

initialize(bot).then(() => log.info('[INITIALIZING] Initialization is complete.'));

export default bot;
