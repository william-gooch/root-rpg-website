import { Grid, FormGroup, FormLabel, FormHelperText, TextField } from "@material-ui/core";
import React from "react"
import { useCharacter } from "../../CharacterProvider";
import { Connection } from "../../model/playbooks/playbook";

const BlurbSplit: React.FC<{ textField: React.ReactElement<any, any>, blurb: string }> = React.memo(({ blurb, textField }) => {
  const [before, after] = blurb.split("###");

  return <>
    <span>{before}</span>
    { textField }
    <span>{after}</span>
  </>
});

const Connections: React.FC = props => {
  const [character, changeCharacter] = useCharacter();

  const updateConnection = React.useCallback((connection: Connection, value: string) => {
    changeCharacter(d => {
      d.connections[connection.name] = value;
    });
  }, [changeCharacter]);

  return (
    <Grid item container direction="column" className="connections-box">
      <Grid item className="title">Your Connections</Grid>
      <Grid item className="connections-options">
        <FormGroup>
          {character.playbook.connections.map(connection =>
            <div key={connection.name} className="option">
              <FormLabel className="name">{connection.name}</FormLabel>
              <FormHelperText className="blurb">
                <BlurbSplit
                  blurb={connection.blurb}
                  textField={
                    <TextField className="connection-name-entry"
                      value={character.connections[connection.name]}
                      onChange={evt => updateConnection(connection, evt.target.value)}
                    />
                  }
                />
              </FormHelperText>
              <FormHelperText className="description"><i>{connection.description}</i></FormHelperText>
            </div>
          )}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default React.memo(Connections);