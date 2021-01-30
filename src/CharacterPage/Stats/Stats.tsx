import { Grid } from '@material-ui/core';
import React from 'react';
import { Stats } from 'root-rpg-model';

interface StatsProps {
  stats: Stats;
}

const StatsBox: React.FC<StatsProps> = props => {
  return (
    <Grid item container direction="column" className="stats-box">
      {Object.entries(props.stats).map(([key, value]) => (
        <Grid
          key={key}
          item
          container
          direction="row"
          alignItems="center"
          className="stat-row"
        >
          <Grid item className="stat-value">
            {value}
          </Grid>
          <Grid item className="stat-name">
            {key}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(StatsBox);
