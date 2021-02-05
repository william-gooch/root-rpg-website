import { Grid, Checkbox, IconButton } from "@material-ui/core";
import React from "react";
import { useCurrentCharacter } from "../../CharacterProvider";
import { Harm } from "root-rpg-model";
import { AddCircle, Lock, LockOpen, RemoveCircle } from "@material-ui/icons";

const HarmBox: React.FC = props => {
  const [character, changeCharacter] = useCurrentCharacter();
  const [locked, setLocked] = React.useState(true);

  const updateHarm = React.useCallback(
    (harm: keyof Harm, value: number) => {
      changeCharacter(d => {
        if (d.harm[harm].current === value) {
          d.harm[harm].current = 0;
        } else {
          d.harm[harm].current = value;
        }
      });
    },
    [changeCharacter]
  );

  const updateMaxHarm = React.useCallback(
    (harm: keyof Harm, value: number) => {
      changeCharacter(d => {
        d.harm[harm].max = value;
      });
    },
    [changeCharacter]
  );

  return React.useMemo(
    () => (
      <Grid item container direction="column" className="harm-box">
        <div className="actions">
          <IconButton onClick={() => setLocked(l => !l)}>{locked ? <Lock /> : <LockOpen />}</IconButton>
        </div>
        {Object.entries(character.harm).map(([harm, { max, current }]) => (
          <Grid key={harm} item container direction="row" wrap="nowrap" alignItems="center" className="harm-row">
            <Grid item container direction="row" wrap="nowrap" alignItems="center">
              {!locked && (
                <IconButton
                  size="small"
                  disabled={max <= 4}
                  onClick={() => updateMaxHarm(harm as keyof Harm, Math.max(4, max - 1))}
                >
                  <RemoveCircle />
                </IconButton>
              )}
              {Array.from(new Array(max))
                .map((_, i) => i)
                .map(i => (
                  <Checkbox key={i} checked={current > i} onClick={() => updateHarm(harm as keyof Harm, i + 1)} />
                ))}
              {!locked && (
                <IconButton
                  size="small"
                  disabled={max >= 6}
                  onClick={() => updateMaxHarm(harm as keyof Harm, Math.min(6, max + 1))}
                >
                  <AddCircle />
                </IconButton>
              )}
            </Grid>
            <Grid item className="harm-name">
              {harm}
            </Grid>
          </Grid>
        ))}
      </Grid>
    ),
    [character.harm, locked, updateHarm, updateMaxHarm]
  );
};

export default HarmBox;
