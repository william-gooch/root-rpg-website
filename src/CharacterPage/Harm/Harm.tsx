import { Grid, Checkbox } from "@material-ui/core";
import React from "react";
import { useCharacter } from "../../CharacterProvider";
import { Harm } from "root-rpg-model";

const HarmBox: React.FC = props => {
  const [character, changeCharacter] = useCharacter();

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

  return (
    <Grid item container direction="column" className="harm-box">
      {Object.entries(character.harm).map(([harm, { max, current }]) => (
        <Grid
          key={harm}
          item
          container
          direction="row"
          wrap="nowrap"
          alignItems="center"
          className="harm-row"
        >
          {Array.from(new Array(max))
            .map((_, i) => i)
            .map(i => (
              <Checkbox
                key={i}
                checked={current > i}
                onClick={() => updateHarm(harm as keyof Harm, i + 1)}
              />
            ))}
          <span className="harm-name">{harm}</span>
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(HarmBox);
