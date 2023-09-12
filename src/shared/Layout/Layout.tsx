import React from "react";
import styles from "./layout.css";
import classNames from "classnames";

interface ILayputProps {
  children?: React.ReactNode;
}

export function Layout({ children }: ILayputProps) {
  classNames(styles);
  return <div className={'layout'}>{children}</div>;
}
