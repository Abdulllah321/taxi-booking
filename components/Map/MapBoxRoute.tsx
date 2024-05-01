import React from "react";
import { Layer, Source } from "react-map-gl";

const MapBoxRoute = (props: any) => {
  // Check if props.coordinates is null or undefined
  if (!props.coordinates) {
    return null; // Return null or some placeholder if props.coordinates is not available
  }

  return (
    <Source
      type="geojson"
      data={{
        type: "Feature",
        geometry: { type: "LineString", coordinates: props.coordinates },
        properties: {}, 
      }}
    >
      <Layer
        type="line"
        layout={{ "line-join": "round", "line-cap": "square" }}
        paint={{ "line-color": "#0462d4", "line-width": 5 }}
      />
    </Source>
  );
};

export default MapBoxRoute;
