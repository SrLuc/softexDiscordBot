const { SlashCommandBuilder } = require("@discordjs/builders");

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
    url: "https://media.licdn.com/dms/image/C4E0BAQF2pVcNYJBb9g/company-logo_200_200/0/1649074408972/softexrecife_logo?e=2147483647&v=beta&t=i3A4BP7Ul0FZy62CnpFgJ7H-Psdx0hXjUa2I4i0WndU",
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
        "Nosso bot, o bot1, desempenha um papel crucial no processo de admissão dos alunos ao FAP. \n Ele automatiza a verificação de CPF dos candidatos, garantindo que cada aluno seja alocado em sua turma correta com o seu professor correspondente.",
      inline: false,
    },
  ],
  image: {
    url: "https://fap.softexrecife.org.br/assets/softex_branca_hd-abe1262bb8c7ddd54326d652e552d83f29bd1148f4a2a4e125f5700df4bc0a82.png",
  },
  timestamp: new Date().toISOString(),
  footer: {
    text: "© FAP - Formação Acelerada em Programação",
    icon_url: "https://fap.softexrecife.org.br/assets/softex_branca_hd-abe1262bb8c7ddd54326d652e552d83f29bd1148f4a2a4e125f5700df4bc0a82.png",
  },
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Replies with an embed"),

  async execute(interaction) {
    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
