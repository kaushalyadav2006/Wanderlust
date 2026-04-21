mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  projection: "globe",
  zoom: 8, // increase zoom for city view
  center: coordinates, // [ longitude , latitude ] // New Delhi
});

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({color:"red"})
  .setLngLat(coordinates) //listing.geometry.coordinates
  .addTo(map);
