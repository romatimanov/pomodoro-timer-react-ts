import { Dispatch } from "@reduxjs/toolkit";
import { RootState, todoSlice } from "../../../store/reducer";

export const updateWorkedSeconds =
  (seconds: number[]) => (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(todoSlice.actions.updateWorkedSeconds(seconds));

    const state = getState();
    const currentDate = new Date();
    const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

    const dailyWork: { [key: string]: number } = {};

    weekDays.forEach((day) => {
      dailyWork[day] = 0;
    });

    let currentDatePointer = new Date(startOfWeek);

    while (currentDatePointer <= currentDate) {
      const dayOfWeek = weekDays[currentDatePointer.getDay()];
      const dateString = `${dayOfWeek} ${currentDatePointer.getDate()}`;
      const totalSeconds =
        state.workedSeconds[currentDatePointer.getDay()] || 0;
      dailyWork[dateString] = totalSeconds;
      currentDatePointer.setDate(currentDatePointer.getDate() + 1);
    }

    dispatch(todoSlice.actions.updateDailyWork(dailyWork));
  };