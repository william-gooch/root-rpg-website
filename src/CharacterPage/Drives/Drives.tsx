import {
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormHelperText,
} from "@material-ui/core";
import React from "react";
import { useCharacter } from "../../CharacterProvider";
import { Drive } from "root-rpg-model";

const Drives: React.FC = () => {
  const [character, changeCharacter] = useCharacter();

  const updateDrive = React.useCallback(
    (drive: Drive, value: boolean) => {
      changeCharacter(d => {
        if (value) {
          d.drives[drive.name] = true;
        } else {
          delete d.drives[drive.name];
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
          {character.playbook.drives.map(drive => (
            <FormControlLabel
              key={drive.name}
              control={
                <Checkbox
                  disabled={
                    !(character.drives[drive.name] ?? false) &&
                    getNumberOfDrivesChecked() >= 2
                  }
                />
              }
              label={
                <>
                  <FormLabel>{drive.name}</FormLabel>
                  <FormHelperText>{drive.description}</FormHelperText>
                </>
              }
              checked={character.drives[drive.name] ?? false}
              onChange={(evt: any) => updateDrive(drive, evt.target.checked)}
            />
          ))}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default React.memo(Drives);
