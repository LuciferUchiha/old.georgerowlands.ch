import React, { useEffect, useState } from "react";
import styled from "styled-components";

/* Yes a progress bar could also be done with css but I wanted to try a different approach 
and liked the look of the one using Unicodes in the Fira Code font*/
const ProgressBar = ({ label, length }) => {
  const [counters, setCounters] = useState([0, 0]);

  const [spinnerCounter, progressCounter] = counters;

  console.log(spinnerCounter);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(([spinnerCounter, progressCounter]) => [
        (spinnerCounter + 1) % 6,
        (progressCounter + 1) % (length + 3),
      ]);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const spinnerString = String.fromCodePoint(
    parseInt("EE0" + (spinnerCounter + 6).toString(16), 16)
  );

  let progressString = "";
  if (progressCounter == 0) {
    progressString = "\uEE00" + "\uEE01".repeat(length + 1) + "\uEE02"; // shouldnt be + 1 but it works
  } else {
    progressString =
      "\uEE03" +
      "\uEE04".repeat(progressCounter - 1) +
      "\uEE01".repeat(length - (progressCounter - 2));
    if (progressCounter == length + 2) progressString += "\uEE05";
    else progressString += "\uEE02";
  }

  return (
    <Container>
      <Label>{label}</Label>
      <FiraCode>
        {progressString}
        {" " + spinnerString}
      </FiraCode>
    </Container>
  );
};

export default ProgressBar;

const Label = styled.div`
  margin-right: 10px;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 1.5rem;
  color: var(--ifm-color-primary-light);
`;

const FiraCode = styled.div`
  padding: 5px 0px 0px;
  font-family: "Fira Code VF", monospace;
  letter-spacing: -0.02rem; // because otherwise weird line
`;
