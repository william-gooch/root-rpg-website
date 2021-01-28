import { Grid, FormGroup, FormLabel, FormHelperText, TextField } from "@material-ui/core";
import React from "react"
import { Connection } from "../../model/playbooks/playbook";

interface ConnectionsProps {
  connections: Connection[];
}

const Connections: React.FC<ConnectionsProps> = props => {
  const getBlurbSplit = (blurb: string) => {
    const [before, after] = blurb.split("###");

    return <>
      <span>{before}</span>
      <TextField className="connection-name-entry" />
      <span>{after}</span>
    </>
  }

  return (
    <Grid item container direction="column" className="connections-box">
      <Grid item className="title">Your Connections</Grid>
      <Grid item className="connections-options">
        <FormGroup>
          {props.connections.map(connection =>
            <div key={connection.name} className="option">
              <FormLabel className="name">{connection.name}</FormLabel>
              <FormHelperText className="blurb">{getBlurbSplit(connection.blurb)}</FormHelperText>
              <FormHelperText className="description"><i>{connection.description}</i></FormHelperText>
            </div>
          )}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default React.memo(Connections);