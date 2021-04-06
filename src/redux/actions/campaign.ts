import campaign from "api/campaign";
import { Campaign } from "model/campaign";
import { Dispatch } from "redux";
import { AppThunk } from "redux/store";

export const getCampaigns = (): AppThunk => async (dispatch: Dispatch): Promise<void> => {
  const campaigns = await campaign.my();
  dispatch(campaignsLoaded(campaigns));
};

const CAMPAIGNS_LOADED = "CAMPAIGNS_LOADED";
export interface CampaignsLoadedAction {
  type: typeof CAMPAIGNS_LOADED;
  campaigns: Campaign[];
}
const campaignsLoaded = (campaigns: Campaign[]): CampaignsLoadedAction => ({
  type: CAMPAIGNS_LOADED,
  campaigns,
});

export const types = { CAMPAIGNS_LOADED };
