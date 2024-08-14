// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// // LocationPicker component to handle the map interaction
// const LocationPicker = ({ onLocationSelect, initialLocation }) => {
//   const [position, setPosition] = useState(initialLocation || [51.505, -0.09]);
//   console.log('====================================');
//   console.log('postion is :',position);
//   console.log('====================================');

//   const MapEvents = () => {
//     useMapEvents({
//       click(e) {
//         const { lat, lng } = e.latlng;
//         setPosition([lat, lng]);
//         onLocationSelect({ lat, lng });
//       },
//     });
//     return null;
//   };

//   return (
//     <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <MapEvents />
//       <Marker position={position} />
//     </MapContainer>
//   );
// };

// export default LocationPicker;
