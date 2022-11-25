import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React from "react";
import "./App.css";
import Card from "./components/card/card";
import { apiKey } from "./api/api";

const center = {
  lat: 48.8698258,
  lng: 2.3345863,
};

function App() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap mapContainerClassName="map-container" mapTypeControl={false} center={center} zoom={15} onLoad={onLoad}>
        <Card></Card>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default App;
