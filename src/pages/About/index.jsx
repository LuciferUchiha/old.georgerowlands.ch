import React from 'react';
import Layout from '@theme/Layout';
import styled from 'styled-components';

export default function AboutMe() {
  const introduction = 'I am George, a computer science student at the University of Applied Science and Arts Northwestern Switzerland, FHNW.';
  const carreerSummary = 'I am studying computer science as I have always been very interested in computers, new technologies and the digital revolution, their impact on all aspects of our lives both now and in the future. This is what led me to an apprenticeship at UBS Bank as a software developer where I gained inciteful, practical hands-on computing experience alongside my high school studies and Matura exams. This in turn confirmed my passion for computing and technical skills. I am now in the second year of the Batchelor’s degree programme at FHNW.';
  const achievmentsSummary = 'I enjoy a competitive environment and I am always up for a challenge and an opportunity to measure myself with others. At UBS, I was selected to be part of the masterclass programme for young talented programmers. I also took part in the coding competition, Swiss Skills, and, after succeeding in the regional heats, competed in the National Finals. Twelve hours of computer programming tasks indeed challenged not only my skills but my courage and stamina. My determination and curiosity also led me to Shanghai, having been selected from my high school to take part in the “Route2China” program during my apprenticeship. I received the opportunity to develop software in a “start-up” company for four weeks.';
  const freetimeSummary = 'I have also been playing football for my local club since I was young. Now I am a trainer for the same club helping teach, pass down the knowledge and further the next generation of players. My passion for football continues and I learn a lot also from the fellow trainers, participate in the club management meetings and step in as a referee sometimes';
  return (
    <Layout
      title="About me"
      description="About me"
    >
      <main>
        <h1>About me</h1>
        <p>Hi,</p>
        <StyledText>{introduction}</StyledText>
        <StyledText>{carreerSummary}</StyledText>
        <StyledText>{achievmentsSummary}</StyledText>
        <StyledText>{freetimeSummary}</StyledText>
      </main>
    </Layout>
  );
}

const StyledText = styled.p`
  width: 50vh;
  overflow-wrap: word-break;
`;
