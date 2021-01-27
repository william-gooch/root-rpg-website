import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { deepOrange, red } from '@material-ui/core/colors';
import React from 'react';
import './App.scss';
import CharacterPage from './CharacterPage/CharacterPage';
import { arbiterData } from './model/playbooks/arbiter';
import { PlaybookProvider } from './PlaybookProvider';

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
      <PlaybookProvider value={arbiterData}>
        <CharacterPage />
      </PlaybookProvider>
    </ThemeProvider>
  );
}

export default App;
