const COLORS = {
  LAND_COLOR: "#FFB300", // Bright color for land areas
  WATER_COLOR: "#061118", // Dark blue color for water
  TEXT_COLOR: "#6c6c6c", // Grayish white color for all text labels
};

export const customDarkStyle = [
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.fill",
    stylers: [{ color: COLORS.LAND_COLOR }],
  },

  {
    featureType: "administrative.province",
    elementType: "geometry.fill",
    stylers: [{ color: COLORS.LAND_COLOR }],
  },

  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      { color: COLORS.TEXT_COLOR }, // Change label text color
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.stroke",
    stylers: [
      { visibility: "off" }, // Change label text color
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [{ color: COLORS.LAND_COLOR }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      { color: COLORS.TEXT_COLOR }, // Change label text color
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      { color: COLORS.TEXT_COLOR }, // Change label text color
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ color: COLORS.WATER_COLOR }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      { color: COLORS.TEXT_COLOR }, // Change label text color
    ],
  },
];
