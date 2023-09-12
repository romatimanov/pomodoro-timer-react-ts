import { useEffect } from "react";
import { RootState } from "../../store/reducer";
import { useSelector } from "react-redux";

export const globalStyles = () => {
  const darkTheme = useSelector((state: RootState) => state.darkTheme);

  useEffect(() => {
    if (!darkTheme) {
      console.log("Светлая тема");
      document.documentElement.style.setProperty("--color-text", "#333");
      document.documentElement.style.setProperty("--bg-color", "#fff");
      document.documentElement.style.setProperty("--bg-timer", "#F4F4F4");
      document.documentElement.style.setProperty("--bg-pomidoro", "#F4F4F4");
      document.documentElement.style.setProperty(
        "--shadow",
        "rgba(0, 0, 0, 0.13)"
      );
    } else {
      console.log("Темная тема");
      document.documentElement.style.setProperty("--color-text", "#fff");
      document.documentElement.style.setProperty("--bg-color", "#3a3a3a");
      document.documentElement.style.setProperty("--bg-timer", "#524e4e");
      document.documentElement.style.setProperty("--bg-pomidoro", "#727272");
      document.documentElement.style.setProperty(
        "--shadow",
        "rgb(112 110 110 / 78%)"
      );
    }
  }, [darkTheme]);
};
