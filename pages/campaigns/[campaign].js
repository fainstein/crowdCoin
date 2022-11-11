import React from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";

import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import campaign from "../../ethereum/campaign";
import ContributeForm from "../../components/ContributeForm";
import { CAMPAIGN_REQUESTS_URL } from "../../constants/urls";

const CampaignShow = ({ campaignMetrics, campaignAddress }) => {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} container justifyContent="center">
          <Typography variant="h3" gutterBottom component="div">
            Campaign Details
          </Typography>
          {campaignMetrics.map((metric, i) => (
            <Grid item xs={12} md={6} container justifyContent="center" key={i}>
              <Card
                sx={{ minWidth: 200, width: "90%" }}
                style={{ display: "flex", margin: "10px" }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {metric.kpi}
                  </Typography>
                  <Typography variant="body2">{metric.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Button
            color="primary"
            variant="contained"
            fullWidth
            href={CAMPAIGN_REQUESTS_URL(campaignAddress)}
          >
            View Requests
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          container
          justifyContent="center"
          alignContent="space-between"
        >
          <ContributeForm address={campaignAddress} />
        </Grid>
      </Grid>
    </Layout>
  );
};

CampaignShow.getInitialProps = async (props) => {
  const campaignInstance = campaign(props.query.campaign);
  const campaignSummary = await campaignInstance.methods.getSummary().call();
  campaignSummary[1] = web3.utils.fromWei(campaignSummary[1], "ether");
  let campaignMetrics = [
    { kpi: campaignSummary[0], description: "Minimum Contribution" },
    { kpi: campaignSummary[1], description: "Campaign Balance (ETH)" },
    { kpi: campaignSummary[2], description: "Requests" },
    { kpi: campaignSummary[3], description: "Contributors" },
    { kpi: campaignSummary[4], description: "Manager Address" },
  ];
  return { campaignMetrics, campaignAddress: props.query.campaign };
};

export default CampaignShow;
