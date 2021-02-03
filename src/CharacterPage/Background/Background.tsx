import { Grid, MenuItem, Select, TextField } from "@material-ui/core";
import React from "react";
import { useCurrentCharacter } from "../../CharacterProvider";

const Background: React.FC = () => {
  const [character, changeCharacter] = useCurrentCharacter();

  const backgroundWhere = character.backgroundWhere;
  const setBackgroundWhere = React.useCallback(
    (backgroundWhere: string) => changeCharacter(d => (d.backgroundWhere = backgroundWhere)),
    [changeCharacter]
  );
  const backgroundWhy = character.backgroundWhy;
  const setBackgroundWhy = React.useCallback(
    (backgroundWhy: string) => changeCharacter(d => (d.backgroundWhy = backgroundWhy)),
    [changeCharacter]
  );
  const backgroundWho = character.backgroundWho;
  const setBackgroundWho = React.useCallback(
    (backgroundWho: string) => changeCharacter(d => (d.backgroundWho = backgroundWho)),
    [changeCharacter]
  );
  const backgroundFactionServed = character.backgroundFactionServed;
  const setBackgroundFactionServed = React.useCallback(
    (backgroundFactionServed: string) => changeCharacter(d => (d.backgroundFactionServed = backgroundFactionServed)),
    [changeCharacter]
  );
  const backgroundFactionEnmity = character.backgroundFactionEnmity;
  const setBackgroundFactionEnmity = React.useCallback(
    (backgroundFactionEnmity: string) => changeCharacter(d => (d.backgroundFactionEnmity = backgroundFactionEnmity)),
    [changeCharacter]
  );

  return (
    <Grid item container direction="column" className="background-box">
      <Grid item className="text-field">
        <div className="question">Where do you call home?</div>
        <TextField
          fullWidth
          multiline
          variant="outlined"
          value={backgroundWhere}
          onChange={evt => setBackgroundWhere(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <div className="question">Why are you a vagabond?</div>
        <TextField
          fullWidth
          multiline
          variant="outlined"
          value={backgroundWhy}
          onChange={evt => setBackgroundWhy(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <div className="question">Whom have you left behind?</div>
        <TextField
          fullWidth
          multiline
          variant="outlined"
          value={backgroundWho}
          onChange={evt => setBackgroundWho(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <div className="question">Which faction have you served the most?</div>
        <Select
          fullWidth
          variant="outlined"
          value={backgroundFactionServed}
          onChange={evt => setBackgroundFactionServed(evt.target.value as string)}
        >
          {character.reputation.map(rep => (
            <MenuItem value={rep.faction}>{rep.faction}</MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item className="text-field">
        <div className="question">With which faction have you earned a special enmity?</div>
        <Select
          fullWidth
          variant="outlined"
          value={backgroundFactionEnmity}
          onChange={evt => setBackgroundFactionEnmity(evt.target.value as string)}
        >
          {character.reputation.map(rep => (
            <MenuItem value={rep.faction}>{rep.faction}</MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default React.memo(Background);
