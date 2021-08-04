import React from "react";
import { Paper, LinearProgress, Typography } from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "400.36px",
    height: "143.57px",
    margin: "auto",
    padding: "36px 32px",
    position: "relative",
    top: "200px",
  },
  text: {
    fontSize: "18px",
    marginBottom: "2rem",
    color: "#4F4F4F",
    fontWeight: "500",
  },
  load: {
    height: "6px",
    borderRadius: "8px",
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#2F80ED",
    },
  },
});

const Loading = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root}>
        <div className={classes.content}>
          <Typography className={classes.text}>Uploading...</Typography>
          <LinearProgress className={classes.load} />
        </div>
      </Paper>
    </ThemeProvider>
  );
};

export default Loading;
