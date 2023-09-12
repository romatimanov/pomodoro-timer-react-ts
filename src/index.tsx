import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Layout } from "./shared/Layout";
import { Header } from "./shared/Header";
import { TodoList } from "./shared/TodoList";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Statistics } from "./shared/Statistics";
import { Provider } from "react-redux";
import { store } from "./store/reducer";
import { ThemeStyles } from "./shared/ThemeStyle";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ThemeStyles />
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </Layout>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
