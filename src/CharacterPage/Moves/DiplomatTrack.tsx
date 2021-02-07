import React from "react";
import * as Automerge from "automerge";
import { Grid } from "@material-ui/core";

interface DiplomatTrackProps {
  diplomatData: any;
  changeDiplomat(fn: Automerge.ChangeFn<any>): void;
}

const DiplomatTrack: React.FC<DiplomatTrackProps> = props => {
  return (
    <Grid container direction="column" alignItems="center" className="diplomat-track-container">
      <Grid item xs={6} container direction="row" justify="space-evenly" className="diplomat-track-box">
        {[0, 1, 2, 3].map(i => (
          <Grid
            role="button"
            item
            className={"diplomat-track-text" + (props.diplomatData.diplomat === i ? " active" : "")}
            onClick={() => props.changeDiplomat(doc => (doc.diplomat = i))}
          >
            {i}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default React.memo(DiplomatTrack);
