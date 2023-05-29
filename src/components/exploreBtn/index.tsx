/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-05-29 18:04:08
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-05-29 18:19:32
 * @FilePath: \MoneyManageSystem\src\components\exploreBtn\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'

import './index.css'

export default function ExploreBtn({name}: {name: string}) {
  return (
    <button className='exploreBtn'>
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>{name}
    </button>
  )
}
