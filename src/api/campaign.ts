import { Campaign } from "model/campaign";
import { api } from "./api";

const myCampaigns = async (): Promise<Campaign[]> => {
  const response = await api.get("/campaign/my");
  return response.data as Campaign[];
};

const getCampaign = async (campaignId: string): Promise<Campaign> => {
  const response = await api.get(`/campaign/${campaignId}`);
  return response.data as Campaign;
};

const newCampaign = async (): Promise<Campaign> => {
  const response = await api.post("/campaign/new");
  return response.data as Campaign;
};

export default {
  my: myCampaigns,
  get: getCampaign,
  new: newCampaign,
};
