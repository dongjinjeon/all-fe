// CarouselComponent.tsx
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./CarouselComponent.css";

interface CarouselComponentProps {
  images: string[];
  links?: string[];
  isSub?: boolean;
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({
  images,
  links = [],
  isSub,
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };


  const handleSlideClick = (index: number) => {
    const link = links[index];
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <div className="carousel-container">
      <Carousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop
        showIndicators
        selectedItem={currentSlide}
        onChange={handleSlideChange}
        autoPlay
        interval={5000}
        transitionTime={500}
        renderArrowPrev={() => false}
        renderArrowNext={() => false}
        className={isSub ? "carousel-wrapper2" : "carousel-wrapper"}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={isSub ? "carousel-slide2" : "carousel-slide"}
            onClick={() => handleSlideClick(index)} 
          >
            <img
              src={image}
              alt={`Carousel slide ${index}`}
              className={`w-full h-full object-cover cursor-pointer`} // 클릭 가능한 커서 스타일 추가
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
