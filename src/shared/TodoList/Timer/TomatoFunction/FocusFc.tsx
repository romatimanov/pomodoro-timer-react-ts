import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/reducer";

function calculateFocusPercentages(
  workedSeconds: number[],
  pauseMinutes: number[]
): number {
  const totalSeconds = workedSeconds.reduce(
    (total, seconds) => total + seconds,
    0
  );
  const totalPause = pauseMinutes.reduce(
    (total, seconds) => total + seconds,
    0
  );
  const focusPercentage =
    Math.round(totalSeconds / (totalSeconds + totalPause)) * 100;

  return focusPercentage;
}

interface Ifocus {
  focusStyle: any;
}

export function FocusPercentages({ focusStyle }: Ifocus) {
  const state = useSelector((state: RootState) => state);
  const totalWorkedSeconds = state.workedSeconds;
  const totalPause = state.pauseTimes;
  const focusPercentage = calculateFocusPercentages(
    totalWorkedSeconds,
    totalPause
  );

  return (
    <div>
      <p className={focusStyle}>{focusPercentage}%</p>
    </div>
  );
}
