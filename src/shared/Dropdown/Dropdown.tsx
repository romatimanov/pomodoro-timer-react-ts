import React, { useState, useEffect } from "react";
import styles from "./dropdown.css";
import classNames from "classnames";

interface IDropdownProps {
  button?: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const NOOP = () => {};

export function Dropdown({
  button,
  children,
  isOpen,
  onOpen = NOOP,
  onClose = NOOP,
}: IDropdownProps) {
  classNames(styles);
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);

  useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  useEffect(() => {
    if (isDropdownOpen) {
      onOpen && onOpen();
    } else {
      onClose && onClose();
    }
  }, [isDropdownOpen, onOpen, onClose]);

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown" onClick={handleContainerClick}>
      {button}
      {isDropdownOpen && (
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      )}
    </div>
  );
}
