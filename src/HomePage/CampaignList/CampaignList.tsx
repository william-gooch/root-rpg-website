import { Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import campaign from "api/campaign";
import { Campaign } from "model/campaign";
import React from "react";
import CampaignItem from "./CampaignItem/CampaignItem";

interface CampaignListProps {}

const CampaignList: React.FC<CampaignListProps> = props => {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([]);

  React.useEffect(() => {
    const getCampaigns = async () => {
      try {
        const result = await campaign.my();
        setCampaigns(result);
      } catch (err) {
        console.log(err);
      }
    };
    getCampaigns();
  }, []);

  return (
    <Grid item className="my-box">
      <h2>Your Campaigns</h2>
      <Grid container direction="row" alignItems="stretch">
        {Object.entries(campaigns ?? {}).map(([id, character]) => character && <CampaignItem />)}
        <Grid item xs={12} md={3} className="new-campaign-container">
          <div role="button" className="new-campaign-button">
            <Grid container direction="column" alignItems="center" justify="center" className="new-campaign-box">
              <Grid item>
                <Add />
              </Grid>
              <Grid item>New Campaign</Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(CampaignList);
