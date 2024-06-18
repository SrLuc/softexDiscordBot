const {
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("btn")
    .setDescription("Selecionar Modalidade de Curso"),

  async execute(interaction) {
    //const target = interaction.options.getUser("target") ?? interaction.user;
    //const reason = interaction.options.getString("reason") ?? "No reason provided";

    const FAP = new ButtonBuilder()
      .setCustomId("FAP")
      .setLabel("FAP")
      .setStyle(ButtonStyle.Danger);

    const ISGB = new ButtonBuilder()
      .setCustomId("ISGB")
      .setLabel("ISGB")
      .setStyle(ButtonStyle.Secondary);

    const BOL = new ButtonBuilder()
      .setCustomId("BOL")
      .setLabel("BOL")
      .setStyle(ButtonStyle.Primary);

    const CRSL = new ButtonBuilder()
      .setCustomId("CRSL")
      .setLabel("CRSL")
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(FAP, BOL, CRSL, ISGB);

    await interaction.reply({
      content: "Escolha a modalidade de seu curso curso de acordo com sua inscrição",
      components: [row],
    });
  },
};
