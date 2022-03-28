import React from "react";
import Layout from "@theme/Layout";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import ProgressBar from "../components/ProgressBar";
import Rain from "../components/Rain";
import Box from "../components/Box";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Description will go into a meta tag in <head />"
    >
      <main>
        <Rain numDrops={600} />
        <Container>
          <NameSection>
            <p>Hi, my name is</p>
            <Name>George Rowlands</Name>
            <h2>Computer Science Student</h2>
            <ProgressBar label="Knowledge" length={15} />
          </NameSection>
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
          </Canvas>
        </Container>
      </main>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: calc(100vh - 60px);
`;

const Name = styled.h1`
  font-size: 3rem;
  color: var(--ifm-color-primary);
`;

const NameSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem;
`;
