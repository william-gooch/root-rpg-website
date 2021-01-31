import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Replay } from "@material-ui/icons";
import React from "react";
import { names, playbooks, species as speciess } from "root-rpg-model";
import { useCurrentCharacter } from "../../CharacterProvider";

interface DetailsProps {}

const Details: React.FC<DetailsProps> = () => {
  const [character, changeCharacter] = useCurrentCharacter();
  const playbook = playbooks[character.playbook];

  const name = character.name;
  const setName = React.useCallback(
    (name: string) => changeCharacter(d => (d.name = name)),
    [changeCharacter]
  );
  const species = character.species;
  const setSpecies = React.useCallback(
    (species: string) => changeCharacter(d => (d.species = species)),
    [changeCharacter]
  );
  const details = character.details;
  const setDetails = React.useCallback(
    (details: string) => changeCharacter(d => (d.details = details)),
    [changeCharacter]
  );
  const demeanor = character.demeanor;
  const setDemeanor = React.useCallback(
    (demeanor: string) => changeCharacter(d => (d.demeanor = demeanor)),
    [changeCharacter]
  );

  const generateName = React.useCallback(() => {
    const idx = Math.floor(Math.random() * names.length);
    setName(names[idx]);
  }, [setName]);

  const generateSpecies = React.useCallback(() => {
    const idx = Math.floor(Math.random() * speciess.length);
    setSpecies(speciess[idx]);
  }, [setSpecies]);

  const generateDemeanor = React.useCallback(() => {
    const idx = Math.floor(Math.random() * playbook.demeanors.length);
    setDemeanor(playbook.demeanors[idx]);
  }, [setDemeanor, playbook.demeanors]);

  return (
    <Grid item container direction="column" className="details-box">
      <Grid item className="text-field">
        <TextField
          fullWidth
          variant="outlined"
          label="Name"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={generateName}>
                  <Replay />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={name}
          onChange={evt => setName(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <TextField
          fullWidth
          variant="outlined"
          label="Species"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={generateSpecies}>
                  <Replay />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={species}
          onChange={evt => setSpecies(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <TextField
          fullWidth
          multiline
          rows={3}
          rowsMax={5}
          variant="outlined"
          label="Details"
          value={details}
          onChange={evt => setDetails(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <TextField
          fullWidth
          variant="outlined"
          label="Demeanor"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={generateDemeanor}>
                  <Replay />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={demeanor}
          onChange={evt => setDemeanor(evt.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(Details);
