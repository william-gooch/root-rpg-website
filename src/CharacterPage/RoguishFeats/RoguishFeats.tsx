import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
} from '@material-ui/core';
import React from 'react';
import { roguishFeats } from 'root-rpg-model';

const RoguishFeatsBox: React.FC = props => {
  return (
    <Grid item container direction="column" className="feats-box">
      <Grid item className="title">
        <span>Roguish Feats</span>
      </Grid>
      <FormGroup>
        <Grid container direction="row">
          {roguishFeats.map(feat => (
            <Grid key={feat} item xs={12} lg={6}>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={<FormLabel>{feat}</FormLabel>}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    </Grid>
  );
};

export default React.memo(RoguishFeatsBox);
