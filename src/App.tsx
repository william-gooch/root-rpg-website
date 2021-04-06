import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import React from "react";
import "./App.scss";

import { Provider as ReduxProvider } from "react-redux";
import store from "redux/store";

import CharacterPage from "./CharacterPage/CharacterPage";
import CampaignPage from "CampaignPage/CampaignPage";
import { CharacterProvider } from "./CharacterProvider";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import { SocketProvider } from "./SocketProvider";

import SocialButtons from "SocialButtons/SocialButtons";

import styles from "./styles/index.module.scss";

console.log(styles);

export const defaultTheme = createMuiTheme({
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
    error: {
      main: styles.colorNegative,
    },
    success: {
      main: styles.colorPositive,
    },
  },
});

export const positiveNegativeTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: styles.colorPositive,
    },
    secondary: {
      main: styles.colorNegative,
    },
  },
});

const App: React.FC = () => {
  return (
    <Router>
      <ReduxProvider store={store}>
        <SocketProvider>
          <ThemeProvider theme={defaultTheme}>
            <CharacterProvider>
              <Switch>
                <Route path="/character/:id" component={CharacterPage} />
                <Route path="/campaign/:id" component={CampaignPage} />
                <Route path="/" component={HomePage} />
              </Switch>
              <SocialButtons />
            </CharacterProvider>
          </ThemeProvider>
        </SocketProvider>
      </ReduxProvider>
    </Router>
  );
};

export default App;
