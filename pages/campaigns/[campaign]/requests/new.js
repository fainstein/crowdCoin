import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../components/Layout";
import {
  Alert,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import { CAMPAIGN_REQUESTS_URL } from "../../../../constants/urls";

const RequestNew = ({ campaignAddress }) => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const createRequestHanlder = async () => {
    setIsLoading(true);
    setError("");
    try {
      const accounts = await web3.eth.getAccounts();
      const campaignInstance = campaign(campaignAddress);
      await campaignInstance.methods
        .createRequest(
          description,
          web3.utils.toWei(value.toString(), "ether"),
          recipient
        )
        .send({ from: accounts[0] });
    } catch (err) {
      setError(err);
    }

    if (!error) {
      router.push(CAMPAIGN_REQUESTS_URL(campaignAddress));
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <Typography variant="h3" gutterBottom component="div">
        Create a Request
      </Typography>
      <Grid item xs={12} container justifyContent="center">
        <Grid
          item
          xs={4}
          container
          justifyContent="center"
          sx={{
            "& .MuiTextField-root": { mb: 3, mt: 1 },
          }}
        >
          {error && (
            <Alert variant="outlined" severity="error">
              {error.message}
            </Alert>
          )}
          <TextField
            label="Description"
            variant="standard"
            fullWidth
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
          <TextField
            label="Recipient"
            variant="standard"
            fullWidth
            onChange={(event) => setRecipient(event.target.value)}
            value={recipient}
          />
          <FormControl variant="standard" sx={{ mb: 6 }} fullWidth>
            <InputLabel htmlFor="value">Amount</InputLabel>
            <Input
              type="number"
              onChange={(event) => setValue(event.target.value)}
              value={value}
              endAdornment={
                <InputAdornment position="end">ether</InputAdornment>
              }
            />
          </FormControl>
          <LoadingButton
            onClick={createRequestHanlder}
            loading={isLoading}
            fullWidth
            size="medium"
            variant="contained"
            color="primary"
          >
            Create Request
          </LoadingButton>
        </Grid>
      </Grid>
    </Layout>
  );
};

RequestNew.getInitialProps = (props) => {
  return { campaignAddress: props.query.campaign };
};

export default RequestNew;
