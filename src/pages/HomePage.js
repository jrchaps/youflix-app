import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVideos } from '../store/actions';

const Image = styled.img`
  height: 11.25vw;
  width: 25vw;
`;

const ShowMoreButton = styled.button`
  position: absolute;
`;

const Video = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Slider = styled.div`
  position: relative;
  display: flex;
  max-width: ${props => props.width};
  transform: ${props => `translateX(${props.translateValue})`};
  transition: ${props =>
    props.transition
      ? `transform 0.5s ${props.theme.transitionTimingFunction}`
      : 'none'};
`;

const SliderContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  border: 1px solid pink;
  margin-top: 50px;
`;

const NextButton = styled.button`
  position: absolute;
  width: 10%;
  height: 100%;
  right: 0;
  background: ${props => props.theme.black.medium};
  border: none;
`;

const PrevButton = styled.button`
  position: absolute;
  width: 10%;
  height: 100%;
  z-index: 1;
  background: ${props => props.theme.black.medium};
  border: none;
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
  const [translateValue, setTranslateValue] = useState('0px');
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(4);
  const [transition, setTransition] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [slice, setSlice] = useState('0, 4');
  const videos = useSelector(state => state.fetchedVideos);
  const dispatch = useDispatch();
  const slider = useRef();

  /* useEffect(() => {
    dispatch(fetchVideos());
  }, []);*/

  useEffect(() => {
    window.addEventListener('resize', () => {
      console.log(0.01 * window.innerWidth);
    });
  });

  //slider.current.scrollBy(Math.round(0.22 * window.innerWidth) - 100, 0);

  useEffect(() => {}, [videos]);

  const handleNext = () => {
    setSliceEnd(sliceEnd + 4);
    setTransition(true);
    let translateInt = parseInt(translateValue);
    translateInt -= window.innerWidth;
    setTranslateValue(`${translateInt}px`);
    setTimeout(() => {
      setSliceStart(sliceStart + 4);
      setTransition(false);
      setTranslateValue('0px');
    }, 500);
  };

  const handlePrev = () => {
    setSliceStart(sliceStart - 4);
    let translateInt = parseInt(translateValue);
    translateInt -= window.innerWidth;
    setTranslateValue(`${translateInt}px`);
    setTimeout(() => {
      setTransition(true);
      setTranslateValue('0px');
    });
    setTimeout(() => {
      setSliceEnd(sliceEnd - 4);
      setTransition(false);
    }, 500);
  };

  //<ShowMoreButton>open</ShowMoreButton>
  //</Video>
  return (
    <MainDiv>
      <SliderContainer>
        <PrevButton onClick={handlePrev} />
        <Slider
          ref={slider}
          translateValue={translateValue}
          transition={transition}
          width={windowWidth}
        >
          {videos.slice(sliceStart, sliceEnd).map((video, i) => (
            <Image src={video.snippet.thumbnails.medium.url}></Image>
          ))}
        </Slider>
        <NextButton onClick={handleNext} />
      </SliderContainer>
    </MainDiv>
  );
};
export default HomePage;
