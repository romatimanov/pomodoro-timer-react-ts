import React, { useState } from "react";
import styles from "./todolist.css";
import classNames from "classnames";
import { Form } from "./Form";
import { Dropdown } from "../Dropdown";
import menuIcon from "./menu.svg";
import { Menu } from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState, todoSlice } from "../../store/reducer";
import { Timer } from "./Timer";
import { TimeHour } from "./Timer/TomatoFunction/TimeHour";
import { motion } from "framer-motion";

export function TodoList() {
  classNames(styles);
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.count);
  const tasks = useSelector((state: RootState) => state.tasks);
  const time = useSelector((state: RootState) => state.time);
  const breakTime = useSelector((state: RootState) => state.breakTime);
  const longBreakTime = useSelector((state: RootState) => state.longBreakTime);
  const howBreaks = useSelector((state: RootState) => state.howBreaks);
  const dropdown = useSelector((state: RootState) => state.dropdownStates);
  const [editedTask, setEditedTask] = useState<number | null>(null);
  const [isRun, setIsRun] = useState(false);
  const [tasksToRemove, setTasksToRemove] = useState<number[]>([]);
  const animation = {
    open: { x: 0, transition: { duration: 0.8 } },
    closed: { x: -500, transition: { duration: 0.5 } },
  };

  const addTask = (task: any) => {
    dispatch(todoSlice.actions.addTask(task));
    dispatch(todoSlice.actions.setTime(time));
    dispatch(todoSlice.actions.setBreakTime(breakTime));
    dispatch(todoSlice.actions.setLongBreakTime(longBreakTime));
    dispatch(todoSlice.actions.setHowBreaks(howBreaks));
  };

  const toggleDropdown = (index: number) => {
    dispatch(
      todoSlice.actions.updateDropdownState({
        index,
        isOpen: !dropdown[index],
      })
    );

    setEditedTask(null);
  };

  const handleAddNum = (index: number) => {
    const updatedCountArray = [...count];
    updatedCountArray[index] = (updatedCountArray[index] || 1) + 1;
    const newTime = updatedCountArray[index] * time;
    dispatch(
      todoSlice.actions.updateTask({
        index,
        task: tasks[index],
        count: updatedCountArray[index],
        time: newTime,
      })
    );
    dispatch(todoSlice.actions.setTime(time));
    dispatch(todoSlice.actions.setBreakTime(breakTime));
    dispatch(todoSlice.actions.setLongBreakTime(longBreakTime));
    dispatch(todoSlice.actions.setHowBreaks(howBreaks));
  };

  const handleDelNum = (index: number) => {
    const updatedCountArray = [...count];
    updatedCountArray[index] = (updatedCountArray[index] || 1) - 1;
    const newTime = Math.max(time - time, 0);
    dispatch(
      todoSlice.actions.updateTask({
        index,
        task: tasks[index],
        count: updatedCountArray[index],
        time: newTime,
      })
    );
    dispatch(todoSlice.actions.setTime(time));
    dispatch(todoSlice.actions.setBreakTime(breakTime));
    dispatch(todoSlice.actions.setLongBreakTime(longBreakTime));
    dispatch(todoSlice.actions.setHowBreaks(howBreaks));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = e.target.value;
    dispatch(
      todoSlice.actions.updateTask({
        index,
        task: updatedTasks[index],
        count: count[index],
        time: time,
        breakTime: breakTime,
        longBreakTime: longBreakTime,
        howBreaks: howBreaks
      })
    );
  };

  const deleteTodo = (index: number) => {
    setTasksToRemove((prevTasksToRemove) => [...prevTasksToRemove, index]);
    setIsRun(true);
    setTimeout(() => {
      const newTasksToRemove = tasksToRemove.filter(
        (taskIndex) => taskIndex !== index
      );
      setTasksToRemove(newTasksToRemove);
      dispatch(todoSlice.actions.deleteTask(index));
      dispatch(
        todoSlice.actions.updateDropdownState({
          index,
          isOpen: !dropdown[index],
        })
      );
    }, 500);
  };

  const totalTaskTime = count.reduce(
    (total, taskCount) => total + taskCount * time,
    0
  );

  const totalHours = Math.floor(totalTaskTime / 60);
  const totalMinutes = totalTaskTime % 60;

  return (
    <div className="todo__content">
      <div className="todo__main">
        <h1 className="todo__title">Ура! Теперь можно начать работать:</h1>
        <ul className="todo__list">
          <li className="todo__text">
            Выберите категорию и напишите название текущей задачи
          </li>
          <li className="todo__text">Запустите таймер («помидор»)</li>
          <li className="todo__text">Работайте пока «помидор» не прозвонит</li>
          <li className="todo__text">Сделайте короткий перерыв (3-5 минут)</li>
          <li className="todo__text">
            Продолжайте работать «помидор» за «помидором», пока задача не будут
            выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30
            минут).
          </li>
        </ul>
        <Form onAddTask={addTask} />

        <ul>
          {tasks.map((task: string, index: number) => (
            <motion.li
              key={index}
              className="todo__new"
              variants={animation}
              initial="closed"
              animate={tasksToRemove.includes(index) ? "closed" : "open"}
              exit="open"
            >
              <div className="todo__text-list">
                <span className="todo__num">{count[index]}</span>
                {editedTask === index ? (
                  <input
                    className="input__change"
                    type="text"
                    value={task}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                ) : (
                  task
                )}
              </div>
              <button onClick={() => toggleDropdown(index)}>
                <img src={menuIcon} alt="menu" />
              </button>
              {dropdown[index] && (
                <Dropdown isOpen={true} onClose={() => toggleDropdown(index)}>
                  <Menu
                    addNums={() => handleAddNum(index)}
                    delNums={() => handleDelNum(index)}
                    changeTask={() => setEditedTask(index)}
                    deleteTodo={() => deleteTodo(index)}
                    isDelButtonActive={count[index] > 1}
                  />
                </Dropdown>
              )}
            </motion.li>
          ))}
        </ul>
        {tasks.length > 0 && (
          <div className="all__time">
            {totalHours > 0 && `${totalHours}${TimeHour(totalHours)}`}
            {totalMinutes > 0 && `${totalMinutes} мин`}
          </div>
        )}
      </div>
      <Timer
        todo={tasks.length > 0 ? tasks[0] : ""}
        disBtn={tasks.length > 0}
        isRun={isRun}
        delTodo={() => deleteTodo(0)}
        time={time * 60}
        breakTime={breakTime * 60}
        longBreakTime={longBreakTime * 60}
        howBreaks={howBreaks}
      />
    </div>
  );
}
