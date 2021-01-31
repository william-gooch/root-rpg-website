import { Grid, FormGroup, FormControlLabel, Checkbox, FormLabel } from "@material-ui/core";
import { useCurrentCharacter } from "CharacterProvider";
import React from "react";
import { weaponSkills, WeaponSkill } from "root-rpg-model";

interface WeaponSkillsProps {
  boldedSkills: { [k in WeaponSkill]?: boolean };
}

const WeaponSkillsBox: React.FC<WeaponSkillsProps> = props => {
  const [character, changeCharacter] = useCurrentCharacter();

  const updateSkill = React.useCallback(
    (id: WeaponSkill, value: boolean) => {
      changeCharacter(d => {
        if (value) {
          d.weaponSkills[id] = true;
        } else {
          delete d.weaponSkills[id];
        }
      });
    },
    [changeCharacter]
  );

  return (
    <Grid item container direction="column" className="skills-box">
      <Grid item className="title">
        <span>Weapon Skills</span>
      </Grid>
      <FormGroup>
        <Grid container direction="row">
          {weaponSkills.map(skill => (
            <Grid key={skill} item xs={12} lg={6}>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={
                  <FormLabel>
                    <span className={props.boldedSkills[skill] ? "bold" : ""}>{skill}</span>
                  </FormLabel>
                }
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    </Grid>
  );
};

export default React.memo(WeaponSkillsBox);
