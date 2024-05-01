"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Map, Marker } from "react-map-gl";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import "mapbox-gl/dist/mapbox-gl.css";
import { UserLocationContext } from "@/context/UserLocationContext";
import { SourceCordinatesContext } from "@/context/SourceCordinatesContext";
import { DestinationCordinatesContext } from "@/context/DestinationCordinatesContext";
import Markers from "./Markers";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapBoxRoute from "./MapBoxRoute";
import mapboxgl from "mapbox-gl";
import DistanceTime from "./DistanceTime";

const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";
const MapBoxMap = () => {
  const mapRef = useRef<any>(null);
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCordinates, setSourceCordinates } = useContext(
    SourceCordinatesContext
  );
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordinatesContext
  );
  const [showFlyToSourceButton, setShowFlyToSourceButton] = useState(false);
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const sessionToken = uuidv4();

  //source cordinates
  useEffect(() => {
    if (sourceCordinates && mapRef.current) {
      mapRef.current.flyTo({
        center: [sourceCordinates.lng, sourceCordinates.lat],
        duration: 2500,
      });
      setShowFlyToSourceButton(true);
    }
  }, [sourceCordinates, mapRef]);

  //destination cordinates
  useEffect(() => {
    if (destinationCordinates && mapRef.current) {
      mapRef.current.flyTo({
        center: [destinationCordinates.lng, destinationCordinates.lat],
        duration: 2500,
      });
    }

    if (sourceCordinates && destinationCordinates) {
      getDirectionRoute();
    }
  }, [destinationCordinates, mapRef]);

  useEffect(() => {
    if (directionData?.routes && mapRef.current) {
      setTimeout(() => {
        const routeCoordinates = directionData.routes[0].geometry.coordinates;
        const bounds = routeCoordinates.reduce(
          (bounds: mapboxgl.LngLatBounds, coord: [number, number]) =>
            bounds.extend(coord),
          new mapboxgl.LngLatBounds(routeCoordinates[0], routeCoordinates[0])
        );
        mapRef.current.fitBounds(bounds, {
          padding: 50,
          duration: 2000,
          easing: (t: number) => t, // Type annotation for 't'
          offset: [0, 0],
        });
      }, 2000);
    }
  }, [directionData]);

  const handleFlyToSource = () => {
    if (sourceCordinates && mapRef.current) {
      mapRef.current.flyTo({
        center: [sourceCordinates.lng, sourceCordinates.lat],
        duration: 2500,
      });
    }
  };
  //location cordinates
  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        duration: 2500,
      });
    }
  }, [userLocation, mapRef]);

  const getDirectionRoute = async () => {
    const res = await fetch(
      `${MAPBOX_DRIVING_ENDPOINT}${sourceCordinates.lng},${sourceCordinates.lat};${destinationCordinates.lng},${destinationCordinates.lat}?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    setDirectionData(result);
    console.log(result);
  };

  return (
    <div className="p-5 relative">
      <h2 className="text-xl font-semibold my-2">Map</h2>
      <div className="rounded-md overflow-hidden">
        <Map
          ref={mapRef}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: userLocation?.lng,
            latitude: userLocation?.lat,
            zoom: 14,
          }}
          style={{ width: "100%", height: "calc(100vh * 0.8)" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Markers />
          {directionData?.routes && (
            <MapBoxRoute
              coordinates={directionData?.routes[0]?.geometry?.coordinates}
            />
          )}
        </Map>
        {showFlyToSourceButton && (
          <button
            className="absolute bottom-12 right-12 bg-blue-600 text-white p-3 rounded-full"
            onClick={handleFlyToSource}
          >
            <FaLocationCrosshairs />
          </button>
        )}
      </div>
      <div className="absolute bottom-[20px] z-20 right-[20px] hidden md:block">
        <DistanceTime />
      </div>
    </div>
  );
};

export default MapBoxMap;
