import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./modal.css";
import ReactDOM from "react-dom";
import close from "./close.svg";
import classNames from "classnames";
import { motion } from "framer-motion";

interface IModal {
  onClose?: () => void;
  onDelete: () => void;
}
const animation = {
  open: { opacity: 1, y: 300, scale: 1, transition: { duration: 0.5 } },
  closed: { opacity: 0, y: 300, scale: 0, transition: { duration: 0.5 } },
};

export function Modal({ onClose, onDelete }: IModal) {
  classNames(styles);
  const ref = useRef<HTMLDivElement>(null);
  const [inProp, setInProp] = useState(true);

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
        <div className="modal__content">
          <button
            onClick={() => {
              setInProp(false);
              closeModal();
            }}
            className="modal__close"
          >
            <img src={close} alt="close" />
          </button>
          <h2 className="modal__title">Удалить задачу?</h2>
          <button
            onClick={() => {
              setInProp(false);
              onDelete();
            }}
            className="modal__delete"
          >
            Удалить
          </button>
          <button
            onClick={() => {
              setInProp(false);
              closeModal();
            }}
            className="modal__cancel"
          >
            Отмена
          </button>
        </div>
      </motion.nav>
    </div>,
    node
  );
}
