import React, { useMemo, useCallback, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { ForceGraph3D } from 'react-force-graph';
import SpriteText from 'three-spritetext';
import BrowserOnly from '@docusaurus/BrowserOnly';
import * as text from './linkNetwork.json';

function NetworkGraph() {
  // read data once at startup
  const myData = useMemo(() => text, []);

  // sort out colors
  const lightColor = '#FFFFFF';
  const darkColor = '#1B1B1B';
  const { isDarkTheme } = useColorMode();

  // get parent sizes
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const div = useCallback((ele) => {
    if (ele !== null && window !== undefined) {
      setWidth(ele.getBoundingClientRect().width);
      setHeight(ele.getBoundingClientRect().height);
    }
  }, []);

  const handleClick = useCallback((node) => {
    if (window !== undefined) window.location.href = node.url;
  }, []);

  return (
    <BrowserOnly>
      {() => (
        <div ref={div}>
          <ForceGraph3D
            width={width * 0.8}
            height={(width / 16) * 8}
            showNavInfo={false}
            graphData={myData}
            onNodeClick={handleClick}
            backgroundColor="rgba(0,0,0,0)"
            nodeThreeObject={(node) => {
              const sprite = new SpriteText(node.id);
              sprite.color = isDarkTheme ? lightColor : darkColor;
              sprite.textHeight = 8;
              return sprite;
            }}
            linkColor={() => (isDarkTheme ? lightColor : darkColor)}
          />
        </div>
      )}
    </BrowserOnly>
  );
}

export default NetworkGraph;
