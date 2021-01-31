import { Grid, FormGroup, FormControlLabel, Checkbox, FormLabel, FormHelperText } from "@material-ui/core";
import React from "react";
import { useCurrentCharacter } from "../../CharacterProvider";
import { Drive, drives, playbooks } from "root-rpg-model";

const Drives: React.FC = () => {
  const [character, changeCharacter] = useCurrentCharacter();

  const updateDrive = React.useCallback(
    (id: keyof typeof drives, value: boolean) => {
      changeCharacter(d => {
        if (value) {
          d.drives[id] = true;
          console.log(id);
        } else {
          delete d.drives[id];
        }
      });
    },
    [changeCharacter]
  );

  const getNumberOfDrivesChecked = React.useCallback(() => {
    return Object.entries(character.drives).filter(([k, v]) => !!v).length;
  }, [character]);

  return (
    <Grid item container direction="column" className="drives-box">
      <Grid item className="title">
        Your Drives
      </Grid>
      <Grid item className="drives-options">
        <FormGroup>
          {Object.entries(playbooks[character.playbook].drives)
            .filter(([k, v]) => v)
            .map(([id, v]) => id as keyof typeof drives)
            .map(id => (
              <FormControlLabel
                key={drives[id].name}
                control={<Checkbox disabled={!(character.drives[id] ?? false) && getNumberOfDrivesChecked() >= 2} />}
                label={
                  <>
                    <FormLabel>{drives[id].name}</FormLabel>
                    <FormHelperText>{drives[id].description}</FormHelperText>
                  </>
                }
                checked={character.drives[id] ?? false}
                onChange={(evt: any) => updateDrive(id, evt.target.checked)}
              />
            ))}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default React.memo(Drives);
