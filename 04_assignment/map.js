/* global d3 */
/* global mapboxgl */
// d3.csv("./all_week.csv", function(data) {
//     console.log(data)
// });

//var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 
mapboxgl.accessToken = 'pk.eyJ1Ijoiem9yYXdhbiIsImEiOiJja3R1ZXQyZmUxemg2Mm5wOTV4Y2xpNm9tIn0.zN2b9k5Ppq9tOdCJOI2y9w';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/zorawan/ckvlqro312me914o2t6qdxll7',
    center: [-154.166512, 21.236159],
    zoom: 1.43
});

/* 
Add an event listener that runs
  when a user clicks on the map element.
*/
map.on('click', (event) => {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    // layers: ['2021-earthquakes-1vushc'] // replace with your layer name
    layers: ['2021-earthquakes-1', '2021-earthquakes-2', '2021-earthquakes-3', '2021-earthquakes-4', '2021-earthquakes-5'] // replace with your layer name
    
  });
  console.log(features);
  if (!features.length) {
    return;
  }
  const feature = features[0];

  /* 
    Create a popup, specify its options 
    and properties, and add it to the map.
  */
const popup = new mapboxgl.Popup({ offset: [0, -15] })
  .setLngLat(feature.geometry.coordinates)
  .setHTML(
    `<h3>${feature.properties.title}</h3>`
    // <p>${feature.properties.time}</p>
  )
  .addTo(map);
});
