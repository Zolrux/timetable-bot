const bot = require('./bot');
const { getValidMessage, getCurrentTimeInfo } = require('./schedule');

let timer = null;

function botActions() {
  bot.onText(/^с?сылка пара$/gi, async (m) => {
    const result = await getValidMessage();
    bot.sendMessage(m.chat.id, result);
  });
  bot.onText(/^старт желание$/gi, async (m) => {
    timer = sayGoodnight();
  });
  bot.onText(/^стоп желание$/gi, async (m) => {
    clearInterval(timer);
    timer = null;
  });
  bot.onText(/^таймер$/gi, async (m) => {
    bot.sendMessage(m.chat.id, JSON.stringify(timer));
  });
}

function sayGoodnight() {
  const updatesTimeMs = 1000 * 60;
  timer = setInterval(() => {
    const { getHours, getMinutes } = getCurrentTimeInfo();
    if (getHours === 23 && getMinutes === 55) {
      const message = 'Доброй ночи, господа!';
      bot.sendMessage(-1001279682472, message);
    }
  }, updatesTimeMs);
}

module.exports = botActions;
