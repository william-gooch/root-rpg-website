import { Campaign } from "model/campaign";
import { types } from "redux/actions/campaign";

export interface CampaignState {
  campaigns: Campaign[];
}

const defaultCampaignState: CampaignState = {
  campaigns: [],
};

export default (state = defaultCampaignState, action: any): CampaignState => {
  switch (action.type) {
    case types.CAMPAIGNS_LOADED:
      return { campaigns: action.campaigns };
    default:
      return state;
  }
};
