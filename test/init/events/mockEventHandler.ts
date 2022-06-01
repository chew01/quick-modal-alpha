import type { Client } from 'discord.js';
import type { BotEventHandler } from '../../../src/types/event';
import { mockEventHandled } from './index';

const mockEventHandler: BotEventHandler = {
  name: 'mockevent',
  once: false,
  execute(__bot: Client): void {
    mockEventHandled.push('handled');
  },
};

export default mockEventHandler;
