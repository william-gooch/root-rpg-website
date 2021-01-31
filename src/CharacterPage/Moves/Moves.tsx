import {
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormHelperText,
} from "@material-ui/core";
import marked from "marked";
import React from "react";
import { useCurrentCharacter } from "../../CharacterProvider";
import { moves, playbooks } from "root-rpg-model";

const Moves: React.FC = props => {
  const [character, changeCharacter] = useCurrentCharacter();

  const updateMove = React.useCallback(
    (id: keyof typeof moves, value: boolean) => {
      changeCharacter(d => {
        if (value) {
          d.moves[id] = true;
        } else {
          delete d.moves[id];
        }
      });
    },
    [changeCharacter]
  );

  const verifyMoves = React.useCallback(() => {
    const count =
      Object.entries(character.moves).filter(([k, v]) => !!v).length -
      Object.entries(playbooks[character.playbook].moves.starting.startWith)
        .length; // minus the ones you start with.

    return count < playbooks[character.playbook].moves.starting.choose;
  }, [character]);

  return (
    <Grid item container direction="column" className="moves-box">
      <Grid item className="title">
        Your Moves
      </Grid>
      <Grid item className="moves-options">
        <FormGroup>
          {Object.entries(playbooks[character.playbook].moves.options)
            .filter(([id, v]) => v)
            .map(([id, v]) => id as keyof typeof moves)
            .map(id => (
              <div key={moves[id].name}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={<FormLabel>{moves[id].name}</FormLabel>}
                  disabled={
                    playbooks[character.playbook].moves.starting.startWith[
                      id
                    ] ||
                    (!(character.moves[id] ?? false) && !verifyMoves())
                  }
                  checked={character.moves[id] ?? false}
                  onChange={(evt: any) => updateMove(id, evt.target.checked)}
                />
                <FormHelperText>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: marked(moves[id].description),
                    }}
                  ></span>
                </FormHelperText>
              </div>
            ))}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default React.memo(Moves);
