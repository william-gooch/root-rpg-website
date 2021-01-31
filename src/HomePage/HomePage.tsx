import React from "react";
import { History } from "history";
import { Button, Grid, IconButton, TextField } from "@material-ui/core";
import { Add, ChevronRight } from "@material-ui/icons";

import "./HomePage.scss";
import { useSocket } from "../SocketProvider";
import TopBar from "../TopBar/TopBar";
import { useCharacterContext } from "../CharacterProvider";
import CharacterItem from "./CharacterItem/CharacterItem";
import { Character } from "root-rpg-model";

interface HomePageProps {
  history: History;
}

const HomePage: React.FC<HomePageProps> = props => {
  const [id, setId] = React.useState("");
  const socket = useSocket();

  const characterContext = useCharacterContext();
  const [characters, setCharacters] = React.useState<{
    [key: string]: Character | undefined;
  }>();

  const getNewStorage = React.useCallback(() => {
    console.log("getting new storage");
    const characterIds = JSON.parse(
      localStorage.getItem("myCharacters") ?? "[]"
    );
    const characters = characterContext.getCharacters(characterIds);
    setCharacters(characters);
  }, [characterContext]);

  React.useEffect(() => {
    getNewStorage();
  }, [getNewStorage]);

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

  const deleteCharacter = React.useCallback(
    (id: string) => {
      const characterIds: string[] = JSON.parse(
        localStorage.getItem("myCharacters") ?? "[]"
      );
      const newCharacterIds = characterIds.filter(x => x !== id);

      localStorage.setItem("myCharacters", JSON.stringify(newCharacterIds));
      getNewStorage();
    },
    [socket, getNewStorage]
  );

  return (
    <>
      <TopBar />
      <Grid
        container
        direction="column"
        alignItems="center"
        className="home-page-container"
      >
        <Grid
          item
          xs={12}
          container
          direction="column"
          wrap="nowrap"
          alignItems="center"
          justify="space-evenly"
          className="page-container"
        >
          <Grid
            item
            xs={12}
            md={3}
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
          </Grid>
          <Grid item className="my-box">
            <h2>Your Characters</h2>
            <Grid container direction="row" alignItems="stretch">
              {Object.entries(characters ?? {}).map(
                ([id, character]) =>
                  character && (
                    <CharacterItem
                      key={id}
                      character={character}
                      goToCharacter={() => navigateToCharacterPage(id)}
                      deleteCharacter={() => deleteCharacter(id)}
                    />
                  )
              )}
              <Grid item xs={12} md={3} className="character-container">
                <div
                  role="button"
                  className="new-character-button"
                  onClick={createNewCharacter}
                >
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    className="new-character-box"
                  >
                    <Grid item>
                      <Add />
                    </Grid>
                    <Grid item>New Character</Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
