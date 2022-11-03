import React from "react";
import factory from "../ethereum/factory";

export default Index = () => {
  const [campaigns, setCampaigns] = React.useState();
  React.useEffect(() => {
    const getCampaigns = async () => {
      setCampaigns(await factory.methods.getDeployedCampaigns().call());
    };
    getCampaigns();
  }, []);

  return <h1>This is the show page!!!</h1>;
};
