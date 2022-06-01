import { SlashCommandBuilder } from '@discordjs/builders';
import type { CommandInteraction } from 'discord.js';
import { MessageActionRow, MessageButton } from 'discord.js';
import type { SlashCommand } from '../../../types/command';

const createButtonCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('createbutton')
    .setDescription('Creates a button'),
  async execute(interaction: CommandInteraction) {
    /** This creates a button with custom ID modal-button.
     *  We will use this in the interactionCreateEventHandler */
    const button = new MessageButton().setStyle('SUCCESS').setLabel('This is a button!').setCustomId('modal-button');
    const row = new MessageActionRow().addComponents(button);
    return interaction.reply({ components: [row] });
  },
};

export default createButtonCommand;
