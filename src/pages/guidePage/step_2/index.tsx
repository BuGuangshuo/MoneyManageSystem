import React, { useState, useEffect } from 'react'

import { useGuideInfoModel } from '../../../models/guide'

export default function Step2(props: any) {
  const { guideInfo, setGuideInfo } = useGuideInfoModel();

  useEffect(() => {
    console.log(guideInfo)
  },[guideInfo]);

  return (
    <div>Step2</div>
  )
}
