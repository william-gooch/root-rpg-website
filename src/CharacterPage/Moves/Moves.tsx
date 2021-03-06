import { Grid, Checkbox, IconButton } from "@material-ui/core";
import marked from "marked";
import React from "react";
import { useCurrentCharacter } from "../../CharacterProvider";
import { moves, playbooks } from "root-rpg-model";
import { Add, Delete } from "@material-ui/icons";
import SearchMenu from "SearchMenu/SearchMenu";
import ShipDisplay from "./ShipDisplay";
import DiplomatTrack from "./DiplomatTrack";

const Moves: React.FC = () => {
  const [character, changeCharacter] = useCurrentCharacter();

  const updateMove = React.useCallback(
    (id: keyof typeof moves, value: boolean) => {
      changeCharacter(d => {
        if (value) {
          if ((moves[id] as any).extraDefault) {
            d.moves[id] = (moves[id] as any).extraDefault;
          } else {
            d.moves[id] = value;
          }
        } else {
          delete d.moves[id];
        }
      });
    },
    [changeCharacter]
  );

  const [menuAnchorEl, setMenuAnchorEl] = React.useState<Element | null>(null);

  const getChooseText = React.useCallback(() => {
    const starting = playbooks[character.playbook].moves.starting;
    if (Object.keys(starting.startWith).length <= 0) {
      return `Choose ${starting.choose} moves to start`;
    } else {
      const startingMoves = Object.keys(starting.startWith)
        .map(move => moves[move as keyof typeof moves].name)
        .join(", ");
      return `Start with, ${startingMoves} then choose ${starting.choose}`;
    }
  }, [character.playbook]);

  return React.useMemo(
    () => (
      <Grid item container direction="column" className="moves-box">
        <Grid item className="title">
          <div>Your Moves</div>
          <div className="choose-text">({getChooseText()})</div>
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
                      checked={Boolean(character.moves[id])}
                      onChange={(evt: any) => updateMove(id, evt.target.checked)}
                    />
                    <span className="name">{moves[id].name}</span>
                  </Grid>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: marked(moves[id].description) }}
                  ></div>
                  {id === "small-ship" && (
                    <ShipDisplay
                      shipData={character.moves[id] as any}
                      changeShip={fn => changeCharacter(doc => fn(doc.moves[id]))}
                    />
                  )}
                  {id === "diplomat" && (
                    <DiplomatTrack
                      diplomatData={character.moves[id] as any}
                      changeDiplomat={fn => changeCharacter(doc => fn(doc.moves[id]))}
                    />
                  )}
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
                    <IconButton onClick={() => updateMove(id, false)}>
                      <Delete />
                    </IconButton>
                    <span className="name">{moves[id].name}</span>
                    <span className="source">(from {playbooks[moves[id].source].name})</span>
                  </Grid>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: marked(moves[id].description) }}
                  ></div>
                  {id === "small-ship" && (
                    <ShipDisplay
                      shipData={character.moves[id] as any}
                      changeShip={fn => changeCharacter(doc => fn(doc.moves[id]))}
                    />
                  )}
                  {id === "diplomat" && (
                    <DiplomatTrack
                      diplomatData={character.moves[id] as any}
                      changeDiplomat={fn => changeCharacter(doc => fn(doc.moves[id]))}
                    />
                  )}
                </Grid>
              </Grid>
            ))}
          <Grid item className="container">
            <div role="button" className="new-move-button" onClick={evt => setMenuAnchorEl(evt.currentTarget)}>
              <Grid container direction="column" alignItems="center" className="new-box">
                <Grid item>
                  <Add />
                </Grid>
                <Grid item>Add a move from another Playbook</Grid>
              </Grid>
            </div>
          </Grid>
          <SearchMenu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={() => setMenuAnchorEl(null)}
            onSelect={item => updateMove(item as keyof typeof moves, true)}
            items={Object.keys(moves)}
            getItemText={item => moves[item as keyof typeof moves].name}
            getItemSubtext={item => playbooks[moves[item as keyof typeof moves].source].name}
            filterPredicate={(item, filter) =>
              (filter ? moves[item as keyof typeof moves].name.toLowerCase().includes(filter.toLowerCase()) : true) &&
              Object.keys(character.moves).indexOf(item) < 0 &&
              Object.keys(playbooks[character.playbook].moves.options).indexOf(item) < 0
            }
          />
        </Grid>
      </Grid>
    ),
    [character.moves, character.playbook, getChooseText, menuAnchorEl, updateMove, changeCharacter]
  );
};

export default React.memo(Moves);
