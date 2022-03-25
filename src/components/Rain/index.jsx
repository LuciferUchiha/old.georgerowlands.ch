import React, { useMemo } from "react";
import styled, { keyframes } from "styled-components";

const Rain = ({ numDrops }) => {
    const drops = useMemo(() => {
        const drops = []
        for (let i = 1; i < numDrops; i++) {
            const dropLeft = randRange(0, 1600);
            const dropTop = randRange(-1000, 1400);
            drops.push({ left: dropLeft, top: dropTop });
        }
        return drops;
    }, []);

    return (
        <RainContainer>
            {drops.map(({ left, top }, i) => (
                <Drop key={i} className="drop" left={left} top={top} />
            ))}
        </RainContainer>
    )
}

const randRange = (min, max) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

export default Rain;

const fall = keyframes`
    to {
        margin-top: 900px;
    }
`;

const RainContainer = styled.div`
z-index: 1;
    overflow: hidden;
`;

const Drop = styled.div`
z-index: 2;
    left: ${props => props.left};
    top: ${props => props.top};
    background:-webkit-gradient(linear,0% 0%,0% 100%, from(rgba(219, 178, 255,0.3) ), to(rgba(127, 57, 251,0.3))  );
	width:1px;
	height:89px;
	position: absolute;
	bottom:200px;
	animation: ${fall} .63s linear infinite;
`;