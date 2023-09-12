import styles from "./button.css";
import classNames from "classnames";

interface IButtonProps {
  name: string;
  onClick?: () => void;
}

export function Button({ name, onClick }: IButtonProps) {
  classNames(styles);
  return (
    <button onClick={onClick} className="btn">
      {name}
    </button>
  );
}
