export const getCenterAndLevel = (coords: { lat: number; lng: number }[]) => {
  let minLat = coords[0].lat,
    maxLat = coords[0].lat;
  let minLng = coords[0].lng,
    maxLng = coords[0].lng;

  coords.forEach(({ lat, lng }) => {
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  });

  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  const latDiff = maxLat - minLat;
  const lngDiff = maxLng - minLng;
  const maxDiff = Math.max(latDiff, lngDiff);

  let level = 3;
  if (maxDiff > 0.1) level = 5;
  if (maxDiff > 0.2) level = 7;
  if (maxDiff > 0.5) level = 9;

  return {
    center: new window.kakao.maps.LatLng(centerLat, centerLng),
    level,
  };
};
