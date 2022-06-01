import { should } from 'chai';
import path from 'path';
import { Client } from 'discord.js';
import { commands, setUpCommandCollections } from '../src/commands';
import mockDevCommand from './init/commands/mockDevCommand';
import mockGlobalCommand from './init/commands/mockGlobalCommand';
import setUpEventHandlers from '../src/events';
import mockOnceEventHandler from './init/events/mockOnceEventHandler';
import mockEventHandler from './init/events/mockEventHandler';
import { mockEventHandled, mockOnceEventHandled } from './init/events';

should();

describe('Initialization tests', () => {
  describe('setUpCommandCollections', async () => {
    const devDirs = [path.resolve(__dirname, './init/commands/mockDevCommand.ts')];
    const globalDirs = [path.resolve(__dirname, './init/commands/mockGlobalCommand.ts')];
    await setUpCommandCollections(devDirs, globalDirs);
    it('Commands collection should contain mock commands', () => {
      commands.should.have.lengthOf(2);
      commands.should.have.all.keys('mockdev', 'mockglobal');
    });
    it('Only dev commands should have devOnly property set to true', () => {
      JSON.stringify(commands.get('mockdev')).should.eql(JSON.stringify({ ...mockDevCommand, devOnly: true }));
      JSON.stringify(commands.get('mockglobal')).should.eql(JSON.stringify(mockGlobalCommand));
    });
  });
  describe('setUpBotHandlers', async () => {
    const mockClient = new Client({ intents: 'GUILDS' });
    const eventHandlers = [mockOnceEventHandler, mockEventHandler];
    await setUpEventHandlers(mockClient, eventHandlers);
    it('Mock client should handle mock-once event once only', () => {
      mockClient.emit('mockonceevent');
      mockClient.emit('mockonceevent');
      mockClient.emit('mockonceevent');
      mockOnceEventHandled.should.eql(['handled']);
    });
    it('Mock client should handle mock client multiple times', () => {
      mockClient.emit('mockevent');
      mockClient.emit('mockevent');
      mockClient.emit('mockevent');
      mockEventHandled.should.eql(['handled', 'handled', 'handled']);
    });
  });
});
