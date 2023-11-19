const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "5821597051:AAGuD3fdwgEmI5gaHwC5uwHdJlw5ojobdSY";
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', async (m) => {
	await bot.sendMessage(m.chat.id, 'Hello');
})