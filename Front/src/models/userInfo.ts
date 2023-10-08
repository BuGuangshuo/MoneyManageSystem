import { useState } from 'react'

import { createModel } from 'hox'

function useUserInfo() {
  const [ userData, setUserData ] = useState<any>()
  
  return {
    userData,
    setUserData
  }
}

export const useUserInfoModel = createModel(useUserInfo)
