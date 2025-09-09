mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: coordinates,
  zoom: 8
});
  
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        'Exact location will be provided after booking'
    );

const marker = new mapboxgl.Marker({color : "red"})
.setLngLat(coordinates)
.setPopup(popup) 
.addTo(map);