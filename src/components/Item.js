import React from 'react';
import styled from 'styled-components/macro';
import ItemParts from './ItemParts';

const StyledItem = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: calc(100% / 3);
  @media (min-width: 800px) {
    width: calc(100% / 4);
  }
  @media (min-width: 1100px) {
    width: calc(100% / 5);
  }
  @media (min-width: 1400px) {
    width: calc(100% / 6);
  }
  box-sizing: border-box;
  padding: 0px 2px;
  margin: 25px 0px;
  border: none;
  background: ${props => props.theme.color.primary.dark};
  &.slider-item {
    @media (min-width: 0px) {
      width: ${props => `${props.width}px`};
    }
    margin: 0px;
    &#item:hover {
      transform: scale(1.5);
    }
    transition: transform ${props => props.theme.itemTransition};
  }
  &.left-item {
    transform-origin: left;
    &:hover ~ #item {
      transform: translateX(50%);
    }
  }
  &.right-item {
    transform-origin: right;
    &:hover ~ #item {
      transform: translateX(0);
    }
  }
  &.middle-item {
    &:hover ~ #item {
      transform: translateX(25%);
    }
  }
`;

const Item = props => {
  const handleLeftItemMouseOver = () => {
    props.handleLeftItemMouseOver();
  };

  const handleRightItemMouseOver = () => {
    props.handleRightItemMouseOver();
  };

  const handleItemMouseOut = () => {
    props.handleItemMouseOut();
  };

  return (
    <StyledItem
      width={props.width}
      onMouseOut={!props.type ? null : handleItemMouseOut}
      onMouseOver={
        props.type === 'left'
          ? handleLeftItemMouseOver
          : props.type === 'right'
          ? handleRightItemMouseOver
          : null
      }
      className={
        props.type === 'left'
          ? 'slider-item left-item'
          : props.type === 'right'
          ? 'slider-item right-item'
          : props.type === 'middle'
          ? 'slider-item middle-item'
          : ''
      }
      id='item'
    >
      <ItemParts
        item={props.item}
        hasKeyboardNavigation={props.hasKeyboardNavigation}
      ></ItemParts>
    </StyledItem>
  );
};

export default Item;
