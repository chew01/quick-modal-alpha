import { Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import type { SlashCommand } from '../types/command';
import log from '../utils/logger';

export const commands = new Collection<string, SlashCommand>();
export const devDirsArray = fs.readdirSync(path.resolve(__dirname, 'dev/'), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => path.resolve(__dirname, `dev/${dirent.name}/index.ts`));
export const globalDirsArray = fs.readdirSync(path.resolve(__dirname, 'global/'), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => path.resolve(__dirname, `global/${dirent.name}/index.ts`));

export async function setUpCommandCollections(devDirs: string[], globalDirs: string[]) {
  log.info('[INITIALIZING] Setting up commands...');
  await globalDirs.forEach((commandFile) => {
    import(`${commandFile}`).then((command) => {
      commands.set(command.default.data.name, command.default);
    });
  });
  await devDirs.forEach((commandFile) => {
    import(`${commandFile}`).then((command) => {
      commands.set(command.default.data.name, { ...command.default, devOnly: true });
    });
  });
  log.info('[INITIALIZING] Commands set up successfully.');
}
