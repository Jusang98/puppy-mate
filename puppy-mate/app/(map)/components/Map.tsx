'use client';
import { Map as KakaoMap, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../lib/use-kakao-loader';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { useRef, useEffect, useState } from 'react';
import useMapStore from '@/store/useMapStore';
import { getDistance } from '../utils/getDistance';
export function Map() {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const { location, error } = useCurrentLocation();

  const path = useMapStore((state) => state.path); // Zustand에서 경로 가져오기
  const addPathPoint = useMapStore((state) => state.addPathPoint); // Zustand에서 경로 추가 함수 가져오기
  const isSavingPath = useMapStore((state) => state.isSavingPath); // Zustand에서 경로 저장 여부 가져오기
  const toggleSavingPath = useMapStore((state) => state.toggleSavingPath); // 경로 저장 토글 함수 가져오기
  useKakaoLoader();

  useEffect(() => {
    if (!mapRef.current) return;

    if (location) {
      const center = new kakao.maps.LatLng(location.lat, location.lng);
      mapRef.current.setCenter(center);
    }

    if (isSavingPath && location) {
      const lastPosition = path.at(-1);
      if (!lastPosition || getDistance(lastPosition, location) > 1) {
        addPathPoint(location); // 경로 저장
      }
    }
  }, [location, isSavingPath]);

  if (error) {
    return <div>위치 정보를 가져올 수 없습니다: {error}</div>;
  }

  return (
    <>
      <button onClick={toggleSavingPath}>토글 버튼{isSavingPath ? 'on' : 'off'}</button>
      <KakaoMap
        id="map"
        ref={mapRef}
        center={{ lat: 37.566535, lng: 126.977125 }}
        style={{
          width: '100%',
          height: '350px',
        }}
        level={3} // 지도의 확대 레벨
      >
        {location && (
          <>
            {/* 현재 위치에 마커 표시 */}
            <MapMarker position={location} />

            {/* 이동 경로를 따라 폴리라인 그리기 */}
            {isSavingPath && (
              <Polyline
                path={path} // 폴리라인 경로
                strokeWeight={5} // 선 두께
                strokeColor="#FF0000" // 선 색상
                strokeOpacity={0.8} // 선 투명도
                strokeStyle="solid" // 선 스타일
              />
            )}
          </>
        )}
      </KakaoMap>
    </>
  );
}
