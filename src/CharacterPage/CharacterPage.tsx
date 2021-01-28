import React from 'react';
import * as Automerge from "automerge";
import { Grid } from '@material-ui/core';

import './CharacterPage.scss';
import Header from './Header/Header';
import Details from './Details/Details';
import Background from './Background/Background';
import Drives from './Drives/Drives';
import Nature from './Nature/Nature';
import Connections from './Connections/Connections';
import Reputation from './Reputation/Reputation';
import Stats from './Stats/Stats';
import Harm from './Harm/Harm';
import RoguishFeats from './RoguishFeats/RoguishFeats';
import WeaponSkills from './WeaponSkills/WeaponSkills';
import Moves from './Moves/Moves';

import Equipment from './Equipment/Equipment';
import { useCharacter } from '../CharacterProvider';

interface CharacterPageProps {
}

const CharacterPage: React.FC<CharacterPageProps> = (props) => {
  const [character, changeCharacter] = useCharacter();
  const playbook = character.playbook;

  return (
    <Grid container direction="row" alignItems="stretch" className="character-page-container">
      <Grid item xs={12} lg={6} className="page-container">
        <Grid container direction="column" className="page-column">
          <Header name={playbook.name} blurb={playbook.blurb} />
          <Grid item container direction="row" spacing={2} alignItems="stretch" className="main-row">
            <Grid item lg={4} container alignItems="stretch" direction="column" className="first-column">
              <Details />
              <Background />
            </Grid>
            <Grid item lg={4} container alignItems="stretch" direction="column" className="second-column">
              <Grid item container direction="column" className="avatar-box">Hello, {character.name} the {character.species}! Your details are {character.details}, and you're looking quite {character.demeanor} today...</Grid>
              <Drives drives={playbook.drives} />
            </Grid>
            <Grid item lg={4} container alignItems="stretch" direction="column" className="third-column">
              <Nature natures={playbook.natures} />
              <Connections connections={playbook.connections} />
            </Grid>
          </Grid>
          <Reputation />
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6} className="page-container">
        <Grid container direction="column" className="page-column">
          <Grid item container direction="row" spacing={2} alignItems="stretch" className="main-row">
            <Grid item lg={4} container alignItems="stretch" direction="column" className="first-column">
              <Stats stats={playbook.initialStats} />
              <Harm />
              <RoguishFeats />
              <WeaponSkills boldedSkills={playbook.weaponSkills.bolded} />
            </Grid>
            <Grid item lg={8} container alignItems="stretch" direction="column" className="second-column">
              <Moves moves={playbook.moves.options} />
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
  );
}

export default React.memo(CharacterPage);
