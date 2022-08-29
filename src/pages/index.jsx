import React from 'react';
import Layout from '@theme/Layout';
import styled from 'styled-components';
import BrowserOnly from '@docusaurus/BrowserOnly';

import ProgressBar from '../components/ProgressBar';
import Rain from '../components/Rain';

export default function Home() {
  return (
    <Layout title="Home" description="The homepage of georgerowlands.ch">
      <main>
        <Container>
          <BrowserOnly>{() => <Rain numDrops={600} />}</BrowserOnly>
          <NameSection>
            <p>Hi, my name is</p>
            <Name>George Rowlands</Name>
            <h2>Computer Science Student</h2>
            <ProgressBar label="Knowledge" length={15} />
          </NameSection>
        </Container>
      </main>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: calc(100vh - 60px);
`;

const Name = styled.h1`
  font-size: 3rem;
  color: var(--ifm-color-primary);
`;

const NameSection = styled.div`
  flex-basis: content;
  display: flex;
  flex-direction: column;
  margin: 10%;
`;
