// дата, у которой настроен формат
import moment, { Moment } from 'moment'; // библиотека для даты


// настройка формата вывода даты (ru-> с понедельника)
moment.updateLocale('ru', { week: { dow: 1 } }); // неделя начинается с понедельника

// состояние по-умолчанию
export const currentMoment: Moment = moment();
export default currentMoment