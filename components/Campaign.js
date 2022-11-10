import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CAMPAIGN_ADDRESS_URL } from "../constants/urls";

const Campaign = (props) => {
  return (
    <Card sx={{ minWidth: 275 }} style={{ display: "flex", margin: "10px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2">{props.address}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          href={CAMPAIGN_ADDRESS_URL(props.address)}
        >
          {props.buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Campaign;
