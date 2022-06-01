import { SlashCommandBuilder } from '@discordjs/builders';
import type { CommandInteraction } from 'discord.js';
import type { SlashCommand } from '../../../src/types/command';

const mockDevCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('mockdev')
    .setDescription('mockdev command'),
  async execute(interaction: CommandInteraction) {
    return interaction.reply('test reply');
  },
};

export default mockDevCommand;
