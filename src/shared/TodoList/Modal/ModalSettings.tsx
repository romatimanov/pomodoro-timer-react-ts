import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./modal.css";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { todoSlice } from "../../../store/reducer";
import settings from "../Timer/settings.svg";

interface IModal {
  onClose?: () => void;
  time: any;
  breakTime: any;
  longBreakTime: any;
  howBreaks: any;
  notification: any;
}
const animation = {
  open: { opacity: 1, y: 300, scale: 1, transition: { duration: 0.5 } },
  closed: { opacity: 0, y: 300, scale: 0, transition: { duration: 0.5 } },
};

export function ModalSettings({
  onClose,
  time,
  breakTime,
  longBreakTime,
  howBreaks,
  notification,
}: IModal) {
  classNames(styles);
  const ref = useRef<HTMLDivElement>(null);
  const [inProp, setInProp] = useState(true);
  const dispatch = useDispatch();

  const handleNotification = () => {
    dispatch(todoSlice.actions.setNotification());
  };

  const handleIncrementTime = () => {
    dispatch(todoSlice.actions.incrementTime());
  };
  const handleDecrementTime = () => {
    dispatch(todoSlice.actions.decrementTime());
  };
  const handleBreakIncrementTime = () => {
    dispatch(todoSlice.actions.breakIncrementTime());
  };
  const handleBreakDecrementTime = () => {
    dispatch(todoSlice.actions.breakDecrementTime());
  };
  const handleLongBreakIncrementTime = () => {
    dispatch(todoSlice.actions.longBreakIncrementTime());
  };
  const handleLongBreakDecrementTime = () => {
    dispatch(todoSlice.actions.longBreakDecrementTime());
  };
  const handleHowBreaksIncrement = () => {
    dispatch(todoSlice.actions.howBreaksIncrement());
  };
  const handleHowBreaksDecrement = () => {
    dispatch(todoSlice.actions.howBreaksDecrement());
  };

  const closeModal = useCallback(() => {
    setInProp(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const modalContent = document.querySelector(".modal__content");
      if (
        event.target instanceof Node &&
        modalContent &&
        !modalContent.contains(event.target)
      ) {
        closeModal();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [closeModal]);

  const node = document.querySelector("#modal");
  if (!node) return null;

  return ReactDOM.createPortal(
    <div className="modal" ref={ref}>
      <motion.nav
        initial="closed"
        animate={inProp ? "open" : "closed"}
        variants={animation}
      >
        <div className="modal__content settings-content">
          <h1 className="modal__title">Настройки</h1>
          <p className="setting__text">Уведомления</p>
          <button className={`notification__btn ${notification ? "notification__on" : "notification__off"}`} onClick={handleNotification}>
            {notification ? "Вкл" : "Выкл"}
          </button>
          <p className="setting__text">Продолжительность "помидора"</p>
          <div className="settings__btn-group">
            <button className="settings__btn" onClick={handleDecrementTime}>
              <span className="settings__decrement"></span>
            </button>
            <p className="settings__time">{time / 60}</p>
            <button className="settings__btn" onClick={handleIncrementTime}>
              <img src={settings} alt="plus" />
            </button>
          </div>
          <p className="setting__text">Продолжительность короткого перерыва</p>
          <div className="settings__btn-group">
            <button
              className="settings__btn"
              onClick={handleBreakDecrementTime}
            >
              <span className="settings__decrement"></span>
            </button>
            <p className="settings__time">{breakTime / 60}</p>
            <button
              className="settings__btn"
              onClick={handleBreakIncrementTime}
            >
              <img src={settings} alt="plus" />
            </button>
          </div>
          <p className="setting__text">Продолжительность длинного перерыва</p>
          <div className="settings__btn-group">
            <button
              className="settings__btn"
              onClick={handleLongBreakDecrementTime}
            >
              <span className="settings__decrement"></span>
            </button>
            <p className="settings__time">{Math.round(longBreakTime / 60)}</p>
            <button
              className="settings__btn"
              onClick={handleLongBreakIncrementTime}
            >
              <img src={settings} alt="plus" />
            </button>
          </div>
          <p className="setting__text">Частота длинных перерывов</p>
          <div className="settings__btn-group">
            <button
              className="settings__btn"
              onClick={handleHowBreaksDecrement}
            >
              <span className="settings__decrement"></span>
            </button>
            <p className="settings__time">{howBreaks}</p>
            <button
              className="settings__btn"
              onClick={handleHowBreaksIncrement}
            >
              <img src={settings} alt="plus" />
            </button>
          </div>
          <button
            onClick={() => {
              setInProp(false);
              closeModal();
            }}
            className="modal__done"
          >
            Применить
          </button>
        </div>
      </motion.nav>
    </div>,
    node
  );
}
