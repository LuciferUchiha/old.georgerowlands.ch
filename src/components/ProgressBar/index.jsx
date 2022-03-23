import React, { useEffect, useState } from "react";
import styled from "styled-components";

/* Yes a progress bar could also be done with css but I wanted to try a different approach 
and liked the look of the one using Unicodes in the Fira Code font*/
const ProgressBar = ({ label, length }) => {
  const getEmptyProgressString = (length) =>
    "\uEE00" + "\uEE01".repeat(length) + "\uEE02";

  let [currentProgress, setCurrentProgress] = useState(0);
  const [progressString, setProgressString] = useState(
    getEmptyProgressString(length)
  );

  const updateProgressString = ({
    length,
    currentProgress,
    progressString,
  }) => {
    console.log(currentProgress);
    console.log(progressString);
    setCurrentProgress(currentProgress % (length + 2)); // make sure we dont overflow: ;
    if (currentProgress == 0) setProgressString(getEmptyProgressString(length));
    else {
      if (currentProgress == 1)
        setProgressString(
          "\uEE04" + progressString.substring(1, progressString.length - 1)
        );
      else if (currentProgress == length + 2)
        setProgressString(
          progressString.substring(0, progressString.length - 2) + "\uEE06"
        );
      else
        setProgressString(
          progressString.substring(currentProgress - 1) +
            "\uEE05" +
            progressString.substring(
              currentProgress + 1,
              progressString.length - 1
            )
        );
    }
    setCurrentProgress(currentProgress + 1); // increment
  };

  useEffect(() => {
    currentProgress = 0;
    const interval = setInterval(() => {
      updateProgressString(length, currentProgress, progressString);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Label>{label}</Label>
      <Bar>{progressString}</Bar>
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

const Bar = styled.div`
  padding: 5px 0px 0px;
  font-family: "Fira Code VF", monospace;
`;
