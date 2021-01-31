import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import React from "react";
import "./App.scss";
import CharacterPage from "./CharacterPage/CharacterPage";
import { CharacterProvider } from "./CharacterProvider";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import { SocketProvider } from "./SocketProvider";

import styles from "./styles/_variables.scss";
console.log(styles);

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: styles.colorPrimary,
      light: styles.colorPrimaryLight,
      dark: styles.colorPrimaryDark,
      contrastText: styles.colorText,
    },
    secondary: {
      main: styles.colorSecondary,
      light: styles.colorSecondaryLight,
      dark: styles.colorSecondaryDark,
      contrastText: styles.colorText,
    },
  },
});

const App: React.FC = () => {
  return (
    <Router>
      <SocketProvider>
        <ThemeProvider theme={theme}>
          <CharacterProvider>
            <Switch>
              <Route path="/character/:id" component={CharacterPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </CharacterProvider>
        </ThemeProvider>
      </SocketProvider>
    </Router>
  );
};

export default App;
