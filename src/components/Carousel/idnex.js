import React, { useEffect, useState } from "react";
import "./index.scss";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";
export default function CarouselImages(props) {
  const { images } = props;
  const [list, setList] = useState([]);
  useEffect(() => {
    const temp = images.map((item) => {
      return {
        src: item,
        sizes: "(max-width: 1000px) 400px, (max-width: 2000px) 700px, 1000px",
        alt: item,
        thumbnail: images[0],
      };
    });
    setList(temp);
  }, [images]);
  return (
    <div className="Carousel">
      <Carousel
        hasMediaButton={false}
        hasLeftButton={false}
        hasIndexBoard={false}
        hasRightButton={false}
        images={list}
      />
    </div>
  );
}
