'use client';

import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import useKakaoLoader from './components/use-kakao-loader';
import { useCurrentLocation } from './hooks/useCurrentLocation';
import { useEffect, useState } from 'react';
export default function BasicMap() {
  useKakaoLoader();
  const [course, setCourse] = useState<{ lat: number; lng: number }[]>([]);
  const { location } = useCurrentLocation();

  useEffect(
    () => {
      const interval = setInterval(() => {
        if (location) {
          setCourse(prevCourse => [...prevCourse, location]);
        }
      }, 5000);

      return () => clearInterval(interval);
    },
    [location]
  );
  useEffect(
    () => {
      console.log(course);
    },
    [course]
  );

  return (
    <Map // 지도를 표시할 Container
      id="map"
      center={location || { lat: 37.5665, lng: 126.978 }}
      style={{
        // 지도의 크기
        width: '100%',
        height: '350px'
      }}
      level={3} // 지도의 확대 레벨
    >
      <CustomOverlayMap position={location || { lat: 37.5665, lng: 126.978 }}>
        <div
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: 'red',
            borderRadius: '50%',
            border: '1px solid #000'
          }}
        />
      </CustomOverlayMap>
    </Map>
  );
}
