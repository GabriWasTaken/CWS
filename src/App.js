import logo from "./logo.svg";
import "./App.css";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function App() {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyCkdvNgyc9ghQEfLtouyql3iJKJwTAyPpo" });
  if (!isLoaded) return <div>Loading...</div>;
  //API google maps AIzaSyCkdvNgyc9ghQEfLtouyql3iJKJwTAyPpo
  return <GoogleMap zoom={10} center={{ lat: 44, lng: -80 }} mapContainerClassName="map-container" />;
}

export default App;
