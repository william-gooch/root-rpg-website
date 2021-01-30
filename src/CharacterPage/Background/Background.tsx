import { Grid, TextField } from '@material-ui/core';
import React from 'react';
import { useCharacter } from '../../CharacterProvider';

const Background: React.FC = () => {
  const [character, changeCharacter] = useCharacter();

  const backgroundWhere = character.backgroundWhere;
  const setBackgroundWhere = React.useCallback(
    (backgroundWhere: string) =>
      changeCharacter(d => (d.backgroundWhere = backgroundWhere)),
    [changeCharacter]
  );
  const backgroundWhy = character.backgroundWhy;
  const setBackgroundWhy = React.useCallback(
    (backgroundWhy: string) =>
      changeCharacter(d => (d.backgroundWhy = backgroundWhy)),
    [changeCharacter]
  );
  const backgroundWho = character.backgroundWho;
  const setBackgroundWho = React.useCallback(
    (backgroundWho: string) =>
      changeCharacter(d => (d.backgroundWho = backgroundWho)),
    [changeCharacter]
  );
  const backgroundFactionServed = character.backgroundFactionServed;
  const setBackgroundFactionServed = React.useCallback(
    (backgroundFactionServed: string) =>
      changeCharacter(
        d => (d.backgroundFactionServed = backgroundFactionServed)
      ),
    [changeCharacter]
  );
  const backgroundFactionEnmity = character.backgroundFactionEnmity;
  const setBackgroundFactionEnmity = React.useCallback(
    (backgroundFactionEnmity: string) =>
      changeCharacter(
        d => (d.backgroundFactionEnmity = backgroundFactionEnmity)
      ),
    [changeCharacter]
  );

  return (
    <Grid item container direction="column" className="background-box">
      <Grid item className="text-field">
        <TextField
          fullWidth
          multiline
          variant="outlined"
          label="Where do you call home?"
          value={backgroundWhere}
          onChange={evt => setBackgroundWhere(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <TextField
          fullWidth
          multiline
          variant="outlined"
          label="Why are you a vagabond?"
          value={backgroundWhy}
          onChange={evt => setBackgroundWhy(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <TextField
          fullWidth
          multiline
          variant="outlined"
          label="Whom have you left behind?"
          value={backgroundWho}
          onChange={evt => setBackgroundWho(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <TextField
          fullWidth
          multiline
          variant="outlined"
          label="Which faction have you served the most?"
          value={backgroundFactionServed}
          onChange={evt => setBackgroundFactionServed(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <TextField
          fullWidth
          multiline
          variant="outlined"
          label="With which faction have you earned a special enmity?"
          value={backgroundFactionEnmity}
          onChange={evt => setBackgroundFactionEnmity(evt.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(Background);
