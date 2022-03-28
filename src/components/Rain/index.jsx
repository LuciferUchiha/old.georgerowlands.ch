import React, { useMemo } from "react";
import styled, { keyframes } from "styled-components";
import useWindowDimensions from "../../util/customHooks";

const Rain = ({ numDrops }) => {
  const { height, width } = useWindowDimensions();

  // scales numDrops to screen dimensions
  const relativeNumDrops = numDrops * (width / 1000);

  const drops = useMemo(() => {
    const drops = [];

    for (let i = 1; i < relativeNumDrops; i++) {
      const dropLeft = randRange(0, width);
      // this number needs to be adjusted so there isn't an underflow
      const dropTop = randRange(-1000, height);
      drops.push({ left: dropLeft, top: dropTop });
    }
    return drops;
  }, [width, height]);

  return (
    <RainContainer>
      {drops.map(({ left, top }, i) => (
        <Drop key={i} className="drop" left={left} top={top} />
      ))}
    </RainContainer>
  );
};

const randRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default Rain;

const fall = keyframes`
    to {
        margin-top: 100vh; // Not sure if this is correct
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
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(rgba(219, 178, 255, 0.3)),
    to(rgba(127, 57, 251, 0.3))
  );
  width: 1px;
  height: 89px;
  position: absolute;
  bottom: 200px;
  animation: ${fall} 0.63s linear infinite;
`;
