import React from "react";
import { Grid } from "@material-ui/core";

import vagabonds from "assets/vagabonds/vagabonds";
import { playbooks } from "root-rpg-model";

interface AvatarProps {
  playbookName: keyof typeof playbooks;
}

const Avatar: React.FC<AvatarProps> = props => {
  return (
    <Grid item container direction="column" className="avatar-box">
      <img src={vagabonds[props.playbookName]} />
    </Grid>
  );
};

export default Avatar;
