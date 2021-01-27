import { Grid, FormGroup, FormControlLabel, Checkbox, FormLabel, FormHelperText } from "@material-ui/core";
import marked from "marked";
import React from "react"
import { Move } from "../../model/playbooks/playbook";

interface MovesProps {
  moves: Move[];
}

const Moves: React.FC<MovesProps> = props => {
  return (
    <Grid item container direction="column" className="moves-box">
      <Grid item className="title">Your Moves</Grid>
      <Grid item className="moves-options">
        <FormGroup>
          {props.moves.map(move =>
            <div key={move.name}>
              <FormControlLabel
                control={<Checkbox />}
                label={<FormLabel>{move.name}</FormLabel>}
              />
              <FormHelperText><span dangerouslySetInnerHTML={{ __html: marked(move.description) }}></span></FormHelperText>
            </div>
          )}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default Moves;