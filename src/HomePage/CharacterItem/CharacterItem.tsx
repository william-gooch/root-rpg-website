import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import { Character, playbooks } from "root-rpg-model";
import { Check, ChevronRight, Close, Delete } from "@material-ui/icons";

interface CharacterItemProps {
  character: Character;
  goToCharacter(): void;
  deleteCharacter(): void;
}

const CharacterItem: React.FC<CharacterItemProps> = props => {
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  return (
    <Grid item xs={12} md={3} className="character-container">
      <div className="character-box">
        <Grid container direction="column">
          <Grid item className="character-name">
            <b>
              {props.character.name.length > 0
                ? props.character.name
                : "Unnamed"}
            </b>
            , {playbooks[props.character.playbook].name}
          </Grid>
          <Grid item container direction="row" justify="flex-end">
            {confirmDelete && (
              <IconButton color="secondary" onClick={props.deleteCharacter}>
                <Check />
              </IconButton>
            )}
            <IconButton
              color="default"
              onClick={() => setConfirmDelete(!confirmDelete)}
            >
              {confirmDelete ? <Close /> : <Delete />}
            </IconButton>
            <IconButton onClick={props.goToCharacter}>
              <ChevronRight />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default React.memo(CharacterItem);
