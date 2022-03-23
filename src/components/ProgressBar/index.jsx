import React from "react";
import styled from "styled-components";

const ProgressBar = ({ label, length }) => {
  let emptyBar = "\uEE00";
  emptyBar += "\uEE01".repeat(length);
  emptyBar += "\uEE02";
  return (
    <Container>
      <Label>{label}</Label>
      <Bar>{emptyBar}</Bar>
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
