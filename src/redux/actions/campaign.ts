import campaign from "api/campaign";
import { Campaign } from "model/campaign";
import { Dispatch } from "redux";

export const getCampaigns = () => async (dispatch: Dispatch): Promise<void> => {
  const campaigns = await campaign.my();
  dispatch(campaignsLoaded(campaigns));
};

const CAMPAIGNS_LOADED = "CAMPAIGNS_LOADED";
const campaignsLoaded = (campaigns: Campaign[]) => ({
  type: CAMPAIGNS_LOADED,
  campaigns,
});

export const types = { CAMPAIGNS_LOADED };
