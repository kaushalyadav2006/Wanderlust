
  mapboxgl.accessToken = mapToken;  
  const map = new mapboxgl.Map({ 
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    projection: 'globe',
    zoom: 9, // increase zoom for city view
    center: [77.2090, 28.6139] // [ longitude , latitude ] // New Delhi
  });
