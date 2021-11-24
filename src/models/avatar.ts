import { useState } from 'react'

import { createModel } from 'hox'

function useUserAvatar() {
  const [ avatarSrc, setAvatarSrc ] = useState<string>('')
  
  return {
    avatarSrc,
    setAvatarSrc
  }
}

export const useUserAvatarModel = createModel(useUserAvatar)
