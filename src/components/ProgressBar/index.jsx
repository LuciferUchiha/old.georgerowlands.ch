import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

function ProgressBar({ label }) {
  return (
    <>
      <Label>{label}</Label>
      <Bar />
    </>
  );
}

export default ProgressBar;

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
};

const Label = styled.h2`
  color: var(--ifm-color-primary);
`;

const progress = keyframes`
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
`;

const Bar = styled.div`
  height: 18px;
  border-radius: 30px;
  background: #985eff;
  animation: ${progress} 5s infinite;
`;
