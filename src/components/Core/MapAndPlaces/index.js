"use client";
import { useLoadScript } from "@react-google-maps/api";
import classes from "./MapAndPlaces.module.css";

import MapEditView from "../MapEditView";
import MapView from "../MapView";
import PlacesInput from "../PlacesInput";
import { customDarkStyle } from "./CustomMapTheme";

// type = 'map' || 'places' || 'editAbleMap'
const Maps = ({
  type = "map",
  className,
  onMarkerClick,
  mapClass,
  placeClass,
  setCoordinates,
  setAddress,
  address,
  setPlaceDetail,
  location,
  placeholder,
  label,
  leftIcon,
  data,
  loader,
  showCircle,
  zoom,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "visualization"],
  });
  if (!isLoaded) {
    return loader ? (
      loader
    ) : (
      <div className={classes?.loadingContainer}>Loading</div>
    );
  }

  if (loadError) {
    return (
      <div className={classes?.ErrorContainer}>
        <span>Map cannot be loaded right now, sorry. </span>
      </div>
    );
  }

  const options = {
    maxZoom: 12,
    minZoom: 4, // Keep a good zoom level for the Bahamas
    draggable: true, // Enable dragging, but we will restrict movement
    disableDoubleClickZoom: true, // Disable zooming on double-click
    styles: customDarkStyle,
    mapTypeControl: false, // Disables the map type (satellite) button
    zoomControl: false, // Disables the zoom buttons
    streetViewControl: false, // Disables the Street View button
    fullscreenControl: false, // Disables the Fullscreen button
    restriction: {
      latLngBounds: {
        north: 25.5, // Slightly north of the Bahamas
        south: 23, // Slightly south of the Bahamas
        east: -75.0, // Eastern boundary (keeping it tight for the Bahamas)
        west: -80.5, // Western boundary (keeping it tight for the Bahamas)
      },
      strictBounds: true, // Prevent dragging outside the bounds
    },
  };

  return (
    <div className={`${classes.Container} ${className ? className : ""}`}>
      {type === "map" ? (
        <MapView
          data={data}
          location={location}
          className={mapClass}
          onMarkerClick={onMarkerClick}
          options={options}
          showCircle={showCircle}
          zoom={zoom}
        />
      ) : type === "editAbleMap" ? (
        <MapEditView
          coordinates={location}
          setCoordinates={setCoordinates}
          setAddress={setAddress}
          setPlaceDetail={setPlaceDetail}
          className={mapClass}
        />
      ) : (
        <PlacesInput
          setCoordinates={setCoordinates}
          setAddress={setAddress}
          address={address}
          className={placeClass}
          placeholder={placeholder}
          setPlaceDetail={setPlaceDetail}
          label={label}
          leftIcon={leftIcon}
        />
      )}
    </div>
  );
};

export default Maps;
