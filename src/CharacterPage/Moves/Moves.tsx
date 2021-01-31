import { Grid, Checkbox, IconButton } from "@material-ui/core";
import marked from "marked";
import React from "react";
import { useCurrentCharacter } from "../../CharacterProvider";
import { moves, playbooks } from "root-rpg-model";
import { Add, Delete } from "@material-ui/icons";

const Moves: React.FC = () => {
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

  return (
    <Grid item container direction="column" className="moves-box">
      <Grid item className="title">
        Your Moves
      </Grid>
      <Grid item container direction="column" className="options">
        {Object.entries(playbooks[character.playbook].moves.options)
          .filter(([, v]) => v)
          .map(([id]) => id as keyof typeof moves)
          .map(id => (
            <Grid key={moves[id].name} item className="container">
              <Grid container direction="column" className="box">
                <Grid item container direction="row" alignItems="center">
                  <Checkbox
                    disabled={playbooks[character.playbook].moves.starting.startWith[id]}
                    checked={character.moves[id] ?? false}
                    onChange={(evt: any) => updateMove(id, evt.target.checked)}
                  />
                  <span className="name">{moves[id].name}</span>
                </Grid>
                <div className="description" dangerouslySetInnerHTML={{ __html: marked(moves[id].description) }}></div>
              </Grid>
            </Grid>
          ))}
        {Object.entries(character.moves)
          .filter(([id, v]) => v && moves[id as keyof typeof moves].source !== character.playbook)
          .map(([id]) => id as keyof typeof moves)
          .map(id => (
            <Grid item className="container">
              <Grid container direction="column" className="box">
                <Grid item container direction="row" alignItems="center">
                  <IconButton>
                    <Delete />
                  </IconButton>
                  <span className="name">{moves[id].name}</span>
                  <span className="source">(from {playbooks[moves[id].source].name})</span>
                </Grid>
                <div className="description" dangerouslySetInnerHTML={{ __html: marked(moves[id].description) }}></div>
              </Grid>
            </Grid>
          ))}
        <Grid item className="container">
          <div role="button" className="new-move-button">
            <Grid container direction="column" alignItems="center" className="new-box">
              <Grid item>
                <Add />
              </Grid>
              <Grid item>Add a move from another Playbook</Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(Moves);
