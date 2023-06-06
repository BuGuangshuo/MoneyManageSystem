import { useState } from 'react'

import { createModel } from 'hox'

function useGuideInfo() {
  const [ guideInfo, setGuideInfo ] = useState<any>()
  
  return {
    guideInfo,
    setGuideInfo
  }
}

export const useGuideInfoModel = createModel(useGuideInfo)
