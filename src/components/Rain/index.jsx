import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import useWindowDimensions from '../../util/customHooks';

const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function Rain({ numDrops }) {
  const { height, width } = useWindowDimensions();

  const drops = useMemo(() => {
    const generatedDrops = [];

    // scales numDrops to screen dimensions
    for (let i = 1; i < numDrops * (width / 1000); i += 1) {
      const dropLeft = randRange(0, width);
      // this number needs to be adjusted so there isn't an underflow
      const dropTop = randRange(-1000, height);
      generatedDrops.push({ id: i, left: dropLeft, top: dropTop });
    }
    return generatedDrops;
  }, [numDrops, width, height]);

  return (
    <RainContainer>
      {drops.map((drop) => (
        <Drop key={drop.id} className="drop" left={drop.left} top={drop.top} />
      ))}
    </RainContainer>
  );
}

export default Rain;

Rain.propTypes = {
  numDrops: PropTypes.number.isRequired,
};

const fall = keyframes`
    to {
        margin-top: 100vh;
    }
`;

const RainContainer = styled.div`
  z-index: -10;
  overflow: hidden;
`;

const Drop = styled.div.attrs((props) => ({
  style: {
    left: props.left,
    top: props.top,
  },
}))`
  z-index: -10;
  background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(219, 178, 255, 0.3)), to(rgba(127, 57, 251, 0.3)));
  width: 1px;
  height: 89px;
  position: absolute;
  bottom: 200px;
  animation: ${fall} 0.8s linear infinite;
`;
