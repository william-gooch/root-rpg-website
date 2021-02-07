import { Grid, IconButton, TextField } from "@material-ui/core";
import React from "react";
import { useCurrentCharacter } from "../../CharacterProvider";
import { connections, playbooks } from "root-rpg-model";
import marked from "marked";
import { Add, Delete } from "@material-ui/icons";
import SearchMenu from "SearchMenu/SearchMenu";

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
  const characterConnections = character.connections;

  const updateConnectionName = React.useCallback(
    (id: keyof typeof connections, value: string) => {
      changeCharacter(d => {
        if (d.connections[id]) {
          d.connections[id]!.name = value;
        }
      });
    },
    [changeCharacter]
  );

  const updateConnectionDescription = React.useCallback(
    (id: keyof typeof connections, value: string) => {
      changeCharacter(d => {
        if (d.connections[id]) {
          d.connections[id]!.description = value;
        }
      });
    },
    [changeCharacter]
  );

  const addConnection = React.useCallback(
    (id: keyof typeof connections) => {
      changeCharacter(d => {
        if (!d.connections[id]) {
          d.connections[id] = {
            name: "",
            description: "",
          };
        }
      });
    },
    [changeCharacter]
  );

  const deleteConnection = React.useCallback(
    (id: keyof typeof connections) => {
      changeCharacter(d => {
        delete d.connections[id];
      });
    },
    [changeCharacter]
  );

  const [menuAnchorEl, setMenuAnchorEl] = React.useState<Element | null>(null);

  return React.useMemo(
    () => (
      <Grid item container direction="column" className="connections-box">
        <Grid item className="title">
          Your Connections
        </Grid>
        <Grid item className="options">
          {Object.entries(playbooks[character.playbook].connections)
            .map(([id, blurb]) => [id, blurb] as [keyof typeof connections, string])
            .map(([id, blurb]) => (
              <Grid key={id} item className="container">
                <Grid container direction="column" className="box">
                  <span className="name">{connections[id].name}</span>
                  <div className="blurb">
                    <BlurbSplit
                      blurb={blurb ?? "###"}
                      textField={
                        <TextField
                          className="connection-name-entry"
                          value={characterConnections[id]?.name}
                          onChange={evt => updateConnectionName(id, evt.target.value)}
                        />
                      }
                    />
                  </div>
                  <div className="user-description">
                    <TextField
                      fullWidth
                      multiline
                      placeholder="Details..."
                      className="connection-description-entry"
                      variant="outlined"
                      value={characterConnections[id]?.description}
                      onChange={evt => updateConnectionDescription(id, evt.target.value)}
                    />
                  </div>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: marked(connections[id].description) }}
                  ></div>
                </Grid>
              </Grid>
            ))}
          {Object.entries(characterConnections)
            .filter(([id, v]) => !playbooks[character.playbook].connections[id as keyof typeof connections])
            .map(
              ([id, name]) =>
                [id, name] as [keyof typeof connections, typeof characterConnections[keyof typeof connections]]
            )
            .map(([id, name]) => (
              <Grid key={id} item className="container">
                <div className="actions">
                  <IconButton onClick={() => deleteConnection(id)}>
                    <Delete />
                  </IconButton>
                </div>
                <Grid container direction="column" className="box">
                  <span className="name">{connections[id].name}</span>
                  <div className="blurb">
                    <span>My {connections[id].name} is </span>
                    <TextField
                      className="connection-name-entry"
                      value={characterConnections[id]?.name}
                      onChange={evt => updateConnectionName(id, evt.target.value)}
                    />
                    <span>.</span>
                  </div>
                  <div className="user-description">
                    <TextField
                      className="connection-description-entry"
                      variant="outlined"
                      value={characterConnections[id]?.description}
                      onChange={evt => updateConnectionDescription(id, evt.target.value)}
                    />
                  </div>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: marked(connections[id].description) }}
                  ></div>
                </Grid>
              </Grid>
            ))}
          <Grid item className="container">
            <div role="button" className="new-connection-button" onClick={evt => setMenuAnchorEl(evt.currentTarget)}>
              <Grid container direction="column" alignItems="center" className="new-box">
                <Grid item>
                  <Add />
                </Grid>
                <Grid item>Add a connection from another Playbook</Grid>
              </Grid>
            </div>
          </Grid>
          <SearchMenu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={() => setMenuAnchorEl(null)}
            onSelect={item => addConnection(item as keyof typeof connections)}
            items={Object.keys(connections)}
            getItemText={item => connections[item as keyof typeof connections].name}
            filterPredicate={(item, filter) =>
              (filter
                ? connections[item as keyof typeof connections].name.toLowerCase().includes(filter.toLowerCase())
                : true) && Object.keys(characterConnections).indexOf(item) < 0
            }
          />
        </Grid>
      </Grid>
    ),
    [
      characterConnections,
      character.playbook,
      menuAnchorEl,
      updateConnectionName,
      updateConnectionDescription,
      addConnection,
      deleteConnection,
    ]
  );
};

export default React.memo(Connections);
