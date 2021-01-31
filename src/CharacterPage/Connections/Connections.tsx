import { Grid, FormGroup, FormLabel, FormHelperText, TextField } from "@material-ui/core";
import React from "react";
import { useCurrentCharacter } from "../../CharacterProvider";
import { Connection, connections, playbooks } from "root-rpg-model";
import marked from "marked";

const BlurbSplit: React.FC<{
  textField: React.ReactElement<any, any>;
  blurb: string;
}> = React.memo(({ blurb, textField }) => {
  const [before, after] = blurb.split("###");

  return (
    <>
      <span>{before}</span>
      {textField}
      <span>{after}</span>
    </>
  );
});

const Connections: React.FC = props => {
  const [character, changeCharacter] = useCurrentCharacter();

  const updateConnection = React.useCallback(
    (id: keyof typeof connections, value: string) => {
      changeCharacter(d => {
        d.connections[id] = value;
      });
    },
    [changeCharacter]
  );

  return (
    <Grid item container direction="column" className="connections-box">
      <Grid item className="title">
        Your Connections
      </Grid>
      <Grid item className="connections-options">
        <FormGroup>
          {Object.entries(playbooks[character.playbook].connections)
            .map(([id, blurb]) => [id, blurb] as [keyof typeof connections, string])
            .map(([id, blurb]) => (
              <Grid key={id} item className="connection-container">
                <Grid container direction="column" className="box">
                  <span className="name">{connections[id].name}</span>
                  <div className="blurb">
                    <BlurbSplit
                      blurb={blurb ?? "###"}
                      textField={
                        <TextField
                          className="connection-name-entry"
                          value={character.connections[id]}
                          onChange={evt => updateConnection(id, evt.target.value)}
                        />
                      }
                    />
                  </div>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: marked(connections[id].description) }}
                  ></div>
                </Grid>
              </Grid>
            ))}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default React.memo(Connections);
