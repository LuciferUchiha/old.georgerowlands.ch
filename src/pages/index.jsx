import React from "react";
import Layout from "@theme/Layout";
import styled from "styled-components";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ProgressBar from "../components/ProgressBar";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Description will go into a meta tag in <head />"
    >
      <main>
        <Container>
          <p>Hi, my name is</p>
          <Name>George Rowlands</Name>
          <h2>Computer Science Student 👨‍💻</h2>
          <ProgressBar label="Knowledge" length={15} />
        </Container>
      </main>
    </Layout>
  );
}

const Name = styled.h1`
  font-size: 3rem;
  color: var(--ifm-color-primary);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 150px);
  margin: 3rem;
`;
