import React, { useEffect, useState } from 'react';
import Slider from 'infinite-react-carousel';
import Grid from '@material-ui/core/Grid';

const HomePage = () => {
  const [images, setImages] = useState([
    'https://i.ytimg.com/vi/cOgsueyUBSw/mqdefault.jpg',
    'https://i.ytimg.com/vi/3GLZAIaXudk/mqdefault.jpg',
    'https://i.ytimg.com/vi/cjxVqi9AWlw/mqdefault.jpg',
    'https://i.ytimg.com/vi/fpIPcgQTusc/mqdefault.jpg',
    'https://i.ytimg.com/vi/tCLd8Rv6zeo/mqdefault.jpg',
    'https://i.ytimg.com/vi/aVbRWY2EVws/mqdefault.jpg',
    'https://i.ytimg.com/vi/1HHDvYNbZ9U/mqdefault.jpg',
    'https://i.ytimg.com/vi/OHy0652vTQU/mqdefault.jpg',
    'https://i.ytimg.com/vi/JE8Jlfq07Mc/mqdefault.jpg',
    'https://i.ytimg.com/vi/UV6uScx_gPc/mqdefault.jpg',
    'https://i.ytimg.com/vi/R0x3XaSFkx0/mqdefault.jpg',
    'https://i.ytimg.com/vi/Pi1J_N5EzlM/mqdefault.jpg',
  ]);

  /*useEffect(() => {
    fetchVideos();
  }, []);*/

  const fetchVideos = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&topicId=/m/068hy&type=video&videoEmbeddable=true&key=${process.env.REACT_APP_API_KEY}`,
    );
    const data = await response.json();
    //setVideos(data.items);
    console.log(data.items);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '3px solid black',
        transform: 'translate(0,0px)',
        overflowX: 'auto',
      }}
    >
      {images.map((image, i) => (
        <img src={image}></img>
      ))}
    </div>
  );
};
export default HomePage;
