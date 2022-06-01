import type { Client, Interaction, ModalActionRowComponent } from 'discord.js';
import { MessageActionRow, Modal, TextInputComponent } from 'discord.js';
import type { BotEventHandler } from '../../types/event';
import log, { logCommand } from '../../utils/logger';
import { commands } from '../../commands';

const interactionCreateEventHandler: BotEventHandler = {
  name: 'interactionCreate',
  once: false,
  async execute(__bot: Client, interaction: Interaction): Promise<void> {
    // Interaction is a slash command
    if (interaction.isCommand()) {
      const slashCommand = commands.get(interaction.commandName);
      // Slash command does not exist
      if (!slashCommand) {
        return interaction.reply({ content: 'Oops! Command does not exist!', ephemeral: true }).catch(log.error);
      }
      try {
        logCommand(interaction, 'Trigger', interaction.commandName);
        await slashCommand.execute(interaction);
        return logCommand(interaction, 'Success', interaction.commandName);
      } catch (error) {
        logCommand(interaction, 'Failure', interaction.commandName);
        // For debug only. To catch errors properly, return reply instead
        if (error instanceof Error) return log.error(error.stack ? error.stack : error.message);
        return log.error('Unknown error.');
      }
    }

    /** If the interaction is a button, and the custom ID is modal-button
     *  We create a modal with two short text inputs, custom IDs and show it */
    if (interaction.isButton()) {
      const { customId } = interaction;
      if (customId === 'modal-button') {
        const fromInput = new TextInputComponent().setCustomId('from-input').setStyle('SHORT').setLabel('From who?')
          .setRequired(true);
        const toInput = new TextInputComponent().setCustomId('to-input').setStyle('SHORT').setLabel('To who?')
          .setRequired(true);

        const modal = new Modal().setCustomId('custom-modal').setTitle('This is the title').addComponents(
          new MessageActionRow<ModalActionRowComponent>().addComponents(fromInput),
          new MessageActionRow<ModalActionRowComponent>().addComponents(toInput),
        );

        return interaction.showModal(modal);
      }
    }

    /** If the interaction is a modal submission,
     * get those two text input values via the custom IDs we specified */
    if (interaction.isModalSubmit()) {
      const fromValue = interaction.fields.getTextInputValue('from-input');
      const toValue = interaction.fields.getTextInputValue('to-input');
      return interaction.reply(`from ${fromValue} to ${toValue}`);
    }

    return log.debug('Interaction received.');
  },
};

export default interactionCreateEventHandler;
