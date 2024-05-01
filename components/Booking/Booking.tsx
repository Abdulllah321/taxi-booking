"use client";
import React, { useEffect, useState } from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import PaymentMethods from "./PaymentMethods";

const Booking = () => {
  return (
    <div className="p-5 relative">
      <h2 className="text-[20px] font-semibold mb-2">Booking</h2>
      <div
        className="border-[1px] p-5 rounded-md border-gray-400 relative"
        style={{ height: "calc(100vh * 0.86)" }}
      >
        <AutoCompleteAddress />
        <Cars />
        <PaymentMethods />
        <button
          className="absolute bottom-[0.60rem] py-3 text-center bg-blue-600 hover:bg-blue-600/90 transition-all duration-300 rounded-md left-1/2 -translate-x-1/2 text-white font-bold"
          style={{ width: "calc(100% - 1.25rem)" }}
        >
          Find a Driver
        </button>
      </div>
    </div>
  );
};

export default Booking;
