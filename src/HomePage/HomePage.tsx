import React from "react";
import { History } from "history";
import { Button, Grid, IconButton, TextField } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";

import "./HomePage.scss";
import { useSocket } from "../SocketProvider";
import TopBar from "../TopBar/TopBar";

interface HomePageProps {
  history: History;
}

const HomePage: React.FC<HomePageProps> = props => {
  const [id, setId] = React.useState("");
  const socket = useSocket();

  const navigateToCharacterPage = React.useCallback(
    (id: string) => {
      if (id) {
        props.history.push(`/character/${id}`);
      }
    },
    [props.history]
  );

  const createNewCharacter = React.useCallback(() => {
    socket.send(JSON.stringify({ action: "new-document" }));
  }, [socket]);

  return (
    <>
      <TopBar />
      <Grid
        container
        direction="row"
        alignItems="center"
        className="home-page-container"
      >
        <Grid
          item
          xs={12}
          container
          direction="column"
          alignItems="center"
          className="page-container"
        >
          <Grid
            item
            xs={3}
            container
            direction="column"
            alignItems="center"
            className="home-box"
          >
            <h2>Welcome to Root!</h2>
            <h3>Enter a Character ID below to start editing!</h3>
            <TextField
              variant="outlined"
              label="Character ID"
              value={id}
              onChange={evt => setId(evt.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => navigateToCharacterPage(id)}>
                    <ChevronRight />
                  </IconButton>
                ),
              }}
            />
            <Button onClick={createNewCharacter}>Create New Character</Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
