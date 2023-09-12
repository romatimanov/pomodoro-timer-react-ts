import React, { useState } from "react";
import styles from "./menu.css";
import plus from "./plus.svg";
import minus from "./minus.svg";
import change from "./change.svg";
import del from "./delete.svg";
import classNames from "classnames";
import { Modal } from "../Modal";

interface IMenuProps {
  addNums: () => void;
  delNums: () => void;
  changeTask: () => void;
  deleteTodo: () => void;
  isDelButtonActive: any;
}

export function Menu({
  addNums,
  delNums,
  changeTask,
  deleteTodo,
  isDelButtonActive,
}: IMenuProps) {
  classNames(styles);
  const [isModal, setIsModal] = useState(false);

  return (
    <ul className="menu__list">
      <li className="menu__item">
        <button onClick={addNums} className="menu__btn">
          <span className="menu__icon">
            <img src={plus} alt="plus" />
          </span>
          Увеличить
        </button>
      </li>
      <li className="menu__item">
        <button
          disabled={!isDelButtonActive}
          onClick={delNums}
          className="menu__btn"
        >
          <span className="menu__icon">
            <img src={minus} alt="minus" />
          </span>
          Уменьшить
        </button>
      </li>
      <li className="menu__item">
        <button onClick={changeTask} className="menu__btn">
          <span className="menu__icon">
            <img src={change} alt="change" />
          </span>
          Редактировать
        </button>
      </li>
      <li className="menu__item">
        <button onClick={() => setIsModal(true)} className="menu__btn">
          <span className="menu__icon">
            <img src={del} alt="del" />
          </span>
          Удалить
        </button>
      </li>
      {isModal && (
        <Modal onClose={() => setIsModal(false)} onDelete={deleteTodo} />
      )}
    </ul>
  );
}
