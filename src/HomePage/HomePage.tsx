import React from "react";
import { History } from "history";
import { Grid, IconButton, TextField, Typography } from "@material-ui/core";
import { Add, ChevronRight, AccountCircle, ExitToApp } from "@material-ui/icons";

import "./HomePage.scss";
import TopBar from "../TopBar/TopBar";
import { useCharacterContext } from "../CharacterProvider";
import CharacterItem from "./CharacterItem/CharacterItem";
import { Character } from "root-rpg-model";
import PlaybookPopup from "./PlaybookPopup/PlaybookPopup";

import character from "api/character";
import CampaignList from "./CampaignList/CampaignList";
import { useDispatch, useSelector } from "react-redux";
import LoginPopup from "LoginPopup/LoginPopup";
import { logout } from "redux/actions/user";

interface HomePageProps {
  history: History;
}

const HomePage: React.FC<HomePageProps> = props => {
  const [id, setId] = React.useState("");
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);

  const characterContext = useCharacterContext();
  const [characters, setCharacters] = React.useState<{
    [key: string]: Character | undefined;
  }>();

  const dispatch = useDispatch();

  const getNewStorage = React.useCallback(() => {
    const characterIds = JSON.parse(localStorage.getItem("myCharacters") ?? "[]");
    const characters = characterContext.getCharacters(characterIds);
    setCharacters(characters);
  }, [characterContext]);

  const user = useSelector((state: any) => state.user.user);

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

  const createNewCharacter = React.useCallback(
    async (playbookName: string) => {
      const characterId = await character.new(playbookName as any);
      let charactersToSave = "";
      const charactersString = localStorage.getItem("myCharacters");
      if (charactersString) {
        const characters = JSON.parse(charactersString) as string[];
        characters.push(characterId);
        charactersToSave = JSON.stringify(characters);
      } else {
        charactersToSave = JSON.stringify([characterId]);
      }
      localStorage.setItem("myCharacters", charactersToSave);

      props.history.push(`/character/${characterId}`);
    },
    [props.history]
  );

  const deleteCharacter = React.useCallback(
    async (id: string) => {
      const characterIds: string[] = JSON.parse(localStorage.getItem("myCharacters") ?? "[]");
      const newCharacterIds = characterIds.filter(x => x !== id);

      localStorage.setItem("myCharacters", JSON.stringify(newCharacterIds));

      await character.delete(id);

      getNewStorage();
    },
    [getNewStorage]
  );

  return (
    <>
      <TopBar>
        {user ? (
          <>
            <Typography variant="h6">Hello, {user.username}!</Typography>
            <IconButton edge="start" onClick={() => dispatch(logout())} style={{ marginLeft: "0.3vw" }}>
              <ExitToApp />
            </IconButton>
          </>
        ) : (
          <IconButton edge="start" onClick={() => setLoginOpen(true)}>
            <AccountCircle />
          </IconButton>
        )}
      </TopBar>
      <PlaybookPopup open={popupOpen} onClose={() => setPopupOpen(false)} onSubmit={createNewCharacter} />
      <LoginPopup open={!user && loginOpen} onClose={() => setLoginOpen(false)} />
      <Grid container direction="column" alignItems="center" className="home-page-container">
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
          <Grid item xs={12} md={3} container direction="column" alignItems="center" className="home-box">
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
          {user && <CampaignList />}
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
              <Grid item xs={12} md={3} className="new-character-container">
                <div role="button" className="new-character-button" onClick={() => setPopupOpen(true)}>
                  <Grid container direction="column" alignItems="center" justify="center" className="new-character-box">
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
