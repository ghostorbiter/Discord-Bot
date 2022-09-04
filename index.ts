import DiscordJS, { GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config();

const client = new DiscordJS.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})  

client.on('ready', () => {
    console.log('Bot is ready');

    const guildId = '1009249751025332326';
    const guild = client.guilds.cache.get(guildId);
    let commands;

    if (guild){
        commands = guild.commands;
    } else {
        commands = client.application?.commands;
    }

    commands?.create({
        name: 'ping',
        description: 'reply with pong',
    })

    commands?.create({
        name: 'add',
        description: 'Adds 2 numbers',
        options: [
            {
                name: 'number1',
                description: 'First number',
                required: true,
                type: DiscordJS.ApplicationCommandOptionType.Number,
            },
            {
                name: 'number2',
                description: 'Second number',
                required: true,
                type: DiscordJS.ApplicationCommandOptionType.Number,
            },
        ],
    })
})

client.on('messageCreate', (message) => {
    if (message.content === 'hello'){
        message.reply('world')
    }
})

client.on('interactionCreate', async(interaction) => {
    if (!interaction.isChatInputCommand()){
        return;
    }

    const { commandName, options } = interaction;

    if (commandName === 'ping'){
        interaction.reply({
            content: 'pong',
            ephemeral: false,
        });
    } else if (commandName === 'add'){
        const number1 = options.getNumber('number1')!;
        const number2 = options.getNumber('number2')!; 

        await interaction.deferReply({});

        await new Promise((resolve) => {setTimeout(resolve, 3000)});

        await interaction.editReply({
            content: `${number1} + ${number2} = ${number1 + number2}`
        })
    }
})

client.login(process.env.TOKEN);