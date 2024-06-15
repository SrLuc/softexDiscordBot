const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("git")
    .setDescription("Replies with git commands"),
  async execute(interaction) {
    await interaction.reply("git commands!");
  },
};
