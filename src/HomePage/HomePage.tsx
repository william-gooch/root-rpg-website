import React from "react";
import { History } from "history";
import { Grid, IconButton, TextField, Typography } from "@material-ui/core";
import { ChevronRight, AccountCircle, ExitToApp } from "@material-ui/icons";

import "./HomePage.scss";
import TopBar from "../TopBar/TopBar";
import PlaybookPopup from "./PlaybookPopup/PlaybookPopup";

import character from "api/character";
import CampaignList from "./CampaignList/CampaignList";
import { useDispatch, useSelector } from "react-redux";
import LoginPopup from "LoginPopup/LoginPopup";
import { logout } from "redux/actions/user";
import MyCharacterList from "./MyCharacterList/MyCharacterList";
import CampaignPopup from "./CampaignPopup/CampaignPopup";

interface HomePageProps {
  history: History;
}

const HomePage: React.FC<HomePageProps> = props => {
  const [id, setId] = React.useState("");
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [campaignOpen, setCampaignOpen] = React.useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user.user);

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
      props.history.push(`/character/${characterId}`);
    },
    [props.history]
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
      <CampaignPopup open={campaignOpen} onClose={() => setCampaignOpen(false)} />
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
          {user && <CampaignList newCampaign={() => setCampaignOpen(true)} />}
          {user && <MyCharacterList newCharacter={() => setPopupOpen(true)} />}
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
