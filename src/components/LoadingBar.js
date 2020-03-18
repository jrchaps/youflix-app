import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

const StyledLoadingBar = styled.div`
  position: fixed;
  top: 0px;
  height: 2px;
  width: 100%;
  z-index: 10000;
  background: ${props => props.theme.white.dark};
`;

const translate = keyframes`
0% {
    transform: translateX(-100%);
}
100% {
    transform: translateX(400%);
}
`;

const BarIndicator = styled.div`
  width: 25%;
  height: 100%;
  background: ${props => props.theme.color.secondary.main};
  transform: translateX(0%);
  animation: ${translate} 1s ease-in-out infinite;
`;

const LoadingBar = () => {
  return (
    <StyledLoadingBar>
      <BarIndicator />
    </StyledLoadingBar>
  );
};

export default LoadingBar;
