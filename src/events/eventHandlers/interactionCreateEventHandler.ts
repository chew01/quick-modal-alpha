import type { Client, Interaction } from 'discord.js';
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
    return log.debug('Interaction received.');
  },
};

export default interactionCreateEventHandler;
