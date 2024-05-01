import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { SourceCordinatesContext } from "@/context/SourceCordinatesContext";
import { DestinationCordinatesContext } from "@/context/DestinationCordinatesContext";

interface AddressItem {
  full_address?: string;
  name?: string;
}

const MAPBOX_RETRIVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";

const AutoCompleteAddress: React.FC = () => {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [addressList, setAddressList] = useState<AddressItem[]>([]);
  const [destinationAddressList, setDestinationAddressList] = useState<
    AddressItem[]
  >([]);
  const { sourceCordinates, setSourceCordinates } = useContext(
    SourceCordinatesContext
  );
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordinatesContext
  );
  const sessionToken = uuidv4();

  const getAddress = async (query: string, setter: any) => {
    try {
      const res = await axios.get<{ suggestions: AddressItem[] }>(
        "/api/search-address",
        { params: { q: query } }
      );
      setter(res.data.suggestions || []);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setSource(`Current Location (${latitude}, ${longitude})`);
        },
        (error) => {
          console.error("Error fetching current location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleFromAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSource(e.target.value);
    const delayTime = setTimeout(
      () => getAddress(e.target.value, setAddressList),
      1000
    );
    return () => clearTimeout(delayTime);
  };

  const handleToAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
    const delayTime = setTimeout(
      () => getAddress(e.target.value, setDestinationAddressList),
      1000
    );
    return () => clearTimeout(delayTime);
  };

  const handleAddressSelection = (
    item: AddressItem,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(item.full_address || "");
  };

  const onSourceAddressClick = async (item: any) => {
    handleAddressSelection(item, setSource);
    setAddressList([]);

    const res = await fetch(
      `${
        MAPBOX_RETRIVE_URL + item.mapbox_id
      }?session_token=${sessionToken}&access_token=${
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
      }`
    );

    const result = await res.json();
    setSourceCordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };

  const onDestinationAddressClick = async (item: any) => {
    handleAddressSelection(item, setDestination);
    setDestinationAddressList([]);

    const res = await fetch(
      `${
        MAPBOX_RETRIVE_URL + item.mapbox_id
      }?session_token=${sessionToken}&access_token=${
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
      }`
    );

    const result = await res.json();
    setDestinationCordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };

  return (
    <div className="mt-5">
      <div className="relative">
        <label htmlFor="WhereFrom" className="text-gray-500">
          Where From?
        </label>
        <div className="flex items-center bg-white p-1 border-[1px] border-solid w-full rounded-md outline-none border-gray-200 transition-all duration-500 px-2 mt-1">
          <input
            type="text"
            id="WhereFrom"
            placeholder="Enter your address"
            className="w-full border-none outline-none"
            value={source}
            onChange={(e) => handleFromAddress(e)}
            onFocus={(e) =>
              (e.target.parentNode as HTMLElement)?.classList.add(
                "!border-blue-700"
              )
            }
            onBlur={(e) =>
              (e.target.parentNode as HTMLElement)?.classList.remove(
                "!border-blue-700"
              )
            }
          />
          <span>🔍</span>
        </div>
        {addressList.length > 0 && (
          <div className="shadow-lg p-1 rounded-md absolute w-full bg-white top-full z-10">
            {addressList
              .filter((item) => item.full_address)
              .map((item, index) => (
                <h2
                  key={index}
                  className="p-3 hover:bg-gray-200 cursor-pointer"
                  onClick={() => onSourceAddressClick(item)}
                >
                  {item.full_address}
                </h2>
              ))}
          </div>
        )}
      </div>
      <div className="relative">
        <label htmlFor="Whereto" className="text-gray-500">
          Where To?
        </label>
        <div className="flex items-center bg-white p-1 border-[1px] border-solid w-full rounded-md outline-none border-gray-200 transition-all duration-500 px-2 mt-1">
          <input
            type="text"
            id="Whereto"
            placeholder="Enter your destination"
            className="w-full border-none outline-none"
            value={destination}
            onChange={(e) => handleToAddress(e)}
            onFocus={(e) =>
              (e.target.parentNode as HTMLElement)?.classList.add(
                "!border-blue-700"
              )
            }
            onBlur={(e) =>
              (e.target.parentNode as HTMLElement)?.classList.remove(
                "!border-blue-700"
              )
            }
          />
          <span>🔍</span>
        </div>
        {destinationAddressList.length > 0 && (
          <div className="shadow-lg p-1 rounded-md absolute w-full bg-white top-full z-10">
            {destinationAddressList
              .filter((item) => item.full_address)
              .map((item, index) => (
                <h2
                  key={index}
                  className="p-3 hover:bg-gray-200 cursor-pointer"
                  onClick={() => onDestinationAddressClick(item)}
                >
                  {item.full_address}
                </h2>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoCompleteAddress;
