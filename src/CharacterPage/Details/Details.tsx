import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Replay } from "@material-ui/icons";
import React from "react";
import { names } from "../../model/names";
import { species as speciess } from "../../model/species";
import { useCharacter, useCharacterProperty } from "../../CharacterProvider";

interface DetailsProps {
}

const Details: React.FC<DetailsProps> = () => {
  const [character, changeCharacter] = useCharacter();
  const playbook = character.playbook;

  const [name, setName] = useCharacterProperty("name");
  const [species, setSpecies] = useCharacterProperty("species");
  const [details, setDetails] = useCharacterProperty("details");
  const [demeanor, setDemeanor] = useCharacterProperty("demeanor");


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
        <TextField fullWidth variant="outlined" label="Name"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={generateName}>
                  <Replay />
                </IconButton>
              </InputAdornment>
            )
          }}
          value={name}
          onChange={evt => setName(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <TextField fullWidth variant="outlined" label="Species"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={generateSpecies}>
                  <Replay />
                </IconButton>
              </InputAdornment>
            )
          }}
          value={species}
          onChange={evt => setSpecies(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <TextField fullWidth multiline rows={3} rowsMax={5} variant="outlined" label="Details"
          value={details}
          onChange={evt => setDetails(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <TextField fullWidth variant="outlined" label="Demeanor"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={generateDemeanor}>
                  <Replay />
                </IconButton>
              </InputAdornment>
            )
          }}
          value={demeanor}
          onChange={evt => setDemeanor(evt.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(Details);