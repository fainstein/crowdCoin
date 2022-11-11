import React from "react";
import {
  Alert,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";
import { CAMPAIGNS_URL } from "../../constants/urls";

const CampaignNew = () => {
  const router = useRouter();
  const [minContrib, setMinContrib] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const createCampaignHandler = async () => {
    setIsLoading(true);
    setError("");
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minContrib)
        .send({ from: accounts[0] });
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
    if (!error) {
      router.push(CAMPAIGNS_URL);
    }
  };

  return (
    <Layout>
      <Typography variant="h3" gutterBottom component="div">
        Create a Campaign
      </Typography>
      {error && (
        <Alert variant="outlined" severity="error">
          {error.message}
        </Alert>
      )}
      <Grid container>
        <Grid item xs={12} container justifyContent="center">
          <Grid
            item
            xs={6}
            container
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "25ch" }}>
              <Input
                value={minContrib}
                onChange={(event) =>
                  !isNaN(event.target.value) &&
                  setMinContrib(+event.target.value)
                }
                endAdornment={
                  <InputAdornment position="end">wei</InputAdornment>
                }
              />
              <FormHelperText>Minimum Contribution</FormHelperText>
            </FormControl>
            <LoadingButton
              onClick={createCampaignHandler}
              loading={isLoading}
              size="large"
              variant="contained"
              color="primary"
            >
              Create
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};
export default CampaignNew;
