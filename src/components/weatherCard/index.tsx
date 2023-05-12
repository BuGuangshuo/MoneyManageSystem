import React from 'react'

import './index.css'

export default function WeatherCard() {
  return (
    <div className="card">
  <div className="container">
    <div className="cloud front">
      <span className="left-front"></span>
      <span className="right-front"></span>
    </div>
    <span className="sun sunshine"></span>
    <span className="sun"></span>
    <div className="cloud back">
      <span className="left-back"></span>
      <span className="right-back"></span>
    </div>
  </div>

  <div className="card-header">
    <span>中国, 北京市<br/>海淀区</span>
    <span>5月12日</span>
  </div>

  <span className="temp">23°</span>

</div>
  )
}
