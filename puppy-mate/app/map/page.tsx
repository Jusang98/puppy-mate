'use client'

import { Map, CustomOverlayMap } from "react-kakao-maps-sdk"
import useKakaoLoader from "./components/use-kakao-loader"
import { useCurrentLocation } from "./hooks/useCurrentLocation"
export default function BasicMap() {
  useKakaoLoader()
  const { location, error } = useCurrentLocation()
  return (
    <Map // 지도를 표시할 Container
      id="map"
      center={location || { lat: 37.5665, lng: 126.9780 }} 
      style={{
        // 지도의 크기
        width: "100%",
        height: "350px",
      }}
      level={3} // 지도의 확대 레벨
    >
      <CustomOverlayMap position={location || { lat: 37.5665, lng: 126.9780 }}>
        <div
          style={{padding:"42px", backgroundColor:"#fff", color:"#000"}}
        >
          Custom Overlay!
        </div>
      </CustomOverlayMap>
    </Map>
  )
}
