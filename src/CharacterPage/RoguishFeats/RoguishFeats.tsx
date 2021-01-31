import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
} from "@material-ui/core";
import { RoguishFeat, roguishFeats } from "root-rpg-model";
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

  return (
    <Grid item container direction="column" className="feats-box">
      <Grid item className="title">
        <span>Roguish Feats</span>
      </Grid>
      <FormGroup>
        <Grid container direction="row">
          {roguishFeats.map(feat => (
            <Grid key={feat} item xs={12} lg={6}>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={<FormLabel>{feat}</FormLabel>}
                checked={character.roguishFeats[feat] ?? false}
                onChange={(evt: any) => updateFeat(feat, evt.target.checked)}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    </Grid>
  );
};

export default React.memo(RoguishFeatsBox);
