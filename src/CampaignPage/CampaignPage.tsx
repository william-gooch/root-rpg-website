import { Grid } from "@material-ui/core";
import campaign from "api/campaign";
import MyCharacterItem from "HomePage/MyCharacterList/MyCharacterItem/MyCharacterItem";
import { Campaign } from "model/campaign";
import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import TopBar from "TopBar/TopBar";

interface CampaignPageProps {}

const CampaignPage: React.FC<CampaignPageProps> = props => {
  const history = useHistory();
  const match = useRouteMatch<{ id: string }>();
  const campaignId = match.params.id;

  const [currentCampaign, setCurrentCampaign] = React.useState<Campaign>();

  const getCampaign = React.useCallback(async () => {
    try {
      setCurrentCampaign(await campaign.get(campaignId));
    } catch (e) {
      history.push("/");
    }
  }, [campaignId, history]);

  React.useEffect(() => {
    getCampaign();
  }, [getCampaign]);

  return (
    <>
      <TopBar />
      <Grid container direction="column">
        {currentCampaign && (
          <div className="campaigns-container">
            {currentCampaign.characters.length > 0 ? (
              currentCampaign.characters.map(({ id, value: character }) => (
                <MyCharacterItem character={character} goToCharacter={() => {}} deleteCharacter={() => {}} />
              ))
            ) : (
              <div className="campaigns-empty-text">No-one has joined your campaign yet!</div>
            )}
          </div>
        )}
      </Grid>
    </>
  );
};

export default React.memo(CampaignPage);
