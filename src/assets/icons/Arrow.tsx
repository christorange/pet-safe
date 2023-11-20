
import { SVGProps } from "react"

export function Arrow(props: SVGProps<SVGSVGElement>) {
  return (
<svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_b_446_2514)">
<path d="M13 20.5H27M27 20.5L20 13.5M27 20.5L20 27.5" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<filter id="filter0_b_446_2514" x="-4" y="-3.5" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_446_2514"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_446_2514" result="shape"/>
</filter>
</defs>
</svg>
  )
}
