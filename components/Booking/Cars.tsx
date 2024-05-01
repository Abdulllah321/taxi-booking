import React, { useContext, useState } from "react";
import rideTypes from "./CarsList";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import { DirectionDataContext } from "@/context/DirectionDataContext";

const Cars = () => {
  const [selectedRide, setSelectedRide] = useState<any>({});
  const { directionData, setDirectionData } = useContext(DirectionDataContext);

  const getCost = (charges: any) => {
    return (charges * directionData.routes[0].distance*0.000621371192).toFixed(2)
  };
  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold mb-4">Select ride type: </h2>
      <Swiper
        spaceBetween={10}
        slidesPerView={"auto"}
        freeMode={true}
        modules={[FreeMode]}
        className="select-none cursor-grab w-full"
      >
        {rideTypes.map((ride) => (
          <SwiperSlide
            key={ride.id}
            className={`!w-28 text-center cursor-pointer flex items-center justify-center border ${
              ride.id === selectedRide.id
                ? "border-blue-500"
                : "border-gray-300"
            } flex-col rounded-md p-3 transition-all duration-500`}
            onClick={() => setSelectedRide(ride)}
          >
            <Image src={ride.image} alt={ride.name} className="h-12" />
            <h2>{ride.name}</h2>
            {directionData && directionData.routes ? (
              <h2 className="font-bold text-black">${getCost(ride.charges)}</h2>
            ) : (
              <h2 className="font-bold text-black">$ {ride.charges}/Mile</h2>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Cars;
