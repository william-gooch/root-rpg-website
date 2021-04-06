import { Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { getCampaigns } from "redux/actions/campaign";
import { useDispatch, useSelector } from "redux/hooks";
import CampaignItem from "./CampaignItem/CampaignItem";

interface CampaignListProps {
  newCampaign(): void;
}

const CampaignList: React.FC<CampaignListProps> = props => {
  const campaigns = useSelector(state => state.campaign.campaigns);
  const dispatch = useDispatch();
  const history = useHistory();

  const loadCampaigns = React.useCallback(async () => {
    dispatch(getCampaigns());
  }, [dispatch]);

  React.useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);

  const navigateToCampaignPage = React.useCallback(
    (id: string) => {
      if (id) {
        history.push(`/campaign/${id}`);
      }
    },
    [history]
  );

  return (
    <Grid item className="campaign-box">
      <h2>Your Campaigns</h2>
      <Grid container direction="row" alignItems="stretch">
        {campaigns?.map(
          (campaign: any) =>
            campaign && (
              <CampaignItem
                key={campaign.id}
                campaign={campaign}
                goToCampaign={() => navigateToCampaignPage(campaign.id)}
              />
            )
        )}
        <Grid item xs={12} md={3} className="new-campaign-container">
          <div role="button" onClick={props.newCampaign} className="new-campaign-button">
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
