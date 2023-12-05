import React from 'react'

import './index.css'

export default function PointCard(props: { theme: string }) {
  return (
    <div className="card">
    <div className="circle" style={{background: `radial-gradient(${props.theme}, ${props.theme})`}}></div>
    <div className="circle" style={{background: `radial-gradient(${props.theme}, ${props.theme})`}}></div>
    <div className="card-inner"></div>
</div>
  )
}
