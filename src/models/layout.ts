/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-05-24 14:43:23
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-05-25 18:19:13
 * @FilePath: \MoneyManageSystem\src\models\themeColor.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from 'react'

import { createModel } from 'hox'

function useLayoutType() {
  const [ layoutType, setLayoutType ] = useState<string>(localStorage.getItem('layout') || 'left')
  
  return {
    layoutType,
    setLayoutType
  }
}

export const useLayoutModel = createModel(useLayoutType)
