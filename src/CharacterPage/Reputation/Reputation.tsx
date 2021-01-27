import { Grid, Checkbox } from "@material-ui/core";
import React from "react"
import { factionData } from "../../model/faction";

const Reputation: React.FC = props => {
  return (
    <Grid item container direction="column" className="reputation-row">
      <Grid item className="title"><span>Your Reputation</span></Grid>
      <Grid item container direction="column" alignItems="center" className="reputation-table">
        <table>
          <tbody>
            {factionData.map(faction =>
              <tr key={faction.name} className="faction-row">
                <th>{faction.name}</th>
                {[-3, -2, -1].map(i =>
                  <React.Fragment key={i}>
                    <td className="spacer">{i}</td>
                    {[1, 2, 3].map(_ => <td key={_}><Checkbox color="primary" /></td>)}
                  </React.Fragment>
                )}
                <td className="spacer">0</td>
                {[1, 2, 3].map(i =>
                  <React.Fragment key={i}>
                    {[1, 2, 3, 4, 5].map(_ => <td key={_}><Checkbox color="secondary" /></td>)}
                    <td className="spacer">+{i}</td>
                  </React.Fragment>
                )}
              </tr>
            )}
            <tr className="status-row">
              <td></td>
              <th colSpan={12} className="notoriety"><span>Notoriety</span></th>
              <td></td>
              <th colSpan={18} className="prestige"><span>Prestige</span></th>
            </tr>
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
};

export default Reputation;