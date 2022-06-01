import type {
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import type { CommandInteraction } from 'discord.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SlashExecuteFn = (interaction: CommandInteraction, ...args: any[]) => Promise<any>;

export interface SlashCommand {
  data: SlashCommandBuilder
  | SlashCommandSubcommandsOnlyBuilder
  | SlashCommandOptionsOnlyBuilder
  | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>,
  execute: SlashExecuteFn,
  devOnly?: boolean,
}
