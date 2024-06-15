const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sum")
    .setDescription("Adds two numbers together")
    .addNumberOption((option) =>
      option
        .setName("first-number")
        .setDescription("The first number")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("second-number")
        .setDescription("The second number")
        .setRequired(true)
    ),

  async execute(interaction) {
    // Retrieve the values of the two numbers from the interaction options
    const firstNumber = interaction.options.getNumber("first-number");
    const secondNumber = interaction.options.getNumber("second-number");

    // Calculate the sum
    const sum = firstNumber + secondNumber;

    // Reply with the result
    await interaction.reply(
      `The sum of ${firstNumber} and ${secondNumber} is ${sum}`
    );
  },
};
