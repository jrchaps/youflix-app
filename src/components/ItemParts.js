import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Link, useLocation } from 'react-router-dom';
import { addFavorite, removeFavorite } from '../store/actions';
import { useSelector, useDispatch } from 'react-redux';

const ItemLink = styled(Link)`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const ItemButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  user-select: none;
  background: ${props => props.theme.black.dark};
  border-radius: 100%;
  &.slider-item-button {
    visibility: hidden;
    opacity: 0;
    #item:hover & {
      visibility: visible;
      opacity: 1;
    }
    transition: opacity ${props => props.theme.itemTransition},
      visibility ${props => props.theme.itemTransition};
  }
`;

const PlayButton = styled(ItemButton)`
  top: 15%;
  @media (max-width: 550px) {
    top: 10%;
  }
  left: 10px;
  border: 1px solid ${props => props.theme.white.light};
`;

const PlayIcon = styled.i`
  font-size: 36px;
  @media (max-width: 900px) {
    font-size: 24px;
  }
  @media (min-width: 1800px) {
    font-size: 48px;
  }
  color: ${props => props.theme.color.secondary.main};
  &.not-hovered {
    color: ${props => props.theme.white.light};
  }
`;

const FavoriteButton = styled(ItemButton)`
  @media (min-width: 1800px) {
    height: 48px;
    width: 48px;
  }
  right: 10px;
  bottom: 10%;
  border: 1px solid ${props => props.theme.white.medium};
  &:hover {
    border-color: ${props => props.theme.white.light};
  }
`;

const FavoriteIcon = styled.i`
  font-size: 24px;
  @media (min-width: 1800px) {
    font-size: 36px;
  }
  color: ${props => props.theme.white.medium};
  ${FavoriteButton}:hover & {
    color: ${props => props.theme.white.light};
  }
`;

const Tooltip = styled.p`
  position: absolute;
  bottom: -90%;
  padding: 3px;
  margin: 0px;
  font-size: 14px;
  z-index: 1;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  ${FavoriteButton}:hover & {
    opacity: 1;
    visibility: visible;
  }
  background: ${props => props.theme.black.dark};
  border-radius: 2px;
  color: ${props => props.theme.white.light};
  &.slider-item-tooltip {
    font-size: 10px;
  }
`;

const ItemTitle = styled.p`
  position: absolute;
  width: 50%;
  left: 10px;
  bottom: calc(10% + 6px);
  @media (min-width: 1800px) {
    bottom: calc(10% + 12px);
  }
  font-size: 16px;
  margin: 0px;
  padding: 3px;
  background: ${props => props.theme.black.dark};
  color: ${props => props.theme.white.light};
  border-radius: 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &.slider-item-title {
    font-size: 12px;
    @media (min-width: 1600px) {
      font-size: 16px;
    }
    opacity: 0;
    visibility: hidden;
    #item:hover & {
      opacity: 1;
      visibility: visible;
    }
    transition: opacity ${props => props.theme.itemTransition},
      visibility ${props => props.theme.itemTransition};
  }
`;

const ItemParts = props => {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  const location = useLocation();
  const [playIconClassName, setPlayIconClassName] = useState('material-icons');

  const handleFavoriteClick = () => {
    if (favorites[props.item.id.videoId]) {
      dispatch(removeFavorite(props.item.id.videoId));
    } else {
      dispatch(addFavorite(props.item));
    }
  };

  const handleFavoriteButtonMouseOver = () => {
    setPlayIconClassName('material-icons not-hovered');
  };

  const handleFavoriteButtonMouseOut = () => {
    setPlayIconClassName('material-icons');
  };

  const handleMouseDown = e => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <ItemLink
        to={`/watch=${props.item.id.videoId}`}
        tabIndex={!props.hasKeyboardNavigation && '-1'}
      ></ItemLink>
      <Image src={props.item.snippet.thumbnails.medium.url} />
      <Link to={`/watch=${props.item.id.videoId}`} tabIndex='-1'>
        <PlayButton
          as='div'
          className={location.pathname === '/' ? 'slider-item-button' : ''}
        >
          <PlayIcon className={playIconClassName}>play_arrow</PlayIcon>
        </PlayButton>
      </Link>
      <FavoriteButton
        onClick={handleFavoriteClick}
        onMouseOver={handleFavoriteButtonMouseOver}
        onMouseOut={handleFavoriteButtonMouseOut}
        onMouseDown={handleMouseDown}
        className={location.pathname === '/' ? 'slider-item-button' : ''}
        tabIndex='-1'
      >
        <FavoriteIcon className='material-icons'>
          {favorites[props.item.id.videoId] ? 'check' : 'add'}
        </FavoriteIcon>
        <Tooltip
          className={location.pathname === '/' ? 'slider-item-tooltip' : ''}
        >
          {favorites[props.item.id.videoId]
            ? 'Remove from Library'
            : 'Add to Library'}
        </Tooltip>
      </FavoriteButton>
      <Link to={`/watch=${props.item.id.videoId}`} tabIndex='-1'>
        <ItemTitle
          className={location.pathname === '/' ? 'slider-item-title' : ''}
        >
          {props.item.snippet.title}
        </ItemTitle>
      </Link>
    </React.Fragment>
  );
};

export default ItemParts;
