import type { Client } from 'discord.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventExecuteFn = (bot: Client, ...args: any[]) => void;

export interface BotEventHandler {
  name: string,
  once: boolean,
  execute: EventExecuteFn
}
