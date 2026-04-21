mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  // style: "mapbox://styles/mapbox/standard",
  // style: "mapbox://styles/mapbox/satellite-streets-v12",
  projection: "globe",
  zoom: 8, // increase zoom for city view
  center: listing.geometry.coordinates, // [ longitude , latitude ] // New Delhi
});

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates) //listing.geometry.coordinates
  .setPopup(new mapboxgl.Popup({ offset: 30 })
  .setHTML(`<h4>${listing.location}</h4><p>Exact location will be provided after booking</p>`))
  .addTo(map);

