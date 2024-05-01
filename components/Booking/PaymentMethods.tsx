import React, { useState } from "react";
import debit from "@/public/images/card.webp";
import cash from "@/public/images/cash.png";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";

const PaymentMethods = () => {
  const [selectedPament, setSelectedPament] = useState<string>("cash");
  const paymentsmethods = [
    {
      id: 1,
      name: "cash",
      image: cash,
      allowed: true,
    },
    {
      id: 2,
      name: "stripe checkout",
      image: debit,
      allowed: false,
    },
  ];
  return (
    <div className="mt-3">
      <h2 className="text-lg font-semibold mb-4">Select Payment Method:</h2>
      <Swiper
        spaceBetween={10}
        slidesPerView={"auto"}
        freeMode={true}
        modules={[FreeMode]}
        className="select-none w-full"
      >
        {paymentsmethods.map((ride) => (
          <SwiperSlide
            key={ride.id}
            className={`!w-28 text-center ${
              ride.allowed ? "cursor-pointer" : "cursor-not-allowed"
            } flex items-center !justify-center border ${
              ride.name === selectedPament
                ? "border-blue-500"
                : "border-gray-300"
            } flex-col rounded-md p-3 transition-all duration-500`}
            onClick={() => ride.allowed && setSelectedPament(ride.name)}
          >
            <Tooltip
              title={
                ride.allowed
                  ? ""
                  : "This option isn't available now will be available soon"
              }
              position="top"
              trigger="mouseenter"
              arrow={true}
              animation="fade"
              duration={200}
              followCursor={true}
            >
              <Image src={ride.image} alt={ride.name} className="" />
              <h2 className="capitalize">{ride.name}</h2>
            </Tooltip>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PaymentMethods;
