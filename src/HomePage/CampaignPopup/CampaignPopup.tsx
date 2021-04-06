import { Button, Dialog, Grid, TextField } from "@material-ui/core";
import campaign from "api/campaign";
import React from "react";
import { useDispatch } from "redux/hooks";
import { getCampaigns } from "redux/actions/campaign";
import "./CampaignPopup.scss";

interface CampaignPopupProps {
  open: boolean;
  onClose(): void;
}

const CampaignPopup: React.FC<CampaignPopupProps> = ({ open, onClose }) => {
  const [campaignName, setCampaignName] = React.useState("");
  const dispatch = useDispatch();

  const onSubmit = React.useCallback(async () => {
    await campaign.new(campaignName);
    dispatch(getCampaigns());
    onClose();
  }, [campaignName, dispatch, onClose]);

  return (
    <Dialog open={open} onClose={onClose} className="campaign-popup">
      <Grid container direction="column" wrap="nowrap" className="campaign-container">
        <Grid item container spacing={4} direction="row" wrap="nowrap">
          <Grid item xs={12} container direction="column" className="campaign-box">
            <Grid item className="campaign-title">
              New Campaign
            </Grid>
            <Grid item container spacing={2} direction="column" className="campaign-form">
              <Grid item>
                <TextField
                  variant="outlined"
                  label="Campaign Name"
                  value={campaignName}
                  onChange={evt => setCampaignName(evt.target.value)}
                />
              </Grid>
              <Grid item>
                <Button onClick={onSubmit} fullWidth variant="outlined">
                  Create Campaign
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default React.memo(CampaignPopup);
