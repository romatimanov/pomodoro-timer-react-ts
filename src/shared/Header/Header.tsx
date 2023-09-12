import classNames from "classnames";
import styles from "./header.css";
import staticLogo from "./static-logo.svg";
import light from "./light.svg";
import moon from "./moon.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, todoSlice } from "../../store/reducer";

export function Header() {
  classNames(styles);
  const dispatch = useDispatch();
  const darkTheme = useSelector((state: RootState) => state.darkTheme);
  const toggleDarkTheme = () => {
    dispatch(todoSlice.actions.toggleTheme());
  };

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <Link to={`/`} className="header__link">
            <img src="/logo.png" alt="logo" />
          </Link>
        </div>
        <div className="icon__group">
          <button onClick={toggleDarkTheme}>
            {darkTheme ? (
              <img src={moon} alt="moon" />
            ) : (
              <img src={light} alt="light" />
            )}
          </button>
          <Link to={`/statistics`} className="header__link">
            <img src={staticLogo} className="header__static" alt="logo" />
            Статистика
          </Link>
        </div>
      </div>
    </header>
  );
}
