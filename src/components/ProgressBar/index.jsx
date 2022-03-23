import React, { useEffect, useState } from "react";
import styled from "styled-components";

/* Yes a progress bar could also be done with css but I wanted to try a different approach 
and liked the look of the one using Unicodes in the Fira Code font*/
const ProgressBar = ({ label, length }) => {
  let [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress(
        (currentProgress) => (currentProgress + 1) % (length + 3)
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Label>{label}</Label>
      <Bar>{currentProgress}</Bar>
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
