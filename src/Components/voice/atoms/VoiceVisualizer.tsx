import React from 'react';
import styled from 'styled-components';

const VoiceVisualizerContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
`;

type VoiceVisualizerType = {
  id: string 
}

export const VoiceVisualizer = ({ id }: VoiceVisualizerType) => {
  return (
    <VoiceVisualizerContainer>
      <canvas id={`canvas-${id}`} width="100" height="50" />
    </VoiceVisualizerContainer>
  );
};
