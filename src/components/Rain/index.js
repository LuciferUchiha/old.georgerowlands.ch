import React, { useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";

const Rain = () => {
  const rainSection = useRef(this);
  console.log(rainSection);
  const drop = <div>DROPPPP</div>;
  ReactDOM.render(drop, rainSection);
  return <h1>I am the rain man</h1>;
};

export default Rain;
