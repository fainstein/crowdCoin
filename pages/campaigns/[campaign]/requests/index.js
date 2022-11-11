import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Layout from "../../../../components/Layout";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Button, Grid, Typography } from "@mui/material";
import campaign from "../../../../ethereum/campaign";
import { CREATE_REQUEST_URL } from "../../../../constants/urls";
import web3 from "../../../../ethereum/web3";

const RequestsIndex = ({ requests, campaignAddress }) => {
  const tableHeaders = [
    "ID",
    "Description",
    "Amount",
    "Recipient",
    "Approval Count",
    "Approve",
    "Finalize",
  ];

  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [isFinalizeLoading, setIsFinalizeLoading] = useState(false);
  const [error, setError] = useState("");

  const approveRequestHandler = async (id) => {
    const accounts = web3.eth.getAccounts();

    setIsApproveLoading(true);
    setError("");
    try {
      const campaignInstance = campaign(campaignAddress);
      await campaignInstance.methods
        .approveRequest(id.toString())
        .send({ from: accounts[0] });
    } catch (err) {
      setError(err);
    }
    setIsApproveLoading(false);
  };

  const finalizeRequestHandler = async (id) => {
    const campaignInstance = campaign(campaignAddress);
    const accounts = web3.eth.getAccounts();
    setIsFinalizeLoading(true);
    setError("");
    try {
      await campaignInstance.methods
        .finalizeRequest(id)
        .send({ from: accounts[0] });
    } catch (err) {
      setError(err);
    }
    setIsFinalizeLoading(false);
  };

  return (
    <Layout>
      <Typography variant="h3" gutterBottom component="div">
        Requests
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} container justifyContent="center">
          {error && (
            <Alert variant="outlined" severity="error">
              {error.message}
            </Alert>
          )}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {tableHeaders.map((header) => (
                    <TableCell key={header} align="center">
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      ...(row.complete && { backgroundColor: "#EBEBE4" }),
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                    <TableCell align="center">{row.recipient}</TableCell>
                    <TableCell align="center">
                      {row.approvalCount.approvalCount}/
                      {row.approvalCount.approversCount}
                    </TableCell>
                    <TableCell align="center">
                      {console.log(row.approversCount)}
                      {!row.complete && (
                        <LoadingButton
                          disable={
                            row.approvalCount <
                              Math.ceil(row.approversCount / 2) ||
                            isFinalizeLoading.toString()
                          }
                          loading={isApproveLoading}
                          onClick={approveRequestHandler.bind(row.id)}
                          color="success"
                          variant="contained"
                        >
                          Approve
                        </LoadingButton>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {!row.complete && (
                        <LoadingButton
                          loading={isFinalizeLoading}
                          disable={isApproveLoading.toString()}
                          onClick={finalizeRequestHandler.bind(row.id)}
                          color="error"
                          variant="contained"
                        >
                          Finalize
                        </LoadingButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Button
            color="primary"
            variant="contained"
            href={CREATE_REQUEST_URL(campaignAddress)}
          >
            Add Request
          </Button>
        </Grid>
      </Grid>
        <Typography variant="h5" gutterBottom component="div">
          Found {requests.length} requests
        </Typography>
    </Layout>
  );
};

RequestsIndex.getInitialProps = async (props) => {
  const campaignInstance = campaign(props.query.campaign);
  const requestsCount = await campaignInstance.methods
    .getRequestsCount()
    .call();
  const approversCount = await campaignInstance.methods.approversCount().call();
  let requests = [];
  for (let i = 0; i < parseInt(requestsCount); i++) {
    const singleReq = await campaignInstance.methods.requests(i).call();
    requests.push({
      id: i,
      description: singleReq[0],
      amount: web3.utils.fromWei(singleReq[1], "ether"),
      recipient: singleReq[2],
      complete: singleReq[3],
      approvalCount: {
        approvalCount: parseInt(singleReq[4]),
        approversCount: parseInt(approversCount),
      },
    });
  }
  // A more fancy JS way of fetching
  // const requests = await Promise.all(
  //   Array(parseInt(requestsCount)).fill().map((element, index) => {
  //     return campaignInstance.methods.requests(index).call();
  //   })
  // )

  return {
    requests,
    campaignAddress: props.query.campaign,
  };
};

export default RequestsIndex;
