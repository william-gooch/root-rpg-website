import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Replay } from "@material-ui/icons";
import React from "react"
import { names } from "../../model/names";
import { species as speciess } from "../../model/species";
import { usePlaybook } from "../../PlaybookProvider";

interface DetailsProps {
  
}

const Details: React.FC<DetailsProps> = props => {
  const playbook = usePlaybook();

  const [name, setName] = React.useState("");
  const [species, setSpecies] = React.useState("");
  const [demeanor, setDemeanor] = React.useState("");

  const generateName = () => {
    const idx = Math.floor(Math.random() * names.length);
    setName(names[idx]);
  }

  const generateSpecies = () => {
    const idx = Math.floor(Math.random() * speciess.length);
    setSpecies(speciess[idx]);
  }

  const generateDemeanor = () => {
    const idx = Math.floor(Math.random() * playbook.demeanors.length);
    setDemeanor(playbook.demeanors[idx]);
  }

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
        <TextField fullWidth multiline rows={3} rowsMax={5} variant="outlined" label="Details" />
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

export default Details;