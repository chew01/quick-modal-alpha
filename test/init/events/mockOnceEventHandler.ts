import type { Client } from 'discord.js';
import type { BotEventHandler } from '../../../src/types/event';
import { mockOnceEventHandled } from './index';

const mockOnceEventHandler: BotEventHandler = {
  name: 'mockonceevent',
  once: true,
  execute(__bot: Client): void {
    mockOnceEventHandled.push('handled');
  },
};

export default mockOnceEventHandler;
