"use client";
import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { DestinationCordinatesContext } from "@/context/DestinationCordinatesContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SourceCordinatesContext } from "@/context/SourceCordinatesContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();
  const [sourceCordinates, setSourceCordinates] = useState<any>();
  const [destinationCordinates, setDestinationCordinates] = useState<any>(); 
  const [directionData, setDirectionData] = useState<any>(); 

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  };

  return (
    <div>
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCordinatesContext.Provider
          value={{ sourceCordinates, setSourceCordinates }}
        >
          <DestinationCordinatesContext.Provider
            value={{ destinationCordinates, setDestinationCordinates }}
          >
            <DirectionDataContext.Provider
              value={{ directionData, setDirectionData }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-100">
                <div className="">
                  <Booking />
                </div>
                <div className="col-span-2">
                  <MapBoxMap />
                </div>
              </div>
            </DirectionDataContext.Provider>
          </DestinationCordinatesContext.Provider>
        </SourceCordinatesContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
