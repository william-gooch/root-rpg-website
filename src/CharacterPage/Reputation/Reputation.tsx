import { Grid, Hidden, ThemeProvider, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { positiveNegativeTheme } from "App";
import { CharacterChangeFn } from "CharacterProvider";
import React from "react";
import * as Automerge from "automerge";
import { Reputation } from "root-rpg-model";

import "./Reputation.scss";
import ReputationRow from "./ReputationRow";

interface ReputationBoxProps {
  reputation: Automerge.Doc<Reputation[]>;
  changeCharacter(fn: CharacterChangeFn): void;
}

const ReputationBox: React.FC<ReputationBoxProps> = props => {
  console.log("re-rendering");

  const changeNotoriety = React.useCallback(
    (faction: number, notoriety: number) => {
      props.changeCharacter(doc => {
        const rep = doc.reputation[faction];
        if (rep.notoriety === notoriety) {
          rep.notoriety = 0;
        } else {
          rep.notoriety = notoriety;
        }
        checkModifier(rep);
      });
    },
    [props.changeCharacter]
  );

  const changePrestige = React.useCallback(
    (faction: number, prestige: number) => {
      props.changeCharacter(doc => {
        const rep = doc.reputation[faction];
        if (rep.prestige === prestige) {
          rep.prestige = 0;
        } else {
          rep.prestige = prestige;
        }
        checkModifier(rep);
      });
    },
    [props.changeCharacter]
  );

  // Checks to see if the modifier changes when you mark notoriety or prestige.
  const checkModifier = (rep: Reputation) => {
    let [prestigeThreshold, notorietyThreshold] = getModifierThresholds(rep.modifier);

    while (rep.prestige >= prestigeThreshold || rep.notoriety >= notorietyThreshold) {
      if (prestigeThreshold > 0 && rep.prestige >= prestigeThreshold) {
        rep.prestige -= prestigeThreshold;
        rep.modifier += 1;
      } else if (notorietyThreshold > 0 && rep.notoriety >= notorietyThreshold) {
        rep.notoriety -= notorietyThreshold;
        rep.modifier -= 1;
      }
      [prestigeThreshold, notorietyThreshold] = getModifierThresholds(rep.modifier);
    }
  };

  // Get the positive and negative thresholds for when you mark reputation.
  const getModifierThresholds = (modifier: number) => {
    let prestigeThreshold = 0;
    let notorietyThreshold = 0;
    // Set prestige threshold!
    if (modifier < 1) {
      prestigeThreshold = 5;
    } else if (modifier === 1) {
      prestigeThreshold = 10;
    } else if (modifier === 2) {
      prestigeThreshold = 15;
    }

    // Set notoriety threshold!
    if (modifier > -1) {
      notorietyThreshold = 3;
    } else if (modifier === -1) {
      notorietyThreshold = 6;
    } else if (modifier === -2) {
      notorietyThreshold = 9;
    }
    return [prestigeThreshold, notorietyThreshold];
  };

  const deleteFaction = React.useCallback(
    (faction: number) => {
      props.changeCharacter(doc => {
        delete doc.reputation[faction];
      });
    },
    [props.changeCharacter]
  );

  const addFaction = React.useCallback(() => {
    props.changeCharacter(doc => {
      doc.reputation.push({
        faction: "New Faction",
        modifier: 0,
        prestige: 0,
        notoriety: 0,
      });
    });
  }, [props.changeCharacter]);

  const updateFactionName = React.useCallback(
    (faction: number, name: string) => {
      props.changeCharacter(doc => {
        doc.reputation[faction].faction = name;
      });
    },
    [props.changeCharacter]
  );

  return (
    <Hidden mdDown>
      <ThemeProvider theme={positiveNegativeTheme}>
        <Grid item container direction="column" className="reputation-row">
          <Grid item className="title">
            <span>Your Reputation</span>
          </Grid>
          <Grid item container direction="column" alignItems="center" className="reputation-table">
            <table>
              <tbody>
                {props.reputation.map((reputation, index) => (
                  <ReputationRow
                    key={index}
                    index={index}
                    reputation={reputation}
                    deleteFaction={deleteFaction}
                    updateFactionName={updateFactionName}
                    changePrestige={changePrestige}
                    changeNotoriety={changeNotoriety}
                  />
                ))}
              </tbody>
              <tfoot>
                <tr className="status-row">
                  <td colSpan={3}>
                    <Button size="small" onClick={() => addFaction()} startIcon={<Add />}>
                      <i>Add Faction</i>
                    </Button>
                  </td>
                  <th colSpan={13} className="notoriety">
                    <span>Notoriety</span>
                  </th>
                  <td></td>
                  <th colSpan={19} className="prestige">
                    <span>Prestige</span>
                  </th>
                </tr>
              </tfoot>
            </table>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Hidden>
  );
};

export default React.memo(ReputationBox, (oldProps, newProps) => {
  return oldProps.reputation === newProps.reputation;
});
