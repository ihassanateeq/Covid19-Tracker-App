import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "1000px",
    margin: "50px auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    color: "blue",
  },
}));

export default function AutoGrid() {
  const classes = useStyles();

  const [GlobalData, setGlobalData] = useState([]);

  useEffect(() => {
    async function getGlobalData() {
      const res = await Axios.get(
        "https://api.thevirustracker.com/free-api?global=stats"
      );

      delete res.data.results[0].source; // Deleted Object Property

      setGlobalData(res.data.results[0]);
    }

    getGlobalData();
  }, []);

  console.log(GlobalData);
  console.log(Object.keys(GlobalData));

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {Object.keys(GlobalData).map((
          single // Access all the keys of object & return Array
        ) => (
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Typography variant="subtitle1" className={classes.title}>
                <h3> {single.replace(/_/g, " ").toUpperCase()} </h3>
              </Typography>
              <Typography variant="subtitle2">
                <h3> {GlobalData[single]} </h3>
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
