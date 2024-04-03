// import React from "react";
// import {
//   Card,
//   CardBody,
//   Stack,
//   Heading,
//   Divider,
//   CardFooter,
//   ButtonGroup,
//   Button,
//   Image, // Import Image from Chakra UI
//   Text, // Import Text from Chakra UI
// } from "@chakra-ui/react";
import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SwipableCard = () => {
  const slides = Array.from({ length: 1000 }).map(
      (el, index) => `Slide ${index + 1}`
  );

  return (
      <Swiper modules={[Virtual]} spaceBetween={50} slidesPerView={3} virtual>
        {slides.map((slideContent, index) => (
            <SwiperSlide key={slideContent} virtualIndex={index}>
              {slideContent}
            </SwiperSlide>
        ))}
      </Swiper>
  );
};

export default SwipableCard;
