import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';

const Image = styled.img`
  height: 200px;
  width: 200px;
  transition: width 0.3s linear, height 0.3s linear, transform 0.3s linear,
    margin 0.3s linear;
`;

const ShowMoreButton = styled.button`
  position: absolute;
`;

const Video = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 10px;
`;

const Slider = styled.div`
  position: relative;
  display: flex;
  border: 1px solid black;
  overflow-x: auto;
`;

const SliderContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  border: 3px solid pink;
`;

const NextButton = styled.button`
  position: absolute;
  width: 100px;
  background: ${props => props.theme.black.medium};
`;

const MainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  padding-top: 64px;
  @media (max-width: 768px) {
    padding-top: 104px;
  }
`;

const HomePage = () => {
  const recipes = useSelector(state => state.fetchedRecipes);

  /*useEffect(() => {
    fetchVideos();
  }, []);*/

  const fetchVideos = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&topicId=/m/068hy&type=video&videoEmbeddable=true&key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    //setVideos(data.items);
    console.log(data.items);
  };

  return (
    <MainDiv>
      <Slider>
        <NextButton />
        {recipes.map((recipe, i) => (
          <Video>
            <Image src={recipe.recipe.image}></Image>
            <ShowMoreButton>open</ShowMoreButton>
          </Video>
        ))}
        <NextButton />
      </Slider>
    </MainDiv>
  );
};
export default HomePage;
