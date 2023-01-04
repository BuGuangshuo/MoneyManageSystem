import { useState } from 'react'

import { createModel } from 'hox'

function useTheme() {
  const [ themeType, setThemeType ] = useState<string>('')
  
  return {
    themeType,
    setThemeType
  }
}

export const useThemeModel = createModel(useTheme)
