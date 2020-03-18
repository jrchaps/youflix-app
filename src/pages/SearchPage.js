import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import Item from '../components/Item';
import LoadingBar from '../components/LoadingBar';

const MainDiv = styled.div`
  display: flex;
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

const ItemGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin-top: 25px;
`;

const SearchPage = () => {
  const isFetching = useSelector(state => state.isFetching);
  const videos = useSelector(state => state.fetchedSearchedVideos);

  return (
    <MainDiv>
      {isFetching && <LoadingBar />}
      <ItemGrid>
        {videos.map((video, index) => (
          <Item item={video} key={index}></Item>
        ))}
      </ItemGrid>
    </MainDiv>
  );
};

export default SearchPage;
