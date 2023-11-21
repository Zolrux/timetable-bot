const bot = require('./bot');
const {getValidMessage, getCurrentTimeInfo} = require('./schedule');

function botActions() {
  bot.onText(/^с?сылка пара$/gi, async (m) => {
    const result = await getValidMessage();
    bot.sendMessage(m.chat.id, result);
  });
}

module.exports = botActions;