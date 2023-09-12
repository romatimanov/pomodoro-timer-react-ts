import { useEffect, useState } from "react";
import styles from "./statistics.css";
import classNames from "classnames";
import "choices.js/public/assets/styles/choices.min.css";
import { format } from "date-fns";
import ru from "date-fns/locale/ru";
import { Chart, registerables } from "chart.js";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import {
  TimeHour,
  timeAllTime,
} from "../TodoList/Timer/TomatoFunction/TimeHour";
import Tomato from "./tomato1.png";
import Tomato2 from "./tomato2.png";
import Focus from "./focus.png";
import Pause from "./pause.png";
import Stop from "./stop.png";
import { FocusPercentages } from "../TodoList/Timer/TomatoFunction/FocusFc";
import { Diagramm } from "./Chart/Diagramm";
import { Select } from "./statisticsFc/Selecet";

export function Statistics() {
  classNames(styles);
  Chart.register(...registerables);
  const formattedDate = format(new Date(), "eeee", { locale: ru });
  const [focus, setFocus] = useState("statistics-focus");
  const [pause, setPause] = useState("statistics-focus");
  const [stop, setStop] = useState("statistics-focus");
  const stopClick = useSelector((state: RootState) => state.stopClick);
  const totalWorkedSeconds = useSelector(
    (state: RootState) => state.workedSeconds
  );

  const totalPauseInMinutes = useSelector(
    (state: RootState) => state.pauseInMinutes
  );

  const totalWorkedTime = totalWorkedSeconds.reduce(
    (total, seconds) => total + seconds,
    0
  );
  const totalMinutes = Math.floor(totalWorkedTime / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  const tomatoCompleated = useSelector(
    (state: RootState) => state.tomatoCompleated
  );

  const [selectedOption, setSelectedOption] = useState("1");

  useEffect(() => {
    const isTotalWorkedTimePositive = totalWorkedTime > 0;
    const isTotalPausePositive = totalPauseInMinutes >= 1;
    const isStopClickPositive = stopClick >= 1;

    if (isTotalWorkedTimePositive) {
      setFocus("statistics-focus-done");
    }
    if (isTotalPausePositive) {
      setPause("statistics-pause-done");
    }
    if (isStopClickPositive) {
      setStop("statistics-stop-done");
    }
  }, [totalWorkedTime, totalPauseInMinutes, stopClick]);

  return (
    <div>
      <div className="statistics__header">
        <h2 className="statisctics__title">Ваша активность</h2>
        <Select setSelectedOption={setSelectedOption} />
      </div>
      <div className="statistics__pimidoro">
        <div className="pomidoro__small-block">
          <div className="pimidoro__content pomidoro-todo">
            <p className="pomidoro__day">{formattedDate}</p>
            {totalWorkedTime <= 0 ? (
              <p className="pomidoro__time">Нет данных</p>
            ) : (
              <div className="pomidoro__time">
                <p className="pomidoro__day-text">
                  Вы работали над задачами в течение
                  <span className="pomidoro__all-time">
                    {totalHours > 0 && `${totalHours}${TimeHour(totalHours)}`}
                    {remainingMinutes > 0
                      ? `${remainingMinutes} ${timeAllTime(remainingMinutes)}`
                      : `${totalWorkedTime} секунд`}
                  </span>
                </p>
              </div>
            )}
          </div>
          <div className="pimidoro__content pomidoro-comlete">
            {tomatoCompleated <= 0 ? (
              <div className="pomidoro__not">
                <img src={Tomato2} alt="tomato" />
              </div>
            ) : (
              <div className="pomidoro__done">
                <div className="pomidoro__img">
                  <img src={Tomato} alt="tomato" />x {tomatoCompleated}
                </div>
                <div className="pomidoro__done-text">
                  {" "}
                  {tomatoCompleated} Помидор
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="pimidoro__content pomidoro-large">
          <Diagramm selectedOption={selectedOption} />
        </div>
      </div>
      <div className="statistics__pimidoro-bottom">
        <div className={`statisctics__info ${focus}`}>
          <div className="statisctics__about">
            <h1 className="statisctics__info-title">Фокус</h1>
            {totalWorkedTime <= 0 ? (
              <p className="statisctics__info-text">0%</p>
            ) : (
              <FocusPercentages focusStyle={"statisctics__info-text"} />
            )}
          </div>
          <img src={Focus} alt="focus" />
        </div>
        <div className={`statisctics__info ${pause}`}>
          <div className="statiscticks__about">
            <h1 className="statisctics__info-title">Время на паузе</h1>
            {totalPauseInMinutes < 1 ? (
              <p className="statisctics__info-text">0м</p>
            ) : (
              <p className="statisctics__info-text">{totalPauseInMinutes}м</p>
            )}
          </div>
          <img src={Pause} alt="pause" />
        </div>
        <div className={`statisctics__info ${stop}`}>
          <div className="statiscticks__about">
            <h1 className="statisctics__info-title">Остановки</h1>
            {stopClick < 1 ? (
              <p className="statisctics__info-text">0</p>
            ) : (
              <p className="statisctics__info-text">{stopClick}</p>
            )}
          </div>
          <img src={Stop} alt="stop" />
        </div>
      </div>
    </div>
  );
}
