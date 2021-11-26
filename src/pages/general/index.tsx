import React from 'react'
import Histogram from './components/histogram'
import TotalCard from './components/totalCard'
import PieBar from './components/pieBar'
import LineBar from './components/lineBar'

import styles from './index.module.less'

export default function General() {
  return (
    <div className={styles['general-wrap']}> 
      <div className="site-card-wrapper">
        <TotalCard/>
        <Histogram/>
        <PieBar/>
        <LineBar/>
      </div>
    </div>
  )
}
