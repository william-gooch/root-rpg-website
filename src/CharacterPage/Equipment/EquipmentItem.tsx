import React from "react";
import * as Automerge from "automerge";
import { EquipmentItem, equipmentTags, getItemValue, weaponSkills } from "root-rpg-model";
import { Checkbox, Chip, Grid, IconButton, MenuItem, Select, TextField } from "@material-ui/core";
import marked from "marked";
import { AddCircle, Delete, Lock, LockOpen, RemoveCircle } from "@material-ui/icons";

interface EquipmentItemProps {
  item: EquipmentItem;
  changeItem(fn: Automerge.ChangeFn<EquipmentItem>): void;
  deleteItem(): void;
}

const EquipmentItemComponent: React.FC<EquipmentItemProps> = ({ item, changeItem, deleteItem }) => {
  const [locked, setLocked] = React.useState(true);

  return (
    <Grid item xs={12} lg={3} container direction="column" className="equipment-item">
      <div className="equipment-actions">
        {!locked && (
          <IconButton onClick={deleteItem}>
            <Delete />
          </IconButton>
        )}
        <IconButton onClick={() => setLocked(!locked)}>{locked ? <Lock /> : <LockOpen />}</IconButton>
      </div>
      <div className="item-container">
        <Grid item container spacing={2} direction="row" alignItems="center">
          <Grid item className="item-name">
            {locked ? (
              <div>{item.name}</div>
            ) : (
              <TextField
                value={item.name}
                onChange={evt =>
                  changeItem(item => {
                    item.name = evt.target.value;
                  })
                }
              />
            )}
          </Grid>
          <Grid item>
            {!locked && (
              <IconButton>
                <RemoveCircle onClick={() => changeItem(item => (item.wear.max = Math.max(item.wear.max - 1, 0)))} />
              </IconButton>
            )}
            {Array.from(new Array(item.wear.max)).map((_, i) => (
              <Checkbox key={i} />
            ))}
            {!locked && (
              <IconButton onClick={() => changeItem(item => (item.wear.max += 1))}>
                <AddCircle />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <Grid item container spacing={2} direction="row" alignItems="center" className="item-value">
          <Grid item>
            <b>Value:</b>
          </Grid>
          <Grid item>
            <span>{getItemValue(item)}</span>
          </Grid>
          <Grid item>
            <b>Load:</b>
          </Grid>
          <Grid item>
            {locked ? (
              <span>{item.load}</span>
            ) : (
              <TextField
                type="number"
                value={item.load}
                onChange={evt => {
                  const load = parseInt(evt.target.value);
                  if (load >= 0) {
                    changeItem(item => (item.load = load));
                  }
                }}
              />
            )}
          </Grid>
        </Grid>
        {(Object.entries(item.range).length > 0 || !locked) && (
          <Grid item container direction="column" alignItems="center">
            <Grid item container direction="row" alignItems="center" spacing={2}>
              <Grid item>
                <b>Range:</b>
              </Grid>
              <Grid item>
                {locked ? (
                  <span>{item.range.join(", ")}</span>
                ) : (
                  <Select
                    multiple
                    value={item.range}
                    onChange={evt => changeItem(item => (item.range = evt.target.value as any))}
                    renderValue={selected => (
                      <div>
                        {(selected as string[]).map(value => (
                          <Chip key={value} label={value} />
                        ))}
                      </div>
                    )}
                  >
                    {["Intimate", "Close", "Far"].map(range => (
                      <MenuItem key={range} value={range}>
                        {range}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </Grid>
            </Grid>
            {Object.entries(item.range).length > 0 && (
              <Grid item container direction="row" alignItems="center" spacing={2}>
                <Grid item>
                  <b>Weapon Skill Tags:</b>
                </Grid>
                <Grid item>
                  {locked ? (
                    <span>{item.skillTags.join(", ")}</span>
                  ) : (
                    <Select
                      multiple
                      value={item.skillTags}
                      onChange={evt => changeItem(item => (item.skillTags = evt.target.value as any))}
                      renderValue={selected => (
                        <div>
                          {(selected as string[]).map(value => (
                            <Chip key={value} label={value} />
                          ))}
                        </div>
                      )}
                    >
                      {weaponSkills.map(skill => (
                        <MenuItem key={skill} value={skill}>
                          {skill}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
        {locked ? (
          item.tags.map(tag => (
            <Grid key={tag} item>
              <b>{tag}</b>:{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(equipmentTags.find(t => t.name === tag)?.description ?? ""),
                }}
              />
            </Grid>
          ))
        ) : (
          <Grid item container direction="row" alignItems="center" spacing={2}>
            <Grid item>
              <b>Tags:</b>
            </Grid>
            <Grid item>
              <Select
                multiple
                value={item.tags}
                onChange={evt => changeItem(item => (item.tags = evt.target.value as any))}
                renderValue={selected => (
                  <div>
                    {(selected as string[]).map(value => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                {equipmentTags.map(tag => (
                  <MenuItem key={tag.name} value={tag.name}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        )}
      </div>
    </Grid>
  );
};

export default React.memo(EquipmentItemComponent);
