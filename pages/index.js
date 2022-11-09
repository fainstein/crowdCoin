import { Button, Grid, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Campaign from "../components/Campaign";
import Layout from "../components/Layout";
import factory from "../ethereum/factory";

const CampaignIndex = ({ campaigns }) => {
  return (
    <Layout>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography variant="h3" gutterBottom component="div">
          Open Campaigns
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} container justifyContent="center">
            {campaigns.map((campaign) => {
              return <Campaign address={campaign} buttonText="View Campaign"/>;
            })}
          </Grid>
          <Grid item xs={6} container justifyContent="center">
            <Button
              color="primary"
              variant="contained"
              style={{
                backgroundColor: "#121212",
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
              }}
            >
              Create Campaign
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
