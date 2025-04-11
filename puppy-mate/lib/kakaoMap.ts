'use client';

declare global {
    interface Window {
      kakao: any;
    }
  }
  

export const loadKakaoScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.kakao) return resolve();
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => resolve());
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};
