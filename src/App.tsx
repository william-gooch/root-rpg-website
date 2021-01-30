import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { deepOrange, red } from "@material-ui/core/colors";
import React from "react";
import "./App.scss";
import CharacterPage from "./CharacterPage/CharacterPage";
import { CharacterProvider } from "./CharacterProvider";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import { SocketProvider } from "./SocketProvider";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: deepOrange,
    secondary: red,
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
