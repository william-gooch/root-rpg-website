import { Grid, MenuItem, Select, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { playbooks } from "root-rpg-model";
import { useCurrentCharacter } from "../../CharacterProvider";

const Background: React.FC = () => {
  const [character, changeCharacter] = useCurrentCharacter();

  const background = character.background;
  const changeBackground = React.useCallback(
    (key: string, value: string) => changeCharacter(d => (d.background[key] = value)),
    [changeCharacter]
  );

  return React.useMemo(
    () => (
      <Grid item container direction="column" className="background-box">
        {Object.entries(playbooks[character.playbook].background).map(([key, value]) =>
          value.faction ? (
            <Grid item className="text-field">
              <div className="question">{value.question}</div>
              <Select
                fullWidth
                variant="outlined"
                value={background[key]}
                onChange={evt => changeBackground(key, evt.target.value as string)}
              >
                {character.reputation.map(rep => (
                  <MenuItem value={rep.faction}>{rep.faction}</MenuItem>
                ))}
              </Select>
            </Grid>
          ) : (
            <Grid item className="text-field">
              <div className="question">{value.question}</div>
              {value.options && value.options.length > 0 ? (
                <Autocomplete
                  freeSolo
                  fullWidth
                  options={value.options}
                  renderInput={props => <TextField multiline {...props} variant="outlined" />}
                  value={background[key]}
                  onChange={(e, value) => value && changeBackground(key, value)}
                />
              ) : (
                <TextField
                  fullWidth
                  multiline
                  variant="outlined"
                  value={background[key]}
                  onChange={evt => changeBackground(key, evt.target.value)}
                />
              )}
            </Grid>
          )
        )}
      </Grid>
    ),
    [character.reputation, character.playbook, background, changeBackground]
  );
};

export default React.memo(Background);
