import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

const MainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  padding-top: 64px;
  @media (max-width: 768px) {
    padding-top: 104px;
  }
`;

const Iframe = styled.iframe`
  width: 640px;
  height: 390px;
  border: none;
`;

const Player = () => {
  /*useEffect(() => {
    let tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.async = true;
    document.body.appendChild(tag);

    return () => {
      document.body.removeChild(tag);
    };
  }, []);*/

  /*const onYouTubeIframeAPIReady = () => {
    let player = new YT.Player('player', {
      events: {
        onReady: onPlayerReady,
        //onStateChange: onPlayerStateChange,
      },
    });
  };*/

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  return (
    <MainDiv>
      <Iframe
        src='http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&autoplay=1'
        allowFullScreen
      ></Iframe>
    </MainDiv>
  );
};

export default Player;

const VideoPlayer = () => {
  return <MainDiv></MainDiv>;
};
