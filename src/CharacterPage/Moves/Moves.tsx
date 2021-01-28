import { Grid, FormGroup, FormControlLabel, Checkbox, FormLabel, FormHelperText } from "@material-ui/core";
import marked from "marked";
import React from "react"
import { useCharacter } from "../../CharacterProvider";
import { Move } from "../../model/playbooks/playbook";

const Moves: React.FC = props => {
  const [character, changeCharacter] = useCharacter();

  const updateMove = React.useCallback((move: Move, value: string) => {
    changeCharacter(d => {
      if(value) {
        d.moves[move.name] = true;
      } else {
        delete d.moves[move.name];
      }
    });
  }, [changeCharacter]);

  const verifyMoves = React.useCallback(() => {
    const count =
      Object.entries(character.moves).filter(([k, v]) => !!v).length
      - Object.entries(character.playbook.moves.starting.startWith).length; // minus the ones you start with.
    
    return count < character.playbook.moves.starting.choose;
  }, [character]);

  return (
    <Grid item container direction="column" className="moves-box">
      <Grid item className="title">Your Moves</Grid>
      <Grid item className="moves-options">
        <FormGroup>
          {character.playbook.moves.options.map(move =>
            <div key={move.name}>
              <FormControlLabel
                control={<Checkbox />}
                label={<FormLabel>{move.name}</FormLabel>}
                disabled={character.playbook.moves.starting.startWith[move.name] || (!(character.moves[move.name] ?? false) && !verifyMoves())}
                checked={character.moves[move.name] ?? false}
                onChange={(evt: any) => updateMove(move, evt.target.checked)}
              />
              <FormHelperText><span dangerouslySetInnerHTML={{ __html: marked(move.description) }}></span></FormHelperText>
            </div>
          )}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default React.memo(Moves);