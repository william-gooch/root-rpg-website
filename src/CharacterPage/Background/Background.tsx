import { Grid, TextField } from "@material-ui/core";
import React from "react"
import { useCharacterProperty } from "../../CharacterProvider";

const Background: React.FC = () => {
  const [backgroundWhere, setBackgroundWhere] = useCharacterProperty("backgroundWhere");
  const [backgroundWhy, setBackgroundWhy] = useCharacterProperty("backgroundWhy");
  const [backgroundWho, setBackgroundWho] = useCharacterProperty("backgroundWho");
  const [backgroundFactionServed, setBackgroundFactionServed] = useCharacterProperty("backgroundFactionServed");
  const [backgroundFactionEnmity, setBackgroundFactionEnmity] = useCharacterProperty("backgroundFactionEnmity");

  return (
    <Grid item container direction="column" className="background-box">
      <Grid item className="text-field">
        <TextField fullWidth multiline variant="outlined" label="Where do you call home?"
          value={backgroundWhere}
          onChange={evt => setBackgroundWhere(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <TextField fullWidth multiline variant="outlined" label="Why are you a vagabond?"
          value={backgroundWhy}
          onChange={evt => setBackgroundWhy(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <TextField fullWidth multiline variant="outlined" label="Whom have you left behind?"
          value={backgroundWho}
          onChange={evt => setBackgroundWho(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <TextField fullWidth multiline variant="outlined" label="Which faction have you served the most?"
          value={backgroundFactionServed}
          onChange={evt => setBackgroundFactionServed(evt.target.value)}
        />
      </Grid>
      <Grid item className="text-field">
        <TextField fullWidth multiline variant="outlined" label="With which faction have you earned a special enmity?"
          value={backgroundFactionEnmity}
          onChange={evt => setBackgroundFactionEnmity(evt.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(Background);