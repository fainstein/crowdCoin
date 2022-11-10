import React, { useState } from "react";
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
import campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { useRouter } from "next/router";
import { CAMPAIGN_ADDRESS_URL } from "../constants/urls";

const ContributeForm = ({ address }) => {
  const [contribution, setContribution] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const contributeHandler = async () => {
    setIsLoading(true);
    setError("");
    try {
      const accounts = await web3.eth.getAccounts();
      const campaignInstance = campaign(address);
      await campaignInstance.methods
        .contribute()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(contribution.toString()),
        });
        setContribution("");
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
    if (!error) {
      router.push(CAMPAIGN_ADDRESS_URL(address));
    }
  };

  return (
    <>
      <Typography variant="h3" gutterBottom component="div">
        Contribute to this Campaign
      </Typography>
      {error && (
        <Alert variant="outlined" severity="error">
          {error.message}
        </Alert>
      )}
      <Grid item xs={12} container justifyContent="center">
        <FormControl variant="standard" sx={{ m: 1, mt: 3 }} fullWidth>
          <Input
            type="number"
            // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            value={contribution}
            onChange={
              (event) => setContribution(event.target.value)
              //   !isNaN(event.target.value) && setContribution(+event.target.value)
            }
            endAdornment={<InputAdornment position="end">ether</InputAdornment>}
          />
          <FormHelperText>Your contribution</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} container justifyContent="center" alignItems="center">
        <LoadingButton
          onClick={contributeHandler}
          loading={isLoading}
          fullWidth
          size="medium"
          variant="contained"
          color="primary"
        >
          Contribute
        </LoadingButton>
      </Grid>
    </>
  );
};

export default ContributeForm;
