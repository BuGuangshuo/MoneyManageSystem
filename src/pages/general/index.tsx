import React from 'react'
import Histogram from './components/histogram'
import TotalCard from './components/totalCard'

import styles from './index.module.less'

export default function General() {
  return (
    <div className={styles['general-wrap']}> 
      <div className="site-card-wrapper">
        <TotalCard/>
        <Histogram/>
      </div>
    </div>
  )
}
