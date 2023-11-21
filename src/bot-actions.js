const bot = require('./bot');
const { getValidMessage, getCurrentTimeInfo } = require('./schedule');

let timerInfo = { time: null };
const testChatId = -4078181398;
const kakunchikiId = -1001279682472;

function botActions() {
  bot.onText(/^с?сылка пара$/gi, async (m) => {
    const result = await getValidMessage();
    bot.sendMessage(m.chat.id, result);
  });
  bot.onText(/^старт желание$/gi, async (m) => {
    timerInfo.time = sayGoodnight(timerInfo);
  });
  bot.onText(/^стоп желание$/gi, async (m) => {
    clearInterval(timerInfo.time);
    timerInfo.time = null;
  });
  bot.onText(/^таймер$/gi, async (m) => {
    console.log(m.chat.id);
    bot.sendMessage(m.chat.id, JSON.stringify(timerInfo));
  });
}

function sayGoodnight(timerInfo) {
  const updatesTimeMs = 1000 * 10;
  const timerId = setInterval(() => {

    timerInfo.time = timerId[Symbol.toPrimitive]();
    const { getHours, getMinutes } = getCurrentTimeInfo();

    if (getHours === 23 && getMinutes === 55) {
      const message = 'Доброй ночи, господа!';
      bot.sendMessage(kakunchikiId, message);
    }
  }, updatesTimeMs);

}

module.exports = botActions;
