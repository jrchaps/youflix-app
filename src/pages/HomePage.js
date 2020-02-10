import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { fetchVideos } from '../store/actions';
import SliderComponent from '../components/Slider';
import Player from './VideoPlayerPage';

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

const HomePage = () => {
  const dispatch = useDispatch();
  let topics = {
    Music: '/m/04rlf',
    Gaming: '/m/0bzvm2',
    Food: '/m/02wbm',
    Technology: '/m/07c1v'
  };

  /*useEffect(() => {
    Object.keys(topics).forEach(topic => {
      console.log(topics[topic]);
      dispatch(fetchVideos(topic, topics[topic]));
    });
  }, []);*/

  return (
    <MainDiv>
      {Object.keys(topics).map(topic => (
        <SliderComponent topic={topic} />
      ))}
      {Object.keys(topics).map(topic => (
        <SliderComponent topic={topic} />
      ))}
    </MainDiv>
  );
};

export default HomePage;
