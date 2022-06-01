import { SlashCommandBuilder } from '@discordjs/builders';
import type { CommandInteraction } from 'discord.js';
import type { SlashCommand } from '../../../types/command';

const blingCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('bling')
    .setDescription('Replies with Bong!'),
  async execute(interaction: CommandInteraction) {
    const lat = Date.now() - interaction.createdTimestamp;
    await interaction.reply(`Bong! ${lat} ms`);
  },
};

export default blingCommand;
