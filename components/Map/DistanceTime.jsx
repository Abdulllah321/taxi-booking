import React, { useContext } from "react";
import { DirectionDataContext } from "@/context/DirectionDataContext";

const DistanceTime = () => {
  const { directionData } = useContext(DirectionDataContext);

  if (!directionData?.routes) {
    return null;
  }

  // Convert duration from minutes to hours and minutes
  const totalMinutes = directionData.routes[0].duration /60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = (totalMinutes % 60).toFixed(0);

  return (
    <div className="bg-blue-900 p-3">
      <h2 className="text-blue-50 opacity-80 text-[15px]">
        Distance:{" "}
        <span className="font-bold mr-3 ">
          {(directionData.routes[0].distance * 0.000621371192).toFixed(2)} Miles
        </span>
      </h2>
      <h2 className="text-blue-50 opacity-80 text-[15px]">
        Duration:{" "}
        <span className="font-bold mr-3">
          {hours > 0 && `${hours} Hours `}
          {minutes > 0 && `${minutes} Min`}
        </span>
      </h2>
    </div>
  );
};

export default DistanceTime;
