const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  InteractionType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fap")
    .setDescription("Selecionar"),

  async execute(interaction) {
    if (interaction.type !== InteractionType.ApplicationCommand) return;

    // Create a modal
    const modal = new ModalBuilder()
      .setCustomId("courseModal")
      .setTitle("Selecione a modalidade de seu curso");

    // Create a text input field for age
    const ageInput = new TextInputBuilder()
      .setCustomId("ageInput")
      .setLabel("Digite sua idade")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("Ex: 25")
      .setRequired(true);

    // Create a text input field for CPF
    const cpfInput = new TextInputBuilder()
      .setCustomId("cpfInput")
      .setLabel("Digite seu CPF")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("Ex: 123.456.789-00")
      .setRequired(true);

    // Add the text inputs to action rows
    const ageActionRow = new ActionRowBuilder().addComponents(ageInput);
    const cpfActionRow = new ActionRowBuilder().addComponents(cpfInput);

    // Add the action rows to the modal
    modal.addComponents(ageActionRow, cpfActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);

    // Collect the modal submission
    interaction.client.once("interactionCreate", async (modalInteraction) => {
      if (!modalInteraction.isModalSubmit()) return;
      if (modalInteraction.customId === "courseModal") {
        const ageInputValue = modalInteraction.fields.getTextInputValue("ageInput");
        const cpfInputValue = modalInteraction.fields.getTextInputValue("cpfInput");
        await modalInteraction.reply({
          content: `Você digitou: Idade - ${ageInputValue}, CPF - ${cpfInputValue}`,
          ephemeral: true,
        });
      }
    });
  },
};
