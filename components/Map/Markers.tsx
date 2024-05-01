import { UserLocationContext } from "@/context/UserLocationContext";
import Image from "next/image";
import React, { useContext } from "react";
import { Marker } from "react-map-gl";
import pin from "@/public/images/pin.png";
import { useUser } from "@clerk/nextjs";
import { SourceCordinatesContext } from "@/context/SourceCordinatesContext";
import { DestinationCordinatesContext } from "@/context/DestinationCordinatesContext";

const Markers = () => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const user = useUser();
  const { sourceCordinates, setSourceCordinates } = useContext(
    SourceCordinatesContext
  );
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordinatesContext
  );

  return (
    <div>
      {/* User Marker  */}
      {user && userLocation && (
        <Marker
          latitude={userLocation?.lat}
          longitude={userLocation?.lng}
          anchor="bottom"
        >
          <div className="relative w-[100px]">
            <Image src={pin} alt="Pin here" width={90} />
            {user && user.user && (
              <img
                src={user.user?.imageUrl}
                alt={user.user?.fullName || "image"}
                className="w-6 h-6 absolute top-[22%] left-[34%] rounded-full"
              />
            )}
          </div>
        </Marker>
      )}
      {/* Source Marker  */}
      {sourceCordinates && (
        <Marker
          latitude={sourceCordinates?.lat}
          longitude={sourceCordinates?.lng}
          anchor="bottom"
        >
          <div className="relative w-[100px]">
            <Image src={pin} alt="Pin here" width={90} />
          </div>
        </Marker>
      )}
      {/* Destination Marker  */}
      {destinationCordinates && (
        <Marker
          latitude={destinationCordinates?.lat}
          longitude={destinationCordinates?.lng}
          anchor="bottom"
        >
          <div className="relative w-[100px]">
            <Image src={pin} alt="Pin here" width={90} />
          </div>
        </Marker>
      )}
    </div>
  );
};

export default Markers;
