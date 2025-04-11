// 'use client'

// import { Map } from "react-kakao-maps-sdk"
// import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

// export default function BasicMap() {
//   const [loading, error] = useKakaoLoaderOrigin({
//     appkey: process.env.NEXT_PUBLIC_KAKAO_KEY || "default-app-key",
//     libraries: ["clusterer", "drawing", "services"],
//   })

//   if (!loading) return <div>지도를 불러오는 중...</div>
//   if (error) return <div>지도를 불러오는 데 실패했습니다.</div>

//   return (
//     <Map
//       center={{ lat: 33.5563, lng: 126.79581 }}
//       style={{ width: "100%", height: "360px" }}
//       level={3}
//     />
//   )
// }
