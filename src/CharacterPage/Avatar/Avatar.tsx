import React from "react";
import { Grid } from "@material-ui/core";

import arbiter from "assets/vagabonds/arbiter.png";

const vagabondImages: { [key: string]: string } = { arbiter };

interface AvatarProps {
  playbookName: string;
}

const Avatar: React.FC<AvatarProps> = props => {
  return (
    <Grid item container direction="column" className="avatar-box">
      <img src={vagabondImages[props.playbookName]} />
    </Grid>
  );
};

export default Avatar;
