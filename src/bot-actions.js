const bot = require('./bot');
const { getValidMessage, getCurrentTimeInfo } = require('./schedule');

let timerInfo = { sayGoodnightTimeId: null, /* autoSendActiveSubjectTimeId: null */ };
const testChatId = -4078181398;
const kakunchikiId = -1001279682472;

function botActions() {
  bot.onText(/^с?сылка пара$/gi, async (m) => {
    const result = await getValidMessage();
    bot.sendMessage(m.chat.id, result);
  });
  bot.onText(/^старт желание$/gi, async (m) => {
    timerInfo.sayGoodnightTimeId = sayGoodnight(timerInfo);
  });
  bot.onText(/^стоп желание$/gi, async (m) => {
    clearInterval(timerInfo.time);
    timerInfo.sayGoodnightTimeId = null;
  });
  bot.onText(/^таймер$/gi, async (m) => {
    console.log(m.chat.id);
    bot.sendMessage(m.chat.id, JSON.stringify(timerInfo));
  });
}

function sayGoodnight(timerInfo) {
  const updatesTimeMs = 1000 * 60;
  const timerId = setInterval(() => {

    timerInfo.sayGoodnightTimeId = timerId[Symbol.toPrimitive]();
    const { getHours, getMinutes } = getCurrentTimeInfo();

    if (getHours === 23 && getMinutes === 55) {
      const message = 'СпоХАЖПОРНЖУХВкойной ночи!';
      bot.sendMessage(kakunchikiId, message);
    }
  }, updatesTimeMs);

}

// function autoSendActiveSubject() {
// 	const updatesTimeMs = 1000 * 60;
// 	const timerId = setInterval(async () => {
 
// 	  timerInfo.autoSendActiveSubjectTimeId = timerId[Symbol.toPrimitive]();
// 	  const { getHours, getMinutes } = getCurrentTimeInfo();
// 	  const result = await getValidMessage();
 
// 	  if (getHours === 23 && getMinutes === 55) {
// 		 const message = 'Доброй ночи, господа!';
// 		 bot.sendMessage(testChatId, message);
// 	  }
// 	}, updatesTimeMs);
// }

module.exports = botActions;
