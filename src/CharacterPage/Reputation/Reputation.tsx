import { Grid, Checkbox, Hidden, ThemeProvider, IconButton, TextField, Button } from "@material-ui/core";
import { Add, AddCircle, Delete, Edit, RemoveCircle } from "@material-ui/icons";
import { positiveNegativeTheme } from "App";
import { useCurrentCharacter } from "CharacterProvider";
import React from "react";
import { Reputation } from "root-rpg-model";

import "./Reputation.scss";

const ReputationBox: React.FC = props => {
  const [character, changeCharacter] = useCurrentCharacter();
  const [locked, setLocked] = React.useState(true);

  // Checks to see if the modifier changes when you mark notoriety or prestige.
  const checkModifier = (rep: Reputation) => {
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

  const changeNotoriety = React.useCallback(
    (faction: number, notoriety: number) => {
      changeCharacter(doc => {
        const rep = doc.reputation[faction];
        if (rep.notoriety === notoriety) {
          rep.notoriety = 0;
        } else {
          rep.notoriety = notoriety;
        }
        checkModifier(rep);
      });
    },
    [changeCharacter]
  );

  const changePrestige = React.useCallback(
    (faction: number, prestige: number) => {
      changeCharacter(doc => {
        const rep = doc.reputation[faction];
        if (rep.prestige === prestige) {
          rep.prestige = 0;
        } else {
          rep.prestige = prestige;
        }
        checkModifier(rep);
      });
    },
    [changeCharacter]
  );

  const deleteFaction = React.useCallback(
    (faction: number) => {
      changeCharacter(doc => {
        delete doc.reputation[faction];
      });
    },
    [changeCharacter]
  );

  const addFaction = React.useCallback(() => {
    changeCharacter(doc => {
      doc.reputation.push({
        faction: "New Faction",
        modifier: 0,
        prestige: 0,
        notoriety: 0,
      });
    });
  }, [changeCharacter]);

  const updateFactionName = React.useCallback(
    (faction: number, name: string) => {
      changeCharacter(doc => {
        doc.reputation[faction].faction = name;
      });
    },
    [changeCharacter]
  );

  return React.useMemo(
    () => (
      <Hidden mdDown>
        <ThemeProvider theme={positiveNegativeTheme}>
          <Grid item container direction="column" className="reputation-row">
            <Grid item className="title">
              <span>Your Reputation</span>
            </Grid>
            <Grid item container direction="column" alignItems="center" className="reputation-table">
              <table>
                <tbody>
                  {character.reputation.map((reputation, index) => (
                    <tr key={index} className="faction-row">
                      <td>
                        <IconButton size="small" onClick={() => setLocked(l => !l)}>
                          <Edit />
                        </IconButton>
                      </td>
                      <td>
                        <IconButton size="small" onClick={() => deleteFaction(index)}>
                          <Delete />
                        </IconButton>
                      </td>
                      <th className="name">
                        {locked ? (
                          reputation.faction
                        ) : (
                          <TextField
                            value={reputation.faction}
                            onChange={evt => updateFactionName(index, evt.target.value)}
                          />
                        )}
                      </th>
                      <td>
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() => changeNotoriety(index, reputation.notoriety + 1)}
                        >
                          <RemoveCircle />
                        </IconButton>
                      </td>
                      {[-3, -2, -1].map(i => (
                        <React.Fragment key={i}>
                          <td className={`spacer ${reputation.modifier === i ? "selected" : ""}`}>{i}</td>
                          {[3, 2, 1].map(j => (
                            <td key={j}>
                              <Checkbox
                                color="secondary"
                                className="checkbox"
                                checked={reputation.notoriety >= -(i + 1) * 3 + j}
                                onClick={() => changeNotoriety(index, -(i + 1) * 3 + j)}
                              />
                            </td>
                          ))}
                        </React.Fragment>
                      ))}
                      <td className={`spacer ${reputation.modifier === 0 ? "selected" : ""}`}>0</td>
                      {[1, 2, 3].map(i => (
                        <React.Fragment key={i}>
                          {[1, 2, 3, 4, 5].map(j => (
                            <td key={j}>
                              <Checkbox
                                color="primary"
                                className="checkbox"
                                checked={reputation.prestige >= (i - 1) * 5 + j}
                                onClick={() => changePrestige(index, (i - 1) * 5 + j)}
                              />
                            </td>
                          ))}
                          <td className={`spacer ${reputation.modifier === i ? "selected" : ""}`}>+{i}</td>
                        </React.Fragment>
                      ))}
                      <td>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => changePrestige(index, reputation.prestige + 1)}
                        >
                          <AddCircle />
                        </IconButton>
                      </td>
                    </tr>
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
    ),
    [character.reputation, addFaction, changeNotoriety, changePrestige, deleteFaction, locked, updateFactionName]
  );
};

export default ReputationBox;
