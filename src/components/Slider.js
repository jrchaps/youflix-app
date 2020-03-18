import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';

const SliderHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  padding: 0% 5%;
  @media (min-width: 1400px) {
    padding: 0% 4%;
  }
  @media (max-width: 800px) {
    padding: 0% 7%;
  }
  margin-top: 30px;
  @media (min-width: 1400px) {
    margin-top: 60px;
  }
`;

const SliderHeader = styled.h3`
  flex-grow: 1;
  font-weight: normal;
  margin-bottom: 5px;
  color: ${props => props.theme.white.light};
`;

const SlideIndicator = styled.i`
  width: 20px;
  color: ${props =>
    props.active ? props.theme.white.light : props.theme.white.dark};
  opacity: 0;
  &.shown {
    opacity: 1;
  }
  user-select: none;
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-top: 5px;
  &:nth-last-child(1) {
    margin-bottom: 60px;
    @media (min-width: 1400px) {
      margin-bottom: 120px;
    }
  }
`;

const SliderButton = styled.button`
  width: 7%;
  @media (min-width: 800px) {
    width: 5%;
  }
  @media (min-width: 1400px) {
    width: 4%;
  }
  z-index: 1;
  user-select: none;
  pointer-events: ${props => props.pointerEvents};
  visibility: ${props => props.visibility};
  background: ${props => props.theme.black.medium};
  border: none;
  &:hover {
    background: ${props => props.theme.black.dark};
  }
`;

const SliderButtonIcon = styled.i`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  @media (min-width: 425px) {
    font-size: 48px;
  }
  @media (min-width: 2560px) {
    font-size: 60px;
  }
  opacity: 0;
  color: ${props => props.theme.white.light};
  ${ButtonContainer}:hover & {
    opacity: 1;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  display: flex;
  width: 86%;
  @media (min-width: 800px) {
    width: 90%;
  }
  @media (min-width: 1400px) {
    width: 92%;
  }
  user-select: none;
`;

const StyledSlider = styled.div`
  position: relative;
  display: flex;
  transform: ${props => `translateX(${props.translateValue}%)`};
  transition: ${props =>
    props.transition
      ? `transform 0.8s ${props.theme.transitionTimingFunction}`
      : 'none'};
  pointer-events: ${props => props.pointerEvents};
  &:hover .middle-item {
    transform: translateX(-25%);
  }
  &:hover .left-item {
    transform: translateX(-25%);
  }
  &.left-item-hovered:hover .middle-item {
    transform: translateX(0);
  }
  &.right-item-hovered:hover .middle-item {
    transform: translateX(-50%);
  }
  &.right-item-hovered:hover .left-item {
    transform: translateX(-50%);
  }
`;

const Slider = props => {
  const items = useSelector(state => state.fetchedHomeVideos[props.index]);
  const [list, setList] = useState([]);
  const [translateValue, setTranslateValue] = useState(0);
  const [sliderClassName, setSliderClassName] = useState('');
  const [indicatorClassName, setIndicatorClassName] = useState(
    'material-icons',
  );

  const firstClick = useRef(true);
  const itemsPerSlide = useRef();
  const totalSlides = useRef([]);
  const currentSlide = useRef(0);
  const shownItems = useRef([]);

  const sliderContainerRef = useRef();
  const [itemWidth, setItemWidth] = useState();
  const transition = useRef(false);
  const pointerEvents = useRef('auto');
  const buttonVisibility = useRef('visible');

  useEffect(() => {
    if (list.length === 0 && items) {
      setItemsPerSlide();
    }
  });

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const setItemsPerSlide = () => {
    if (window.innerWidth < 800 && itemsPerSlide.current !== 3) {
      itemsPerSlide.current = 3;
    } else if (
      window.innerWidth >= 800 &&
      window.innerWidth < 1100 &&
      itemsPerSlide.current !== 4
    ) {
      itemsPerSlide.current = 4;
    } else if (
      window.innerWidth >= 1100 &&
      window.innerWidth < 1400 &&
      itemsPerSlide.current !== 5
    ) {
      itemsPerSlide.current = 5;
    } else if (window.innerWidth >= 1400 && itemsPerSlide.current !== 6) {
      itemsPerSlide.current = 6;
    }
    totalSlides.current = Array(
      Math.ceil(items.length / itemsPerSlide.current),
    ).fill('');
    if (totalSlides.current[currentSlide.current] === undefined) {
      currentSlide.current = totalSlides.current.length - 1;
    }
    setItemWidth(
      sliderContainerRef.current.clientWidth / itemsPerSlide.current,
    );
    buildInitialList();
  };

  const buildInitialList = () => {
    if (items.length <= itemsPerSlide.current) {
      buttonVisibility.current = 'hidden';
      shownItems.current = items.slice(0, items.length);
      setList(items.slice());
      setTranslateValue(0);
    } else if (firstClick.current) {
      shownItems.current = items.slice(0, itemsPerSlide.current + 1);
      if ((buttonVisibility.current = 'hidden')) {
        buttonVisibility.current = 'visible';
      }
      buildNewList();
    } else {
      shownItems.current = list.slice(
        list.indexOf(shownItems.current[0]),
        list.indexOf(shownItems.current[0]) + itemsPerSlide.current + 2,
      );
      if (buttonVisibility.current === 'hidden') {
        buttonVisibility.current = 'visible';
        firstClick.current = true;
        currentSlide.current = 0;
      }
      buildNewList();
    }
  };

  const buildNewList = () => {
    let itemsIndex = items.indexOf(
      shownItems.current[shownItems.current.length - 1],
    );
    let itemsSlice = items.slice(
      itemsIndex + 1,
      itemsIndex + 1 + itemsPerSlide.current,
    );
    let firstItem = items.slice(0, 1);
    let lastItem = items.slice(-1);
    let newList;
    itemsSlice.length < itemsPerSlide.current
      ? (newList = [...shownItems.current, ...itemsSlice, ...firstItem])
      : (newList = [...shownItems.current, ...itemsSlice]);
    itemsIndex = items.indexOf(shownItems.current[0]);
    itemsSlice = items.slice(itemsIndex - itemsPerSlide.current, itemsIndex);
    if (!firstClick.current) {
      if (itemsSlice.length < itemsPerSlide.current) {
        itemsSlice = items.slice(0, itemsIndex);
        newList = [...lastItem, ...itemsSlice, ...newList];
      } else {
        newList = [...itemsSlice, ...newList];
      }
    }
    let translatePerItem = 100 / newList.length;
    setList(newList);
    if (firstClick.current) {
      setTranslateValue(0);
    } else {
      setTranslateValue(
        -1 *
          translatePerItem *
          (newList.slice(0, newList.indexOf(shownItems.current[0])).length + 1),
      );
    }
  };

  const handleNext = () => {
    let numOfItemsToTranslate = list.slice(
      list.lastIndexOf(shownItems.current[shownItems.current.length - 1]) + 1,
    ).length;
    if (firstClick.current) {
      shownItems.current = list.slice(
        list.indexOf(shownItems.current[0]) + numOfItemsToTranslate - 1,
        list.length,
      );
    } else {
      shownItems.current = list.slice(
        list.indexOf(shownItems.current[0]) + numOfItemsToTranslate,
        list.length,
      );
    }
    pointerEvents.current = 'none';
    transition.current = true;
    let translatePerItem = 100 / list.length;
    setTranslateValue(
      translateValue - translatePerItem * numOfItemsToTranslate,
    );
    setTimeout(() => {
      currentSlide.current === totalSlides.current.length - 1
        ? (currentSlide.current = 0)
        : (currentSlide.current = currentSlide.current + 1);
      if (firstClick.current) {
        firstClick.current = false;
      }
      pointerEvents.current = 'auto';
      transition.current = false;
      buildNewList();
    }, 800);
  };

  const handleBack = () => {
    let numOfItemsToTranslate = list.slice(
      0,
      list.indexOf(shownItems.current[0]),
    ).length;
    shownItems.current = list.slice(
      list.indexOf(shownItems.current[0]) - numOfItemsToTranslate,
      list.lastIndexOf(shownItems.current[shownItems.current.length - 1]) -
        numOfItemsToTranslate +
        1,
    );
    pointerEvents.current = 'none';
    transition.current = true;
    let translatePerItem = 100 / list.length;
    setTranslateValue(
      translateValue + translatePerItem * numOfItemsToTranslate,
    );
    setTimeout(() => {
      currentSlide.current === 0
        ? (currentSlide.current = totalSlides.current.length - 1)
        : (currentSlide.current = currentSlide.current - 1);
      pointerEvents.current = 'auto';
      transition.current = false;
      buildNewList();
    }, 800);
  };

  const handleButtonMouseDown = e => {
    e.preventDefault();
  };

  const handleButtonContainerMouseOver = () => {
    setIndicatorClassName('material-icons shown');
  };

  const handleButtonContainerMouseOut = () => {
    setIndicatorClassName('material-icons');
  };

  const handleLeftItemMouseOver = () => {
    setSliderClassName('left-item-hovered');
  };

  const handleRightItemMouseOver = () => {
    setSliderClassName('right-item-hovered');
  };

  const handleItemMouseOut = () => {
    setSliderClassName('');
  };

  return (
    <React.Fragment>
      {list.length > 0 && (
        <SliderHeaderContainer>
          <SliderHeader>{props.topic}</SliderHeader>
          {totalSlides.current.length > 1 &&
            totalSlides.current.map((item, i) => (
              <SlideIndicator
                className={indicatorClassName}
                active={i === currentSlide.current}
                key={i}
              >
                remove
              </SlideIndicator>
            ))}
        </SliderHeaderContainer>
      )}
      <ButtonContainer
        onMouseOver={handleButtonContainerMouseOver}
        onMouseOut={handleButtonContainerMouseOut}
      >
        {list.length > 0 && (
          <SliderButton
            onClick={handleBack}
            onMouseDown={handleButtonMouseDown}
            pointerEvents={pointerEvents.current}
            visibility={
              firstClick.current || buttonVisibility.current === 'hidden'
                ? 'hidden'
                : 'visible'
            }
          >
            <SliderButtonIcon className='material-icons'>
              keyboard_arrow_left
            </SliderButtonIcon>
          </SliderButton>
        )}
        <SliderContainer ref={sliderContainerRef}>
          <StyledSlider
            translateValue={translateValue}
            transition={transition.current}
            pointerEvents={pointerEvents.current}
            className={sliderClassName}
          >
            {buttonVisibility.current === 'hidden' || firstClick.current
              ? list.map((item, i) => (
                  <Item
                    type={
                      i === 0
                        ? 'left'
                        : i ===
                          list.indexOf(shownItems.current[0]) +
                            itemsPerSlide.current -
                            1
                        ? 'right'
                        : 'middle'
                    }
                    hasKeyboardNavigation={shownItems.current.some(
                      (shownItem, index) =>
                        shownItem === item &&
                        index !== shownItems.current.length - 1,
                    )}
                    handleRightItemMouseOver={handleRightItemMouseOver}
                    handleLeftItemMouseOver={handleLeftItemMouseOver}
                    handleItemMouseOut={handleItemMouseOut}
                    item={item}
                    width={itemWidth}
                    key={i}
                  ></Item>
                ))
              : list.map((item, i) => (
                  <Item
                    type={
                      i === list.indexOf(shownItems.current[0]) + 1
                        ? 'left'
                        : i ===
                          list.indexOf(shownItems.current[0]) +
                            itemsPerSlide.current
                        ? 'right'
                        : 'middle'
                    }
                    hasKeyboardNavigation={shownItems.current.some(
                      (shownItem, index) =>
                        shownItem === item &&
                        index !== 0 &&
                        index !== shownItems.current.length - 1,
                    )}
                    handleRightItemMouseOver={handleRightItemMouseOver}
                    handleLeftItemMouseOver={handleLeftItemMouseOver}
                    handleItemMouseOut={handleItemMouseOut}
                    item={item}
                    width={itemWidth}
                    key={i}
                  ></Item>
                ))}
          </StyledSlider>
        </SliderContainer>
        {list.length > 0 && (
          <SliderButton
            onClick={handleNext}
            onMouseDown={handleButtonMouseDown}
            pointerEvents={pointerEvents.current}
            visibility={buttonVisibility.current}
          >
            <SliderButtonIcon className='material-icons'>
              keyboard_arrow_right
            </SliderButtonIcon>
          </SliderButton>
        )}
      </ButtonContainer>
    </React.Fragment>
  );
};

export default Slider;
