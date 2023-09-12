export function TimeHour(time: number) {
  const lastDigit = time % 10;
  if (lastDigit === 1 && time !== 11) {
    return " час ";
  } else if (
    (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) &&
    (time < 10 || time > 20)
  ) {
    return " часа ";
  } else {
    return " часов ";
  }
}

export function timeAllTime(time: number) {
  if (time >= 2 && time <= 20) {
    return "минут ";
  } else {
    const lastDigit = time % 10;
    if (lastDigit === 1) {
      return " минуты ";
    } else {
      return " минут ";
    }
  }
}
