import React from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";

const CampaignShow = ({ campaignMetrics }) => {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} container justifyContent="center">
          <Typography variant="h3" gutterBottom component="div">
            Campaign Details
          </Typography>
          {campaignMetrics.map((metric, i) => {
            return (
              <Grid
                item
                xs={12}
                md={6}
                container
                justifyContent="center"
                key={i}
              >
                <Card
                  sx={{ minWidth: 200, width: "90%" }}
                  style={{ display: "flex", margin: "10px" }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {metric.kpi}
                    </Typography>
                    <Typography variant="body2">
                      {metric.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
          <Button color="primary" variant="contained" fullWidth href={"#"}>
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
          <Typography variant="h3" gutterBottom component="div">
            Contribute to this Campaign
          </Typography>
          <Grid item xs={12} container justifyContent="center">
            <FormControl variant="standard" sx={{ m: 1, mt: 3 }} fullWidth>
              <Input
                // value={minContrib}
                // onChange={(event) =>
                //   !isNaN(event.target.value) &&
                //   setMinContrib(+event.target.value)
                // }
                endAdornment={
                  <InputAdornment position="end">wei</InputAdornment>
                }
              />
              <FormHelperText>Your contribution</FormHelperText>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
          >
            <LoadingButton
              // onClick={createCampaignHandler}
              // loading={isLoading}
              fullWidth
              size="medium"
              variant="contained"
              color="primary"
            >
              Contribute
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

CampaignShow.getInitialProps = async () => {
  let campaignMetrics = [
    { kpi: 1, description: "Campaign Balance" },
    { kpi: 100, description: "Minimum Contribution" },
    { kpi: 100, description: "Requests" },
    { kpi: 100, description: "Contributors" },
  ];
  return { campaignMetrics };
};

export default CampaignShow;
