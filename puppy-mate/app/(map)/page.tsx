'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from './lib/use-kakao-loader';
import { useCurrentLocation } from './hooks/useCurrentLocation';
import { useEffect, useState } from 'react';

export default function BasicMap() {
  useKakaoLoader();
  const { location, error } = useCurrentLocation();
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 140.978,
  });

  useEffect(() => {
    if (location) {
      setMapCenter(location); // 위치가 변경될 때마다 지도 중심 업데이트
    }
  }, [location]);

  if (error) {
    return <div>위치 정보를 가져올 수 없습니다: {error}</div>;
  }

  return (
    <Map
      id="map"
      center={mapCenter}
      style={{
        width: '100%',
        height: '350px',
      }}
      level={3} // 지도의 확대 레벨
    >
      {location && (
        <MapMarker
          position={location} // 현재 위치에 마커 표시
        />
      )}

    </Map>
  );
}