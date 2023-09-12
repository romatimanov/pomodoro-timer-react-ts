import { createSlice, configureStore } from "@reduxjs/toolkit";
import { loadStateFromLocalStorage, saveStateToLocalStorage } from "./localStorage";

const initialState = loadStateFromLocalStorage() || {
    todoValue: "",
    tasks: [],
    count: [],
    dropdownStates: [],
    time: 25,
    breakTime: 4,
    longBreakTime: 8,
    tomatoCompleated: 0,
    workedSeconds: [],
    pause: 0,
    pauseInMinutes: 0,
    pauseTimes: [],
    stopClick: 0,
    howBreaks: 4,
    dailyWork: {},
    weeklyData: {
      week1: [],
      week2: [],
      week3: [],
    },
    darkTheme: false,
    notification: true
  };

export type RootState = {
    todoValue: string;
    tasks: string[],
    count: number[],
    dropdownStates: boolean[],
    time: number,
    breakTime:number,
    longBreakTime: number,
    tomatoCompleated: number,
    workedSeconds: number[],
    pause: number,
    pauseInMinutes: number,
    pauseTimes: number[],
    stopClick: number,
    howBreaks: number,
    dailyWork: { [dayOfWeek: string]: number }; 
    weeklyData: {
      week1: number[]; 
      week2: number[]; 
      week3: number[];
    };
    darkTheme: boolean
    notification: boolean
  };
  
export const todoSlice = createSlice({
    name: "todoValue",
    initialState: initialState,
    reducers: {
        updateValue: (state, action) => {
         state.todoValue = action.payload.text;
        },
        addTask: (state, action) => {
          state.tasks.push(action.payload);
          state.time = action.payload.time 
          state.breakTime = action.payload.breakTime
          state.longBreakTime = action.payload.longBreakTime
          state.howBreaks = action.payload.howBreaks
          state.count.push(1)
        },
        updateTask: (state, action) => {
          const { index, task, count, time, breakTime, longBreakTime,howBreaks } = action.payload;
          state.tasks[index] = task;
          state.count[index] = count
          state.time = time
          state.breakTime = breakTime
          state.longBreakTime = longBreakTime
          state.howBreaks = howBreaks
        },
        deleteTask: (state, action) => {
          const index = action.payload;
          state.tasks.splice(index, 1);
          state.count.splice(index, 1)
        },
        updateDropdownState: (state, action) => {
          const { index, isOpen } = action.payload;
          state.dropdownStates[index] = isOpen;
        },
        updateTomato: (state, action) => {
          state.tomatoCompleated += action.payload.amount
        },
        updateWorkedSeconds: (state, action) => {
          state.workedSeconds = [...state.workedSeconds, ...action.payload]; 
        },
        startPause: (state) => {
            state.pauseTimes.push(Date.now()); 
          },
        endPause: (state) => {
          const lastPauseStartTime = state.pauseTimes.pop();
          if (lastPauseStartTime) {
            const pauseDuration = Date.now() - lastPauseStartTime;
            state.pause += pauseDuration; 
            state.pauseInMinutes = Math.floor(state.pause / 60000);
          }
        },
        updateStopClick: (state, action) => {
          state.stopClick += action.payload.amount
          },
        updateDailyWork: (state, action) => {
          const { dayOfWeek, seconds } = action.payload;
          const currentWeek = 'week1';
          const updatedWeekData = { ...state.weeklyData[currentWeek] };
          updatedWeekData[dayOfWeek] = seconds;
          state.weeklyData[currentWeek] = updatedWeekData;
          },
          
        updateDailyWorkForWeek: (state, action) => {
          state.dailyWork = action.payload;
          },
          toggleTheme: (state) => {
            state.darkTheme = !state.darkTheme;
            localStorage.setItem("darkTheme", state.darkTheme ? "true" : "false");
          },
          incrementTime: (state) => {
            state.time += 1;
          },
          decrementTime: (state) => {
            if(state.time > 1) {
              state.time -= 1;
            }
          },
          breakIncrementTime: (state) => {
            state.breakTime += 1;
          },
          breakDecrementTime: (state) => {
            if(state.breakTime > 1) {
              state.breakTime -= 1;
            }
          },
          longBreakIncrementTime: (state) => {
            state.longBreakTime += 1;
          },
          longBreakDecrementTime: (state) => {
            if(state.longBreakTime > 1) {
              state.longBreakTime -= 1;
            }
          },
          howBreaksIncrement: (state) => {
            state.howBreaks += 1;
          },
          howBreaksDecrement: (state) => {
            if(state.howBreaks > 1) {
              state.howBreaks -= 1;
            }
          },
            setTime: (state, action) => {
            state.time = action.payload;
          },
          setBreakTime: (state, action) => {
            state.breakTime = action.payload;
          },
           setLongBreakTime: (state, action) => {
            state.longBreakTime = action.payload;
          },
          setHowBreaks: (state, action) => {
            state.howBreaks = action.payload;
          },
          setNotification: (state) => {
            state.notification = !state.notification;
          },
    },
});

export const store = configureStore({
  reducer: todoSlice.reducer,
  devTools: true,
  preloadedState: initialState,
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});
