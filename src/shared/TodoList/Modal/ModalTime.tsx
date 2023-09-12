import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./modal.css";
import ReactDOM from "react-dom";
import close from "./close.svg";
import classNames from "classnames";
import { motion } from "framer-motion";
import tomato from "./tomato2.png";

interface IModal {
  onClose?: () => void;
  text: string;
}
const animation = {
  open: { opacity: 1, y: 300, scale: 1, transition: { duration: 0.5 } },
  closed: { opacity: 0, y: 300, scale: 0, transition: { duration: 0.5 } },
};

export function ModalTime({ onClose, text }: IModal) {
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
          <h1 className="modal__title">{text}</h1>
          <div className="tomato__img">
            <img src={tomato} alt="tomato" />
          </div>
          <button
            onClick={() => {
              setInProp(false);
              closeModal();
            }}
            className="modal__close"
          >
            <img src={close} alt="close" />
          </button>
        </div>
      </motion.nav>
    </div>,
    node
  );
}
