import React, { Children, useMemo } from "react";
import styles from "./styles.module.css";

const Rain = ({ numDrops }) => {
  const randRange = (minNum, maxNum) =>
    Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  const drops = useMemo(() => {
    const drops = [];
    for (let i = 1; i < numDrops; i++) {
      const dropLeft = randRange(0, 1600);
      const dropTop = randRange(-1000, 1400);
      drops.push({ left: dropLeft, top: dropTop });
    }
    return drops;
  }, []);
  return (
    <div id={styles.rain}>
      {drops.map((coords, i) => (
        <div key={i} className={styles.drop} style={coords} />
      ))}
    </div>
  );
};

export default Rain;
