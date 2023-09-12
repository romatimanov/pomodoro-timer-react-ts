export const GetLabels = (
  selectedOption: string,
  currentDate: Date,
  weekDays: string[]
): string[] => {
  const labels: string[] = [];
  for (let i = 0; i < 7; i++) {
    if (selectedOption === "2") {
      const day = new Date(currentDate);
      day.setDate(day.getDate() + i - 7);
      const dayIndex = (day.getDay() + 6) % 7;
      const dayName = weekDays[dayIndex];
      labels.push(`${dayName} ${day.getDate()}`);
    } else if (selectedOption === "3") {
      const day = new Date(currentDate);
      day.setDate(day.getDate() + i - 14);
      const dayIndex = (day.getDay() + 6) % 7;
      const dayName = weekDays[dayIndex];
      labels.push(`${dayName} ${day.getDate()}`);
    } else {
      const day = new Date(currentDate);
      day.setDate(day.getDate() + i);
      const dayIndex = (day.getDay() + 6) % 7;
      const dayName = weekDays[dayIndex];
      labels.push(`${dayName} ${day.getDate()}`);
    }
  }

  return labels;
};
