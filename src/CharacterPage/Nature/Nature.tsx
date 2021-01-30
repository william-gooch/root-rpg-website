import {
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormHelperText,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import React from 'react';
import { useCharacter } from '../../CharacterProvider';

const NatureBox: React.FC = props => {
  const [character, changeCharacter] = useCharacter();

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
      <Grid item className="nature-options">
        <RadioGroup
          value={character.nature}
          onChange={evt => updateNature(evt.target.value)}
        >
          {character.playbook.natures.map(nature => (
            <FormControlLabel
              key={nature.name}
              value={nature.name}
              control={
                <Radio
                  icon={<CheckBoxOutlineBlank />}
                  checkedIcon={<CheckBox />}
                />
              }
              label={
                <>
                  <FormLabel>{nature.name}</FormLabel>
                  <FormHelperText>{nature.description}</FormHelperText>
                </>
              }
            />
          ))}
        </RadioGroup>
      </Grid>
    </Grid>
  );
};

export default React.memo(NatureBox);
