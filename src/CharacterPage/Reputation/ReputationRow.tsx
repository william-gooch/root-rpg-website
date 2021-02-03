import { IconButton, TextField, Checkbox } from "@material-ui/core";
import { Edit, Delete, RemoveCircle, AddCircle } from "@material-ui/icons";
import React from "react";
import { Reputation } from "root-rpg-model";

interface ReputationRowProps {
  reputation: Reputation;
  index: number;
  changeNotoriety(index: number, notoriety: number): void;
  changePrestige(index: number, prestige: number): void;
  updateFactionName(index: number, name: string): void;
  deleteFaction(index: number): void;
}

const ReputationRow: React.FC<ReputationRowProps> = props => {
  const [locked, setLocked] = React.useState(true);
  return (
    <tr className="faction-row">
      <td>
        <IconButton size="small" onClick={() => setLocked(!locked)}>
          <Edit />
        </IconButton>
      </td>
      <td>
        <IconButton size="small" onClick={() => props.deleteFaction(props.index)}>
          <Delete />
        </IconButton>
      </td>
      <th className="name">
        {locked ? (
          props.reputation.faction
        ) : (
          <TextField
            value={props.reputation.faction}
            onChange={evt => props.updateFactionName(props.index, evt.target.value)}
          />
        )}
      </th>
      <td>
        <IconButton
          size="small"
          color="secondary"
          onClick={() => props.changeNotoriety(props.index, props.reputation.notoriety + 1)}
        >
          <RemoveCircle />
        </IconButton>
      </td>
      {[-3, -2, -1].map(i => (
        <React.Fragment key={i}>
          <td className={`spacer ${props.reputation.modifier === i ? "selected" : ""}`}>{i}</td>
          {[3, 2, 1].map(j => (
            <td key={j}>
              <Checkbox
                color="secondary"
                className="checkbox"
                checked={props.reputation.notoriety >= -(i + 1) * 3 + j}
                onClick={() => props.changeNotoriety(props.index, -(i + 1) * 3 + j)}
              />
            </td>
          ))}
        </React.Fragment>
      ))}
      <td className={`spacer ${props.reputation.modifier === 0 ? "selected" : ""}`}>0</td>
      {[1, 2, 3].map(i => (
        <React.Fragment key={i}>
          {[1, 2, 3, 4, 5].map(j => (
            <td key={j}>
              <Checkbox
                color="primary"
                className="checkbox"
                checked={props.reputation.prestige >= (i - 1) * 5 + j}
                onClick={() => props.changePrestige(props.index, (i - 1) * 5 + j)}
              />
            </td>
          ))}
          <td className={`spacer ${props.reputation.modifier === i ? "selected" : ""}`}>+{i}</td>
        </React.Fragment>
      ))}
      <td>
        <IconButton
          size="small"
          color="primary"
          onClick={() => props.changePrestige(props.index, props.reputation.prestige + 1)}
        >
          <AddCircle />
        </IconButton>
      </td>
    </tr>
  );
};

export default React.memo(ReputationRow);
