import React, { useEffect } from 'react'

import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

export function PageLoading() {
  useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  }, [])

  return null
}
