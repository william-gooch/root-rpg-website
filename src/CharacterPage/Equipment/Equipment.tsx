import { Checkbox, Grid } from "@material-ui/core";
import marked from "marked";
import React from "react"
import { defaultEquipment, equipmentTags } from "root-rpg-model";

interface EquipmentProps {
  
}

const Equipment: React.FC<EquipmentProps> = props => {
  return (
    <Grid item container direction="column" className="equipment-box">
      <Grid item container direction="row">
        <Grid item xs={12} lg={3} className="title">Your Equipment</Grid>
        <Grid item xs={12} container direction="row" className="equipment-container">
          {defaultEquipment.map(item =>
            <Grid key={item.name} item xs={12} lg={3} container direction="column" className="equipment-item">
              <div className="item-container">
                <Grid item container spacing={2} direction="row" alignItems="center">
                  <Grid item className="item-name"><b>{item.name}</b></Grid>
                  <Grid item>
                    {Array.from(new Array(item.wear)).map((_, i) =>
                      <Checkbox key={i} />
                    )}
                  </Grid>
                  <Grid item><b>Value:</b> {item.value}</Grid>
                  <Grid item><b>Load:</b> {item.load}</Grid>
                </Grid>
                {item.range.length > 0 &&
                  <Grid item container spacing={2} direction="row" alignItems="center">
                    <Grid item><b>Range:</b> {item.range.join(", ")}</Grid>
                    <Grid item><b>Weapon Skill Tags:</b> {item.skillTags.join(", ")}</Grid>
                  </Grid>
                }
                {item.tags.map(tag =>
                  <Grid key={tag} item>
                    <b>{tag}</b>: <span dangerouslySetInnerHTML={{ __html: marked.parseInline(equipmentTags.find(t => t.name === tag)!.description) }} />
                  </Grid>
                )}
              </div>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(Equipment);