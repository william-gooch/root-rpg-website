import { Grid, IconButton } from "@material-ui/core";
import { Add, Lock, LockOpen, Remove } from "@material-ui/icons";
import { CharacterChangeFn } from "CharacterProvider";
import React from "react";
import { Stats } from "root-rpg-model";

interface StatsProps {
  stats: Stats;
  changeCharacter(fn: CharacterChangeFn): void;
}

const StatsBox: React.FC<StatsProps> = props => {
  const [locked, setLocked] = React.useState(true);

  const updateStat = React.useCallback(
    (stat: keyof Stats, value: number) => {
      props.changeCharacter(doc => {
        doc.stats[stat] = Math.min(Math.max(-2, value), 3);
      });
    },
    [props.changeCharacter]
  );

  return (
    <Grid item container direction="column" className="stats-box">
      <div className="actions">
        <IconButton onClick={() => setLocked(!locked)}>{locked ? <Lock /> : <LockOpen />}</IconButton>
      </div>
      {Object.entries(props.stats).map(([key, value]) => (
        <Grid key={key} item container direction="row" alignItems="center" className="stat-row">
          {!locked && (
            <IconButton
              disabled={value <= -2}
              onClick={() => updateStat(key as keyof Stats, value - 1)}
              className="action-button"
            >
              <Remove />
            </IconButton>
          )}
          <Grid item className="stat-value">
            {value}
          </Grid>
          {!locked && (
            <IconButton
              disabled={value >= 3}
              onClick={() => updateStat(key as keyof Stats, value + 1)}
              className="action-button"
            >
              <Add />
            </IconButton>
          )}
          <Grid item className="stat-name">
            {key}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(StatsBox, (oldProps, newProps) => oldProps.stats === newProps.stats);
