/* eslint-disable prefer-destructuring */
import dotenv from 'dotenv';
import type { IntentsString } from 'discord.js';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (!process.env['DISCORD_TOKEN']) throw new Error('No bot token was provided.');
export const DISCORD_TOKEN = process.env['DISCORD_TOKEN'];
const encodedID = DISCORD_TOKEN.split('.')[0];
if (!encodedID) throw new Error('Bot token is not in the correct format.');
export const BOT_ID = Buffer.from(encodedID, 'base64').toString();

/**
 * Whether the bot is in development mode. If true, dev commands will be updated on the dev server.
 * @default true
 */
export const DEVELOPMENT_MODE = process.env['DEVELOPMENT_MODE'] ?? true;
export const DEV_GUILD_ID = process.env['DEV_GUILD_ID'] ?? '';

export const GATEWAY_INTENTS: IntentsString[] = [
  'GUILDS',
  'DIRECT_MESSAGES',
  'GUILD_MESSAGES',
];
