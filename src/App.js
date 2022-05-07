import "./App.css";
import React, { useContext } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import Home from "./components/home/Home";
import injectContext from "./components/ducks/appContext";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Context } from "./components/ducks/appContext";

function App() {
  const { store, actions } = useContext(Context);
  let theme = createTheme({
    palette: {
      mode: store.isDark ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/home" component={Home} />
          </Switch>
        </HashRouter>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default injectContext(App);
