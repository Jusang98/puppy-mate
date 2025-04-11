import Script from 'next/script'
import React from 'react'
export const API = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&libraries=services,clusterer&autoload=false`

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src={API}
        strategy="beforeInteractive"
      />
      {children}
    </>
  )
}
