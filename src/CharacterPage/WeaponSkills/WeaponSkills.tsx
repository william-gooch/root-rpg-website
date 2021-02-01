import { Grid, FormGroup, FormControlLabel, Checkbox, FormLabel } from "@material-ui/core";
import { useCurrentCharacter } from "CharacterProvider";
import React from "react";
import { weaponSkills, WeaponSkill, playbooks } from "root-rpg-model";

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
        <div>Weapon Skills</div>
        <div className="choose-text">(Choose one bolded skill to start)</div>
      </Grid>
      <FormGroup>
        <Grid container direction="row">
          {weaponSkills.map(skill => (
            <Grid key={skill} item xs={12} lg={6}>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={
                  <FormLabel>
                    <span className={playbooks[character.playbook].weaponSkills.bolded[skill] ? "bold" : ""}>
                      {skill}
                    </span>
                  </FormLabel>
                }
                checked={character.weaponSkills[skill] ?? false}
                onChange={(evt: any) => updateSkill(skill, evt.target.checked)}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    </Grid>
  );
};

export default React.memo(WeaponSkillsBox);
