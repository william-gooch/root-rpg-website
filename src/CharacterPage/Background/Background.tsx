import { Grid, TextField } from "@material-ui/core";
import React from "react"

interface BackgroundProps {
  
}

const Background: React.FC<BackgroundProps> = props => {
  return (
    <Grid item container direction="column" className="background-box">
      <Grid item className="text-field">
        <TextField fullWidth multiline variant="outlined" label="Where do you call home?" />
      </Grid>
      <Grid item className="text-field">
        <TextField fullWidth multiline variant="outlined" label="Why are you a vagabond?" />
      </Grid>
      <Grid item className="text-field">
        <TextField fullWidth multiline variant="outlined" label="Whom have you left behind?" />
      </Grid>
      <Grid item className="text-field">
        <TextField fullWidth multiline variant="outlined" label="Which faction have you served the most?" />
      </Grid>
      <Grid item className="text-field">
        <TextField fullWidth multiline variant="outlined" label="With which faction have you earned a special enmity?" />
      </Grid>
    </Grid>
  );
};

export default React.memo(Background);