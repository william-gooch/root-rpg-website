import React from "react";
import * as Automerge from "automerge";
import { Grid, Menu, MenuItem } from "@material-ui/core";
import { useCurrentCharacter } from "CharacterProvider";
import { defaultEquipment, EquipmentItem, getItemValue, playbooks } from "root-rpg-model";
import { Add } from "@material-ui/icons";
import EquipmentItemComponent from "./EquipmentItem";

interface EquipmentProps {}

const Equipment: React.FC<EquipmentProps> = props => {
  const [character, changeCharacter] = useCurrentCharacter();
  const [newMenuAnchor, setNewMenuAnchor] = React.useState<HTMLElement | null>(null);

  const addItem = React.useCallback(
    (item: EquipmentItem) => {
      changeCharacter(doc => {
        doc.equipment.push(item);
      });
    },
    [changeCharacter]
  );

  const changeItem = React.useCallback(
    (itemIndex: number, fn: Automerge.ChangeFn<EquipmentItem>) => {
      changeCharacter(doc => {
        fn(doc.equipment[itemIndex]);
      });
    },
    [changeCharacter]
  );

  const deleteItem = React.useCallback(
    (itemIndex: number) => {
      changeCharacter(doc => {
        (doc.equipment as any).deleteAt(itemIndex);
      });
    },
    [changeCharacter]
  );

  const currentLoad = React.useMemo(() => character.equipment.reduce((prev, curr) => prev + curr.load, 0), [
    character.equipment,
  ]);

  return React.useMemo(
    () => (
      <Grid item container direction="column" className="equipment-box">
        <Grid item container direction="row" alignItems="stretch">
          <Grid item xs={12} lg={3} container direction="row" alignItems="center" className="title">
            Your Equipment
            <Grid item className="total-value">
              (Total Value: {character.equipment.reduce((prev, curr) => prev + getItemValue(curr), 0)},
            </Grid>
            <Grid item className="total-value">
              Starting Value: {playbooks[character.playbook].startingEquipmentValue})
            </Grid>
          </Grid>
          <Grid item xs={12} lg container direction="row" alignItems="center" className="load">
            (
            <Grid
              item
              className={
                "total-load" +
                (currentLoad >= 2 * (character.stats.Might + 4)
                  ? " max"
                  : currentLoad >= character.stats.Might + 4
                  ? " burdened"
                  : "")
              }
            >
              Current Load: {currentLoad}
            </Grid>
            ,
            <Grid item className="total-load">
              Burdened: {character.stats.Might + 4}
            </Grid>
            ,
            <Grid item className="total-load">
              Max: {2 * (character.stats.Might + 4)}
            </Grid>
            )
          </Grid>
          <Grid item xs={12} container direction="row" alignItems="stretch" className="equipment-container">
            {character.equipment.map((item, index) => (
              <EquipmentItemComponent
                key={index}
                item={item}
                changeItem={fn => changeItem(index, fn)}
                deleteItem={() => deleteItem(index)}
              />
            ))}
            <Grid item xs={12} lg={3} container direction="column" className="equipment-item">
              <div role="button" className="new-equipment-button" onClick={evt => setNewMenuAnchor(evt.currentTarget)}>
                <Grid container direction="column" alignItems="center" justify="center" className="new-box">
                  <Grid item>
                    <Add />
                  </Grid>
                  <Grid item>Add a new piece of Equipment</Grid>
                </Grid>
              </div>
              <Menu
                open={Boolean(newMenuAnchor)}
                anchorEl={newMenuAnchor}
                onClose={() => setNewMenuAnchor(null)}
                anchorOrigin={{ horizontal: "center", vertical: "center" }}
              >
                {defaultEquipment.map(item => (
                  <MenuItem
                    onClick={() => {
                      addItem(item);
                      setNewMenuAnchor(null);
                    }}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    ),
    [
      character.equipment,
      character.playbook,
      character.stats,
      currentLoad,
      addItem,
      changeItem,
      deleteItem,
      newMenuAnchor,
    ]
  );
};

export default Equipment;
