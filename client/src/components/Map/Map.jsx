import "./Map.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { locations } from "../../utils/json/locations.json";

const Map = ({ location, orderLocation, orderType, updateLocation }) => {
  const RedIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div>
      <span>
        {orderType === "delivery" ? "Delivery from " : "In-store Pickup at "}
        {orderLocation !== null && orderLocation.name}
      </span>
      <MapContainer
        center={[location.lat, location.lon]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={RedIcon} position={[location.lat, location.lon]}>
          <Popup>
            {location.lat === -1.2921 && location.lon === 36.8219
              ? "Default Location"
              : "Current Location"}
          </Popup>
        </Marker>
        <FeatureGroup>
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={[location.lat, location.lon]}
              eventHandlers={{
                click: () => updateLocation(location),
              }}
            ></Marker>
          ))}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default Map;
