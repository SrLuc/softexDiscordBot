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
    .setName("modal")
    .setDescription("Selecionar Modalidade de Curso"),

  async execute(interaction) {
    if (interaction.type !== InteractionType.ApplicationCommand) return;

    // Create a modal
    const modal = new ModalBuilder()
      .setCustomId("courseModal")
      .setTitle("Selecione a modalidade de seu curso");

    // Create a text input field
    const textInput = new TextInputBuilder()
      .setCustomId("courseInput")
      .setLabel("Digite algo")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("Digite algo")
      .setRequired(true);

    // Add the text input to an action row
    const actionRow = new ActionRowBuilder().addComponents(textInput);

    // Add the action row to the modal
    modal.addComponents(actionRow);

    // Show the modal to the user
    await interaction.showModal(modal);

    // Collect the modal submission
    interaction.client.once("interactionCreate", async (modalInteraction) => {
      if (!modalInteraction.isModalSubmit()) return;
      if (modalInteraction.customId === "courseModal") {
        const courseInputValue = modalInteraction.fields.getTextInputValue(
          "courseInput"
        );
        await modalInteraction.reply({
          content: `Você digitou: ${courseInputValue}`,
          ephemeral: true,
        });
      }
    });
  },
};
