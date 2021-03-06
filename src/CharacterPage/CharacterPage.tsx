import React from "react";
import { Grid, IconButton, Snackbar } from "@material-ui/core";

import "./CharacterPage.scss";
import UndoRedo from "./UndoRedo/UndoRedo";
import Header from "./Header/Header";
import Details from "./Details/Details";
import Background from "./Background/Background";
import Drives from "./Drives/Drives";
import Nature from "./Nature/Nature";
import Connections from "./Connections/Connections";
import Reputation from "./Reputation/Reputation";
import Stats from "./Stats/Stats";
import Harm from "./Harm/Harm";
import RoguishFeats from "./RoguishFeats/RoguishFeats";
import WeaponSkills from "./WeaponSkills/WeaponSkills";
import Moves from "./Moves/Moves";
import Avatar from "./Avatar/Avatar";

import Equipment from "./Equipment/Equipment";
import { useCurrentCharacter } from "../CharacterProvider";
import TopBar from "../TopBar/TopBar";
import { Share } from "@material-ui/icons";

import { playbooks } from "root-rpg-model";

const CharacterPage: React.FC = () => {
  const [character, changeCharacter] = useCurrentCharacter();

  const copyLinkToClipboard = React.useCallback(async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  }, []);

  const [copied, setCopied] = React.useState(false);

  const topBar = React.useMemo(
    () => (
      <TopBar>
        <UndoRedo />
        <IconButton onClick={copyLinkToClipboard}>
          <Share />
          <Snackbar
            open={copied}
            onClose={() => setCopied(false)}
            autoHideDuration={4000}
            message="Copied link to clipboard!"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          />
        </IconButton>
      </TopBar>
    ),
    [copied, copyLinkToClipboard]
  );

  if (!character) {
    return <div>Loading...</div>;
  }

  const playbook = playbooks[character.playbook];

  return (
    <>
      {topBar}
      <Grid container direction="row" alignItems="stretch" className="character-page-container">
        <Grid item xs={12} xl={6} className="page-container">
          <Grid container direction="column" className="page-column">
            <Header name={playbook.name} blurb={playbook.blurb} />
            <Grid item container direction="row" spacing={2} alignItems="stretch" className="main-row">
              <Grid item md={4} container alignItems="stretch" direction="column" className="first-column">
                <Details />
                <Background />
              </Grid>
              <Grid item md={4} container alignItems="stretch" direction="column" className="second-column">
                <Avatar playbookName={character.playbook} />
                <Drives />
              </Grid>
              <Grid item md={4} container alignItems="stretch" direction="column" className="third-column">
                <Nature />
                <Connections />
              </Grid>
            </Grid>
            <Reputation />
          </Grid>
        </Grid>
        <Grid item xs={12} xl={6} className="page-container">
          <Grid container direction="column" className="page-column">
            <Grid item container direction="row" spacing={2} alignItems="stretch" className="main-row">
              <Grid item md={4} container alignItems="stretch" direction="column" className="first-column">
                <Stats />
                <Harm />
                <RoguishFeats />
                <WeaponSkills />
              </Grid>
              <Grid item md={8} container alignItems="stretch" direction="column" className="second-column">
                <Moves />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="page-container">
          <Grid container direction="column" className="page-column">
            <Equipment />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(CharacterPage);
