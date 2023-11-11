import { SVGProps } from "react"

export function BarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="22.7678" cy="22.3362" r="22.2322" fill="#C1B3E9"/>
    <path d="M22.7679 25.7562C17.2784 25.7562 12.8869 22.6095 12.8869 16.6353C12.8869 15.6092 13.0186 11.9609 13.2602 9.54384C13.3199 8.98355 13.5773 8.46608 13.9828 8.09131C14.3883 7.71653 14.9131 7.51103 15.456 7.51445H30.0798C30.6226 7.51103 31.1474 7.71653 31.5529 8.09131C31.9584 8.46608 32.2159 8.98355 32.2756 9.54384C32.5171 12.0749 32.6488 15.6092 32.6488 16.6353C32.6488 22.6095 28.2573 25.7562 22.7679 25.7562ZM22.7679 25.7562V37.1573M18.3763 37.1573H27.1594" stroke="#5B4C99" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}