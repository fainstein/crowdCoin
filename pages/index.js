import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import Campaign from "../components/Campaign";
import Layout from "../components/Layout";
import { CREATE_CAMPAIGN_URL } from "../constants/urls";
import factory from "../ethereum/factory";

const CampaignIndex = ({ campaigns }) => {
  return (
    <Layout>
      <Typography variant="h3" gutterBottom component="div">
        Open Campaigns
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} container justifyContent="center">
          {campaigns.map((campaign) => {
            return (
              <Campaign
                key={campaign}
                address={campaign}
                buttonText="View Campaign"
              />
            );
          })}
        </Grid>
        <Grid item xs={6} container justifyContent="center">
          <Button
            color="primary"
            variant="contained"
            href={CREATE_CAMPAIGN_URL}
          >
            Create Campaign
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
