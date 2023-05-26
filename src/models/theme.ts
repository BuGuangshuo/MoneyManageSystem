/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-01-04 10:32:37
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-05-26 09:53:31
 * @FilePath: \MoneyManageSystem\src\models\theme.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from 'react'

import { createModel } from 'hox'

function useTheme() {
  const [ themeType, setThemeType ] = useState<string>('light')
  
  return {
    themeType,
    setThemeType
  }
}

export const useThemeModel = createModel(useTheme)
