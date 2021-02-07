import React from "react";
import { Checkbox, FormControlLabel, FormGroup, FormLabel, Grid } from "@material-ui/core";
import { playbooks, RoguishFeat, roguishFeats } from "root-rpg-model";
import { useCurrentCharacter } from "CharacterProvider";

const RoguishFeatsBox: React.FC = props => {
  const [character, changeCharacter] = useCurrentCharacter();

  const updateFeat = React.useCallback(
    (id: RoguishFeat, value: boolean) => {
      changeCharacter(d => {
        if (value) {
          d.roguishFeats[id] = true;
        } else {
          delete d.roguishFeats[id];
        }
      });
    },
    [changeCharacter]
  );

  return React.useMemo(
    () => (
      <Grid item container direction="column" className="feats-box">
        <Grid item className="title">
          <div>Roguish Feats</div>
          <div className="choose-text">
            {playbooks[character.playbook].initialRoguishFeats.choose > 0
              ? `(Choose ${playbooks[character.playbook].initialRoguishFeats.choose} feat(s) to start)`
              : "(Start with marked feats)"}
          </div>
        </Grid>
        <FormGroup>
          <Grid container direction="row">
            {roguishFeats.map(feat => (
              <Grid key={feat} item xs={12} lg={6}>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={<FormLabel>{feat}</FormLabel>}
                  checked={character.roguishFeats[feat] ?? false}
                  disabled={playbooks[character.playbook].initialRoguishFeats.startWith[feat]}
                  onChange={(evt: any) => updateFeat(feat, evt.target.checked)}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </Grid>
    ),
    [character.playbook, character.roguishFeats, updateFeat]
  );
};

export default React.memo(RoguishFeatsBox);
