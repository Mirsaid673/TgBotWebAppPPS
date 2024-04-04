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
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/effect-cards';
import "./swiperStyle.css"
import MovieHall from "./MovieHall.jsx";

const SwipableCard = function () {
    return (
        <>
            <Swiper className="mySwiper" modules={[EffectCards]} effect="cards" >
                <SwiperSlide><MovieHall /></SwiperSlide>
                <SwiperSlide><MovieHall /></SwiperSlide>
                <SwiperSlide><MovieHall /></SwiperSlide>
                <SwiperSlide><MovieHall /></SwiperSlide>
            </Swiper>
        </>
    );
};

export default SwipableCard;
