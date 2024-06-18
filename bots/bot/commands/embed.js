const { SlashCommandBuilder } = require("@discordjs/builders");
const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

const exampleEmbed = {
  color: 0xffa500,
  title: "Formação Acelerada em Programação (FAP)",
  url: "https://fap.softexrecife.org.br/",
  author: {
    name: "FAP - Formação Acelerada em Programação",
    icon_url:
      "https://fap.softexrecife.org.br/assets/softex_branca_hd-abe1262bb8c7ddd54326d652e552d83f29bd1148f4a2a4e125f5700df4bc0a82.png",
    url: "https://fap.softexrecife.org.br/",
  },
  description:
    "Bem-vindo à Formação Acelerada em Programação! Um programa intensivo projetado para capacitar novos talentos no mundo da tecnologia.",
  thumbnail: {
    url:
      "https://media.licdn.com/dms/image/C4E0BAQF2pVcNYJBb9g/company-logo_200_200/0/1649074408972/softexrecife_logo?e=2147483647&v=beta&t=i3A4BP7Ul0FZy62CnpFgJ7H-Psdx0hXjUa2I4i0WndU",
  },
  fields: [
    {
      name: "Sobre o FAP",
      value:
        "O FAP é um curso intensivo que prepara seus participantes para ingressar no mercado de trabalho como desenvolvedores de software. Através de projetos práticos e mentoria especializada, os alunos adquirem habilidades essenciais em programação.",
    },
    {
      name: "Bot1: Verificação de CPF",
      value:
        "Nosso bot, o bot1, desempenha um papel crucial no processo de admissão dos alunos ao FAP. Ele automatiza a verificação de CPF dos candidatos, garantindo que cada aluno seja alocado em sua turma correta com o seu professor correspondente.",
      inline: false,
    },
  ],
  image: {
    url:
      "https://fap.softexrecife.org.br/assets/softex_branca_hd-abe1262bb8c7ddd54326d652e552d83f29bd1148f4a2a4e125f5700df4bc0a82.png",
  },
  timestamp: new Date().toISOString(),
  footer: {
    text: "© FAP - Formação Acelerada em Programação",
    icon_url:
      "https://fap.softexrecife.org.br/assets/softex_branca_hd-abe1262bb8c7ddd54326d652e552d83f29bd1148f4a2a4e125f5700df4bc0a82.png",
  },
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Replies with an embed"),

  async execute(interaction) {
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

    const row = new ActionRowBuilder().addComponents(FAP, ISGB, BOL, CRSL);

    await interaction.reply({
      embeds: [exampleEmbed],
      components: [row],
    });

    const filter = (i) =>
      ["FAP", "ISGB", "BOL", "CRSL"].includes(i.customId) &&
      i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 15000,
    });

    collector.on("collect", async (i) => {
      switch (i.customId) {
        case "FAP":
          await i.update({
            content: "Você clicou no botão FAP!",
            components: [],
          });
          break;
        case "ISGB":
          await i.update({
            content: "Você clicou no botão ISGB!",
            components: [],
          });
          break;
        case "BOL":
          await i.update({
            content: "Você clicou no botão BOL!",
            components: [],
          });
          break;
        case "CRSL":
          await i.update({
            content: "Você clicou no botão CRSL!",
            components: [],
          });
          break;
      }
    });

    collector.on("end", (collected) =>
      console.log(`Collected ${collected.size} interactions.`)
    );
  },
};
