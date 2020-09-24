import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",

    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
      height: theme.spacing(16),
    },
  },

  typo: {
    width: "100%",
    maxWidth: 500,
  },
}));

export default function SimplePaper() {
  const classes = useStyles();

  const [GlobalData, setGlobalData] = useState([]);

  useEffect(() => {
    Axios.get("https://api.thevirustracker.com/free-api?global=stats")
      .then((res) => setGlobalData(res.data.results))
      .catch((err) => console.log("Api Call Error"));
  }, []);

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        {GlobalData.map((single) => (
          <Typography
            align="center"
            variant="h4"
            gutterBottom
            style={{ color: "red" }}
          >
            {single.total_cases}
          </Typography>
        ))}

        <Typography
          align="center"
          variant="subtitle1"
          gutterBottom
          style={{ color: "green" }}
        >
          Global State Cases Today
        </Typography>
      </Paper>

      <Paper elevation={3}>
        {GlobalData.map((single) => (
          <Typography
            align="center"
            variant="h4"
            gutterBottom
            style={{ color: "blue" }}
          >
            {single.total_active_cases}
          </Typography>
        ))}
        <Typography align="center" variant="subtitle1" gutterBottom>
          Active Cases
        </Typography>
      </Paper>

      <Paper elevation={3}>
        {GlobalData.map((single) => (
          <Typography
            align="center"
            variant="h4"
            gutterBottom
            style={{ color: "orange" }}
          >
            {single.total_affected_countries}
          </Typography>
        ))}
        <Typography align="center" variant="subtitle1" gutterBottom>
          Affected Countries
        </Typography>
      </Paper>

      <Paper elevation={3}>
        {GlobalData.map((single) => (
          <Typography
            align="center"
            variant="h4"
            gutterBottom
            style={{ color: "purple" }}
          >
            {single.total_new_cases_today}
          </Typography>
        ))}
        <Typography align="center" variant="subtitle1" gutterBottom>
          New Cases Today
        </Typography>
      </Paper>
    </div>
  );
}
