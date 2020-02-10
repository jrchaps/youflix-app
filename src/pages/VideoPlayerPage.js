import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

const MainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  height: calc(100vh - 64px);
  @media (max-width: 768px) {
    height: calc(100vh - 104px);
  }
  padding-top: 64px;
  @media (max-width: 768px) {
    padding-top: 104px;
  }
`;

const Iframe = styled.iframe`
  width: 50%;
  height: 55%;
  margin: auto;
  border: none;
`;

const Player = () => {
  return (
    <Iframe
      src='http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&autoplay=1'
      allowFullScreen
    ></Iframe>
  );
};

export default Player;
