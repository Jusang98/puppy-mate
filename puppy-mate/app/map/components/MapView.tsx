'use client';

import { useEffect, useRef } from 'react';
import { loadKakaoScript } from '../../lib/kakaoMap';


export default function MapView() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadKakaoScript().then(() => {
      const center = new window.kakao.maps.LatLng(37.5665, 126.9780);
      const map = new window.kakao.maps.Map(ref.current!, { center, level: 3 });
    });
  }, []);

  return <div ref={ref} className="w-full h-[400px] rounded-md shadow" />;
}
