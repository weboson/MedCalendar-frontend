//! массив рандомных цветов 
// для цветных лекарств в WeekGrid.tsx, MonthGrid.tsx, DayGrid.tsx
// используется в DayGrid.tsx, WeekGrid.tsx, MonthGrid.tsx в useEffect

 // метод для рандомного цвета
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      // exm: #123456
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  export const arrayColors = ['blue']; // массив по-умолчанию
  
  [...new Array(100)].map(() => {
    arrayColors.push(getRandomColor())
  })
