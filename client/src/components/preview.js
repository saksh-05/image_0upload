import { Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useRef } from "react";
import { ReactComponent as Check } from "../resources/check-circle.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "466.36px",
    height: "auto",
    margin: "auto",
    textAlign: "center",
        padding: "2rem",
        marginTop: '5rem',
    marginBottom:'5rem',
  },
  text: {
    fontFamily: "Poppins",
    fontStyle: "Medium",
    fontSize: "18px",
    align: "center",
    verticalAlign: "top",
    letterSpacing: "-3.5%",
    marginTop: "10px",
    marginBottom: "25px",
    fontWeight: "500",
  },
  image: {
    width: "100%",
    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
      margin: "1rem 0",
  },
  im: {
    minHeight: "200px",
    backgroundSize: "auto 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
      width: "100%",
    height:'500px',
  },

  inputContainer: {
    display: "inline-flex",
    width: "338px",
    height: "33px",
    background: "#F6F8FB",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
  },
  input: {
    outline: "none",
    border: "none",
    width: "100%",
    fontFamily: "inherit",
    fontWeight: "inherit",
    fontSize: "0.6rem",
  },
  copybtn: {
    width: "74px",
    height: "100%",
    background: "#2F80ED",
    borderRadius: "8px",
    color: "white",
    textTransform: "none",
    fontSize: "0.6rem",
    "&:hover": {
      backgroundColor: "#2F80ED",
    },
  },
}));

const Preview = ({ path }) => {
  const classes = useStyles();
  const inputRef = useRef();

  const copyTextToClipboard = (e) => {
    const pathInput = inputRef.current;
    console.log(pathInput);
    pathInput.focus();
    pathInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    e.target.innerText = "Copied!";
    e.target.backgroundColor = "";
  };

  return (
    <Paper className={classes.root}>
      <Check />
      <Typography className={classes.text}>Upload Successful</Typography>
      <div className={classes.image}>
        <img src={`${path}`} alt="img" className={classes.im} />
      </div>

      <div className={classes.inputContainer}>
        <input
          className={classes.input}
          ref={inputRef}
          type="text"
          id="path"
          name="path"
          value={path}
          readOnly
        />
        <Button className={classes.copybtn} onClick={copyTextToClipboard}>
          Copy Link
        </Button>
      </div>
    </Paper>
  );
};

export default Preview;
