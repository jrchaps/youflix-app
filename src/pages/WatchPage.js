import React from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';

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
  width: 75vw;
  height: calc(50vw / 1.25);
  @media (min-width: 768px) {
    width: 50vw;
    height: calc(50vw / 1.78);
  }
  margin-top: 100px;
  border: none;
`;

const WatchPage = () => {
  let { videoId } = useParams();

  return (
    <MainDiv>
      <Iframe
        src={`http://www.youtube.com/embed/${videoId}?autoplay=1`}
        allowFullScreen
      ></Iframe>
    </MainDiv>
  );
};

export default WatchPage;
