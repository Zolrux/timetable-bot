const fs = require('fs/promises');

async function getData() {
  const data = await fs.readFile('src/db.json', 'utf8');
  return JSON.parse(data);
}

function getCurrentTimeInfo() {
  const daysWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  const formatTime = (value) => (value < 10 ? `0${value}` : value);
  const currentDate = new Date();
  const getNumberDayWeek = currentDate.getDay();
  const getHours = currentDate.getHours();
  const getMinutes = formatTime(currentDate.getMinutes());

  return {
    getHours,
    getMinutes,
    dayWeek: daysWeek[getNumberDayWeek],
  };
}

function checkDayWeekInArr(dayWeek, arr) {
  for (const obj of arr) {
    if (obj['subjectDate'] === dayWeek) {
      return arr;
    }
  }
  return false;
}

function getNextSubject(currentTime, arr) {
  const parseTimeToMinutes = (time) => {
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    minutes = parseInt(minutes);
    return hours * 60 + minutes;
  };

  for (const obj of arr) {
    const parseCurrentTimeToMinutes = parseTimeToMinutes(currentTime);
    const parseSubjectStartTimeToMinutes = parseTimeToMinutes(obj['subjectStartTime']);
    const parseSubjectEndTimeToMinutes = parseTimeToMinutes(obj['subjectEndTime']);

    if (parseSubjectStartTimeToMinutes > parseCurrentTimeToMinutes || parseSubjectEndTimeToMinutes > parseCurrentTimeToMinutes) {
      return obj;
    }
  }

  return false;
}

async function getSubject() {
  const db = await getData();
  const { getHours, getMinutes, dayWeek } = getCurrentTimeInfo();
  const currentHoursAndMinutes = `${getHours}:${getMinutes}`;
  let flag = false;
  let getSubject = null;

  for (const arr of db) {
    const checkDayWeek = checkDayWeekInArr(dayWeek, arr);
    if (!checkDayWeek) {
      continue;
    }
    getSubject = getNextSubject(currentHoursAndMinutes, checkDayWeek);

    if (checkDayWeek && getSubject) {
      flag = !flag;
    }
  }

  if (!flag) {
    return 'Сегодня нет уже пар';
  }

  return JSON.stringify(getSubject);
}

async function getValidMessage() {
	const result = await getSubject();
	
	try {
		const {subjectName, subjectLink, subjectStartTime, subjectEndTime} = JSON.parse(result);
		let msg = `Пара: ${subjectName}\nВремя пары: с ${subjectStartTime} до ${subjectEndTime}\nСсылка на пару: \n\n${subjectLink}`
		return msg;
	} catch (error) {
		return result;
	}
}

module.exports = {getValidMessage, getCurrentTimeInfo};
