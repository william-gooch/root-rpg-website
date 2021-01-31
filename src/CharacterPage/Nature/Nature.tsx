import { Grid, Radio } from "@material-ui/core";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
import marked from "marked";
import React from "react";
import { playbooks } from "root-rpg-model";
import { useCurrentCharacter } from "../../CharacterProvider";

const NatureBox: React.FC = props => {
  const [character, changeCharacter] = useCurrentCharacter();

  const updateNature = React.useCallback(
    (nature: string) => {
      changeCharacter(d => (d.nature = nature));
    },
    [changeCharacter]
  );

  return (
    <Grid item container direction="column" className="nature-box">
      <Grid item className="title">
        Your Nature
      </Grid>
      <Grid item className="options">
        {playbooks[character.playbook].natures.map(nature => (
          <Grid key={nature.name} item className="container">
            <Grid container direction="column" className="box">
              <Grid item container direction="row" alignItems="center">
                <Radio
                  checked={character.nature === nature.name ?? false}
                  onChange={() => updateNature(nature.name)}
                  icon={<CheckBoxOutlineBlank />}
                  checkedIcon={<CheckBox />}
                />
                <span className="name">{nature.name}</span>
              </Grid>
              <div className="description" dangerouslySetInnerHTML={{ __html: marked(nature.description) }}></div>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default React.memo(NatureBox);
