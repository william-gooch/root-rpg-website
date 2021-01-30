import { Grid } from '@material-ui/core';
import React from 'react';

interface HeaderProps {
  name: string;
  blurb: string;
}

const Header: React.FC<HeaderProps> = props => {
  return (
    <Grid container direction="row" alignItems="center" className="header-row">
      <Grid item xs={12} xl={3}>
        <div className="playbook-name">{props.name}</div>
      </Grid>
      <Grid item xs>
        <div className="playbook-blurb">{props.blurb}</div>
      </Grid>
    </Grid>
  );
};

export default React.memo(Header);
