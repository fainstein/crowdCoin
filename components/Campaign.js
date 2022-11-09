import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Campaign = (props) => {
  return (
    <Card sx={{ minWidth: 275 }} style={{display: "flex"}}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2">{props.address}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" color="secondary">{props.buttonText}</Button>
      </CardActions>
    </Card>
  );
};

export default Campaign;
