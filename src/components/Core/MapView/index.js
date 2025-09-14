import { Circle, GoogleMap, Marker } from "@react-google-maps/api";
import classes from "./MapView.module.css";

export default function MapView({
  location,
  className,
  showCircle = false,
  zoom = 16,
}) {
  return (
    <div className={`${classes?.container} ${className && className}`}>
      <GoogleMap
        zoom={zoom}
        center={location}
        mapContainerClassName={classes["map-container"]}
        // set clickable icons to false
        clickableIcons={false}
      >
        {location && (
          <>
            {showCircle ? (
              <Circle
                center={location}
                radius={200}
                options={{
                  strokeColor: "red",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "red",
                  fillOpacity: 0.35,
                }}
              />
            ) : (
              <Marker position={location} />
            )}
          </>
        )}
      </GoogleMap>
    </div>
  );
}
