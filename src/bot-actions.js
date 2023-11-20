const bot = require('./bot');
const {getValidMessage, getCurrentTimeInfo} = require('./schedule');

function botActions() {
  bot.onText(/^с?сылка пара$/gi, async (m) => {
    const result = await getValidMessage();
    bot.sendMessage(m.chat.id, result);
  });
  bot.onText(/время инфо/gi, async (m) => {
	bot.sendMessage(m.chat.id, JSON.stringify(getCurrentTimeInfo()));
  })
}

module.exports = botActions;