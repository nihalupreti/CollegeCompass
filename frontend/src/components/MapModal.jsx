import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "react-modal";

export default function MapModal({ isOpen, onRequestClose }) {
  const [userLocation, setUserLocation] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    console.log(
      "Effect triggered with isOpen:",
      isOpen,
      "userLocation:",
      userLocation,
      "mapReady:",
      mapReady,
      "mapRef:",
      mapRef.current
    );
    if (isOpen && userLocation && mapReady && mapRef.current) {
      console.log("User location:", userLocation);
      mapRef.current.flyTo(userLocation, 13, {
        duration: 1, // Duration of the animation in seconds
      });
    } else {
      console.log("Map not ready or no user location:", {
        isOpen,
        userLocation,
        mapReady,
        mapRef: mapRef.current,
      });
    }
  }, [isOpen, userLocation, mapReady]);

  const handlePermissionError = (error) => {
    console.error("Error getting user's location:", error);
  };

  const getUserLocation = () => {
    console.log("Getting user's location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Got user's location:", { latitude, longitude });
        setUserLocation([latitude, longitude]);
      },
      handlePermissionError,
      { enableHighAccuracy: true }
    );
  };

  const handleMapReady = (map) => {
    console.log("Map is ready:", map);
    setMapRef(map);
    setMapReady(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgb(0 0 0 / 79%)",
        },
        content: {
          height: "auto",
          width: "auto",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: 0,
          borderRadius: "10px",
          overflow: "none",
        },
      }}
    >
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "600px" }}
        whenCreated={(map) => {
          console.log("Map is created:", map);
          mapRef.current = map;
          handleMapReady();
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>
      <button onClick={getUserLocation}>Find My Location</button>
      <button onClick={onRequestClose}>Close Map</button>
    </Modal>
  );
}
