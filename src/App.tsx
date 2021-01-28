import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { deepOrange, red } from '@material-ui/core/colors';
import React from 'react';
import './App.scss';
import CharacterPage from './CharacterPage/CharacterPage';
import { CharacterProvider } from './CharacterProvider';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: deepOrange,
    secondary: red
  }
})

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route 
            path="/character/:id"
            render={props => (
              <CharacterProvider id={props.match.params.id}>
                <CharacterPage />
              </CharacterProvider>
            )}
          />
          <Route path="/">Hello!</Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
