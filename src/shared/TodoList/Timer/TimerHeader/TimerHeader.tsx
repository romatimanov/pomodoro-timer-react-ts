import React from "react";

interface TimerHeaderProps {
  startHeaderColor: string;
  todo: string;
  startBreak: boolean;
  tomatoes: number;
  breakTomatos: number;
}

export const TimerHeader: React.FC<TimerHeaderProps> = ({
  startHeaderColor,
  todo,
  startBreak,
  tomatoes,
  breakTomatos,
}) => {
  return (
    <div className={startHeaderColor}>
      <p className="timer__text">{todo}</p>
      {startBreak ? (
        <p className="timer__text">Перерыв {breakTomatos}</p>
      ) : (
        <p className="timer__text">Помидор {tomatoes}</p>
      )}
    </div>
  );
};
