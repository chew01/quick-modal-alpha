import { SlashCommandBuilder } from '@discordjs/builders';
import type { CommandInteraction } from 'discord.js';
import type { SlashCommand } from '../../../src/types/command';

const mockGlobalCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('mockglobal')
    .setDescription('mockglobal command'),
  async execute(interaction: CommandInteraction) {
    return interaction.reply('test reply');
  },
};

export default mockGlobalCommand;
