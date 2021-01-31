import { Grid, FormGroup, FormControlLabel, Checkbox, FormLabel, FormHelperText } from "@material-ui/core";
import React from "react";
import { useCurrentCharacter } from "../../CharacterProvider";
import { Drive, drives, playbooks } from "root-rpg-model";
import marked from "marked";

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
      <Grid item className="options">
        <FormGroup>
          {Object.entries(playbooks[character.playbook].drives)
            .filter(([k, v]) => v)
            .map(([id, v]) => id as keyof typeof drives)
            .map(id => (
              <Grid key={drives[id].name} item className="container">
                <Grid container direction="column" className="box">
                  <Grid item container direction="row" alignItems="center">
                    <Checkbox
                      disabled={!(character.drives[id] ?? false) && getNumberOfDrivesChecked() >= 2}
                      checked={character.drives[id] ?? false}
                      onChange={(evt: any) => updateDrive(id, evt.target.checked)}
                    />
                    <span className="name">{drives[id].name}</span>
                  </Grid>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: marked(drives[id].description) }}
                  ></div>
                </Grid>
              </Grid>
            ))}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default React.memo(Drives);
