const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("draw")
    .setDescription("Replies with draw arts"),

  async execute(interaction) {
    await interaction.reply("draw arts!");
  },
};
