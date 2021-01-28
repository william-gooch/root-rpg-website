import { Grid, Checkbox } from "@material-ui/core";
import React from "react"

interface HarmProps {
  
}

const Harm: React.FC<HarmProps> = props => {
  return (
    <Grid item container direction="column" className="harm-box">
      {["Injury", "Exhaustion", "Depletion"].map(harm =>
        <Grid key={harm} item container direction="row" alignItems="center" className="harm-row">
          {[1, 2, 3, 4].map(_ =>
            <Checkbox key={_} />
          )}
          <span className="harm-name">{harm}</span>
        </Grid>
      )}
    </Grid>
  );
};

export default React.memo(Harm);