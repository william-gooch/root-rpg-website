import { Grid, FormGroup, FormLabel, FormHelperText } from "@material-ui/core";
import React from "react"
import { Connection } from "../../model/playbooks/playbook";

interface ConnectionsProps {
  connections: Connection[];
}

const Connections: React.FC<ConnectionsProps> = props => {
  return (
    <Grid item container direction="column" className="connections-box">
      <Grid item className="title">Your Connections</Grid>
      <Grid item className="connections-options">
        <FormGroup>
          {props.connections.map(connection =>
            <div key={connection.name}>
              <FormLabel>{connection.name}</FormLabel>
              <FormHelperText>{connection.blurb}</FormHelperText>
              <FormHelperText>{connection.description}</FormHelperText>
            </div>
          )}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default Connections;