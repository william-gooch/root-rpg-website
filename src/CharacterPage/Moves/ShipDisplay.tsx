import React from "react";
import * as Automerge from "automerge";
import { Checkbox, Grid, TextField } from "@material-ui/core";
import { moves } from "root-rpg-model";

interface ShipDisplayProps {
  shipData: any;
  changeShip(fn: Automerge.ChangeFn<any>): void;
}

const ShipDisplay: React.FC<ShipDisplayProps> = props => {
  return (
    <Grid container direction="column" alignItems="center" className="ship-display-container">
      <Grid item xs={10} container direction="column" alignItems="stretch" className="ship-display-box">
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
          wrap="nowrap"
          spacing={2}
          className="ship-name-wear-row"
        >
          <Grid item>
            <TextField
              label="Your Ship's Name"
              variant="outlined"
              value={props.shipData.name}
              onChange={evt => props.changeShip(doc => (doc.name = evt.target.value))}
            />
          </Grid>
          <Grid item className="wear-text">
            Wear
          </Grid>
          {Array.from(new Array(props.shipData.maxWear)).map((_, i) => (
            <Checkbox
              checked={props.shipData.wear > i}
              onClick={() => props.changeShip(doc => (doc.wear = doc.wear === i + 1 ? 0 : i + 1))}
              key={i}
            />
          ))}
        </Grid>
        <Grid item container direction="column" className="traits-block">
          <Grid item className="traits-text">
            Blessings (choose two):
          </Grid>
          {moves["small-ship"].extra.blessings.map(blessing => (
            <Grid item>
              <Checkbox
                checked={props.shipData.blessings[blessing.name] ?? false}
                onChange={evt => props.changeShip(doc => (doc.blessings[blessing.name] = evt.target.checked))}
              />
              <span className="traits-text">{blessing.name}: </span>
              <span>{blessing.description}</span>
            </Grid>
          ))}
        </Grid>
        <Grid item container direction="column" className="traits-block">
          <Grid item className="traits-text">
            Flaws (choose two):
          </Grid>
          {moves["small-ship"].extra.flaws.map(flaw => (
            <Grid item>
              <Checkbox
                checked={props.shipData.flaws[flaw.name] ?? false}
                onChange={evt => props.changeShip(doc => (doc.flaws[flaw.name] = evt.target.checked))}
              />
              <span className="traits-text">{flaw.name}: </span>
              <span>{flaw.description}</span>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(ShipDisplay);
