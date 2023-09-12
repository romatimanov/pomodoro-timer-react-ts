import { Chart } from "chart.js";
import { useRef, useEffect, useMemo } from "react";
import { MyNewChart } from "./MyChart";
import { RootState, todoSlice } from "../../../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { GetLabels } from "../statisticsFc/getLabels";

interface IDiagramm {
  selectedOption: any;
}

export function Diagramm({ selectedOption }: IDiagramm) {
  const state = useSelector((state: RootState) => state);
  const totalWorkedSeconds = state.workedSeconds;
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const currentDate = useMemo(() => new Date(), []);
  const weekDays = useMemo(
    () => ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const currentDayIndex = (currentDate.getDay() + 6) % 7
    const currentDay = weekDays[currentDayIndex];
    const totalSeconds = totalWorkedSeconds.reduce(
      (total, seconds) => total + seconds,
      0
    );

    dispatch(
      todoSlice.actions.updateDailyWork({
        dayOfWeek: currentDay,
        seconds: totalSeconds,
      })
    );
  }, [currentDate, dispatch, weekDays, totalWorkedSeconds]);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      const labels = GetLabels(selectedOption, currentDate, weekDays);
      const cleanedLabels = labels.map((label) =>
        label.replace(/\d+|\s+/g, "")
      );

      let workedTimes: number[] = [];
      if (selectedOption === "2") {
        workedTimes = cleanedLabels
          .map(
            (label) =>
              (state.weeklyData.week2 as unknown as Record<string, number[]>)[
                label
              ] || 0
          )
          .flat();
      } else if (selectedOption === "3") {
        workedTimes = cleanedLabels
          .map(
            (label) =>
              (state.weeklyData.week3 as unknown as Record<string, number[]>)[
                label
              ] || 0
          )
          .flat();
      } else {
        workedTimes = cleanedLabels
          .map(
            (label) =>
              (state.weeklyData.week1 as unknown as Record<string, number[]>)[
                label
              ] || 0
          )
          .flat();
      }
      chartInstanceRef.current = MyNewChart(
        chartRef.current,
        labels,
        currentDate.getDate(),
        workedTimes
      );
    }
  }, [selectedOption, currentDate, weekDays, state.weeklyData]);

  return <canvas ref={chartRef} id="myChart"></canvas>;
}
