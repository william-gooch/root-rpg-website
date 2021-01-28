import { Grid, FormGroup, FormControlLabel, Checkbox, FormLabel, FormHelperText } from "@material-ui/core";
import React from "react"
import { Drive } from "../../model/playbooks/playbook";

interface DrivesProps {
  drives: Drive[];
}

const Drives: React.FC<DrivesProps> = props => {
  return (
    <Grid item container direction="column" className="drives-box">
      <Grid item className="title">Your Drives</Grid>
      <Grid item className="drives-options">
        <FormGroup>
          {props.drives.map(drive =>
            <FormControlLabel key={drive.name}
              control={<Checkbox />}
              label={<>
                <FormLabel>{drive.name}</FormLabel>
                <FormHelperText>{drive.description}</FormHelperText>
              </>}
            />
          )}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default React.memo(Drives);