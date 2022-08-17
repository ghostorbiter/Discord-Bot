import DiscordJS, {GatewayIntentBits} from 'discord.js'
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
    console.log('Darwin ready');
})

client.on('messageCreate', (message) => {
    if (message.content === 'hello'){
        message.reply('world')
    }else{
        console.log('some other message')
    }
})

client.login(process.env.TOKEN);