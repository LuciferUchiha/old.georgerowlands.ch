import React from 'react';
import Layout from '@theme/Layout';
import styles from './about.module.css';

export default function AboutMe() {
  return (
    <Layout title="About me" description="About me">
      <main>
        <div className={styles.aboutContainer}>
          <div className={styles.portrait}>
            <img
              src="/img/cleanPortrait.png"
              alt="cleanPortrait"
              className={styles.portraitImage}
            />
            <h1 className={styles.portraitTag}>About me</h1>
          </div>
          <div className={styles.content}>
            <p>Hi,</p>
            <h1 className={styles.ofInterest}>
              I am a computer science student at the University of Applied Science and Arts
              Northwestern Switzerland, FHNW.
            </h1>
            <p>
              I have always been interested in computers and new technologies due to the era I was
              born in and the impact they have on our lives. This is led me to an apprenticeship at
              UBS Bank as a software developer, where I gained practical hands-on computing
              experience alongside my high school studies and Matura exams.
            </p>
            <p>
              Since I can remember, I have enjoyed a competitive environment and am always up for a
              challenge and an opportunity to measure myself with others. At UBS, I was selected to
              be part of the masterclass program for young, talented programmers. I also took part
              in the coding competition, Swiss Skills, and, after succeeding in the regional heats,
              competed in the National Finals. Twelve hours of computer programming tasks indeed
              challenged not only my skills, but my courage and stamina. My determination and
              curiosity also led me to Shanghai, having been selected from my high school to
              represent Swiss apprentices and develop software in a start-up company.
            </p>
            <p>
              In my free time I continue to enjoy competitiveness such as solving coding challenges
              and gaming whilst also enjoying some more relaxing things like reading and drawing. I
              have also been playing football for my local club since I was young. Now I am a
              trainer for the same club and train the next generation of players.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
