import { Grid, FormGroup, FormControlLabel, Checkbox, FormLabel, FormHelperText } from "@material-ui/core";
import React from "react"

import { Nature } from "../../model/playbooks/playbook";

interface NatureProps {
  natures: Nature[];
}

const NatureBox: React.FC<NatureProps> = props => {
  return (
    <Grid item container direction="column" className="nature-box">
      <Grid item className="title">Your Nature</Grid>
      <Grid item className="nature-options">
        <FormGroup>
          {props.natures.map(nature =>
            <FormControlLabel key={nature.name}
              control={<Checkbox />}
              label={<>
                <FormLabel>{nature.name}</FormLabel>
                <FormHelperText>{nature.description}</FormHelperText>
              </>}
            />
          )}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default NatureBox;