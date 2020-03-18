import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeVideos } from '../store/actions';
import Slider from '../components/Slider';
import LoadingBar from '../components/LoadingBar';

const MainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  height: calc(100vh - 64px);
  @media (max-width: 768px) {
    height: calc(100vh - 104px);
  }
  padding-top: 64px;
  @media (max-width: 768px) {
    padding-top: 104px;
  }
  margin-bottom: 10px;
`;

let topics = {
  Music: '/m/04rlf',
  Gaming: '/m/0bzvm2',
  Food: '/m/02wbm',
  Technology: '/m/07c1v',
};

const HomePage = () => {
  const isFetching = useSelector(state => state.isFetching);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeVideos(topics));
  }, []);

  return (
    <MainDiv>
      {isFetching && <LoadingBar />}
      {Object.keys(topics).map((topic, index) => (
        <Slider topic={topic} index={index} key={index} />
      ))}
    </MainDiv>
  );
};

export default HomePage;
