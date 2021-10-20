import React, { useEffect } from 'react'
import { navigate } from '@reach/router'
import { DEFAULT_SETTINGS_ROUTE } from '../../utils/constants'

export default function MainLayout({ children }: any) {
  useEffect(() => {
    const loginState: string = localStorage.getItem('token') || "login"
    if(loginState === "Acess") {
      const url = DEFAULT_SETTINGS_ROUTE
      navigate(url)
    } else {
      navigate("/login")
    }
  },[])

  return (
    <div>
      {children}
    </div>
  )
}
