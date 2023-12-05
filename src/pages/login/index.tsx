import React, { useEffect, useState } from 'react'
import { navigate } from '@reach/router'

import LeftArea from './components/Left_Area'
import RightArea from './components/Right_Area'
import { DEFAULT_SETTINGS_ROUTE } from '../../utils/constants'

import styles from './index.module.less'

export default function Login() {
  const [token,setToken] = useState('')

  useEffect(() => {
    if (token === "Acess") {
      const query = new URLSearchParams(window.location.search)
      const redirect = query.get('redirect')
      const url = redirect || DEFAULT_SETTINGS_ROUTE
      navigate(url)
    }
  }, [token])

  return (
    <div className={styles["login-wrap"]}>
      <LeftArea/>
      <RightArea/>
    </div>
  )
}
