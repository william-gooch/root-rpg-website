import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { deepOrange, red } from '@material-ui/core/colors';
import React from 'react';
import './App.scss';
import CharacterPage from './CharacterPage/CharacterPage';
import { CharacterProvider } from './CharacterProvider';

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
      <CharacterProvider>
        <CharacterPage />
      </CharacterProvider>
    </ThemeProvider>
  );
}

export default App;
