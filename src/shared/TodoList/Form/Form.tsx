import React, { ChangeEvent} from "react";
import styles from "./form.css";
import classNames from "classnames";
import { Button } from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState, todoSlice } from "../../../store/reducer";

interface IFormProps {
  onAddTask: (task: string) => void;
}

export function Form({ onAddTask }: IFormProps) {
  classNames(styles);
  const value = useSelector((state: RootState) => state.todoValue);
  const dispatch = useDispatch();

  const handleTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(todoSlice.actions.updateValue({ text: event.target.value }));
  };

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim() !== "") {
      onAddTask(value);
      dispatch(todoSlice.actions.updateValue({ text: "" }));
    }
  };

  return (
    <form className="form" onSubmit={handleAddTask}>
      <input
        type="text"
        className="input"
        placeholder="Название задачи"
        value={value}
        onChange={handleTaskChange}
      />
      <Button name="Добавить" />
    </form>
  );
}
