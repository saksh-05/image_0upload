import axios from "axios";
import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import Load from "./components/loading";
import Preview from "./components/preview";
import { ReactComponent as Logo } from "./resources/port.svg";
import { useDropzone } from "react-dropzone";
import base_url from "./axios";

const useStyles = makeStyles(() => ({
  container: {
    justifyContent: "center",
    display: "flex",
  },
  grid: {
    textAlign: "center",
    border: "1px solid black",
    borderRadius: "0.5rem",
    justifyContent: "center",
    marginTop: "4rem",
    height: "auto",
    width: "auto",
  },
  dropbox: {
    width: "338px",
    height: "218.9px",
    background: "#f6f8fb",
    border: "1px dashed #97bef4",
    borderRadius: "12px",
    margin: "2rem 4rem",
  },
  p: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "18px",
    letterSpacing: "-0.035em",
    color: "#4f4f4f",
    marginBottom: "1rem",
    marginTop: "2rem",
  },
  h3: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "10px",
    lineHeight: "15px",
    textAlign: "center",
    letterSpacing: "-0.035em",
    color: "#828282",
    marginBottom: "2rem",
  },
  text: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "-0.035em",
    color: "#bdbdbd",
    marginTop: "2rem",
  },
  uploadBtn: {
    width: "9rem",
    height: "31.98px",
    background: "#2f80ed",
    color: "white",
    borderRadius: "8px",
    border: "none",
    marginTop: "1.35rem",
    marginBottom: "2rem",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#2f80ed",
    },
  },
}));

const App = () => {
  const [uploadB, setUploadB] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [resFile, setResFile] = useState(null);

  const classes = useStyles();

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadB(true);
  };

  const onFileUpload = () => {
    const formData = new FormData();

    formData.append("myFile", selectedFile);
    console.log(selectedFile);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    axios
      .post("https://image-0upload.herokuapp.com/upload", formData)
      .then((res) => {
        console.log(res);
        setResFile(res.data.file);
        setPreview(true);
      })
      .catch((err) => console.log(err));
    setPreview(false);
  };

  const onFileChangeDrop = (file) => {
    setSelectedFile(file);
    setUploadB(true);
  };

  const onDrop = (acceptedFiles) => {
    const files = acceptedFiles;
    console.log(files[0]);
    if (files) {
      onFileChangeDrop(files[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
    accept: "image/*",
  });

  return (
    <>
      {loading ? (
        <Load />
      ) : preview ? (
        <Preview
          key="preview"
          file={resFile}
          path={`${base_url}${resFile.filename}`}
        />
      ) : (
        <>
          <div className={classes.container}>
            <div className={classes.grid}>
              <p className={classes.p}>Upload Your Image</p>
              <h3 className={classes.h3}>file should be jpeg, png,...</h3>
              <div className={classes.dropbox}>
                <div
                  {...getRootProps()}
                  style={{ height: "100%", marginTop: "2rem" }}
                >
                  <input {...getInputProps()} />
                  <Logo />
                  <div className={classes.text}>
                    Drag and Drop your image here
                  </div>
                </div>
              </div>
              OR
              <br />
              <br />
              <div>
                <input
                  type="file"
                  id="contained-file"
                  accept="image/*"
                  name="myImage"
                  onChange={onFileChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="contained-file">
                  {uploadB ? (
                    <Button
                      onClick={onFileUpload}
                      className={classes.uploadBtn}
                    >
                      Upload
                    </Button>
                  ) : (
                    <Button
                      component="span"
                      disableRipple
                      className={classes.uploadBtn}
                    >
                      Choose a file
                    </Button>
                  )}
                </label>
              </div>
            </div>
          </div>
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "2.5rem" }}
          >
            Created by{" "}
            <strong style={{ color: "#FF4500" }}> Saurabh Kumar Singh</strong> -
            devChallenges.io
          </div>
        </>
      )}
    </>
  );
};

export default App;
