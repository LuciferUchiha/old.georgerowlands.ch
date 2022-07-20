import React, { useMemo, useCallback, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { ForceGraph3D } from 'react-force-graph';
import styled from 'styled-components';
import * as text from './linkNetwork.json';

function NetworkGraph() {
  // read data once at startup
  const myData = useMemo(() => text, []);

  // sort out colors
  const lightColor = '#FFFFFF';
  const darkColor = '#1B1B1B';
  const { colorMode, setColorMode } = useColorMode();

  // get parent width
  const [width, setWidth] = useState(null);
  const div = useCallback((node) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const handleClick = useCallback((node) => {
    window.location.href = node.url;
  }, []);

  return (
    <Container ref={div}>
      <ForceGraph3D
        width={width}
        height={width}
        showNavInfo={false}
        graphData={myData}
        onNodeClick={handleClick}
        backgroundColor="rgba(0,0,0,0)"
        nodeColor={() => (colorMode === 'dark' ? lightColor : darkColor)}
        nodeLabel="id"
        nodeOpacity={1}
        linkColor={() => (colorMode === 'dark' ? lightColor : darkColor)}
      />
    </Container>
  );
}

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

export default NetworkGraph;
