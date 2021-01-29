import React from "react";
import { History } from "history";
import { Grid, IconButton, TextField } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";

import "./HomePage.scss";

interface HomePageProps {
  history: History;
}

const HomePage: React.FC<HomePageProps> = props => {
  const [id, setId] = React.useState("");

  const navigateToCharacterPage = React.useCallback((id: string) => {
    if(id) {
      props.history.push(`/character/${id}`);
    }
  }, [props.history])

  return (
    <Grid container direction="row" alignItems="center" className="home-page-container">
      <Grid item xs={12} container direction="column" alignItems="center" className="page-container">
        <Grid item xs={3} container direction="column" alignItems="center" className="home-box">
          <h2>Welcome to Root!</h2>
          <h3>Enter a Character ID below to start editing!</h3>
          <TextField variant="outlined" label="Character ID"
            value={id}
            onChange={evt => setId(evt.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => navigateToCharacterPage(id)}>
                  <ChevronRight />
                </IconButton>
              )
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;