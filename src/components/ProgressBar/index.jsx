import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

/* Yes a progress bar could also be done with css but I wanted to try a different approach
and liked the look of the one using Unicodes in the Fira Code font */
function ProgressBar({ label }) {
  return (
    <Container>
      <h2>{label}</h2>
      <ProgressOuter>
        <ProgressInner />
      </ProgressOuter>
    </Container>
  );
}

export default ProgressBar;

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
};

const Container = styled.div`
  color: var(--ifm-color-primary-light);
`;

const progress = keyframes`
  0% {
    width: 0%;
    background: #3700b3;
  }

  100% {
    width: 100%;
    background: #985eff;
  }
`;

const ProgressOuter = styled.div`
  border-radius: 30px;
  animation: ${progress} 5s infinite;
`;

const ProgressInner = styled.div`
  height: 18px;
  border-radius: 30px;
  animation: ${progress} 5s infinite;
`;
