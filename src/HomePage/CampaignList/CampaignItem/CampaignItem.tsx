import { Grid, IconButton } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import { Campaign } from "model/campaign";
import React from "react";

interface CampaignItemProps {
  campaign: Campaign;
  goToCampaign(): void;
}

const CampaignItem: React.FC<CampaignItemProps> = props => {
  return (
    <Grid item xs={12} md={3} className="character-container">
      <div className="character-box">
        <Grid container direction="row" wrap="nowrap" alignItems="center">
          <Grid item className="character-name fill">
            <b>{props.campaign.name.length > 0 ? props.campaign.name : "Unnamed Campaign"}</b>
          </Grid>
          <IconButton onClick={props.goToCampaign}>
            <ChevronRight />
          </IconButton>
        </Grid>
      </div>
    </Grid>
  );
};

export default React.memo(CampaignItem);
