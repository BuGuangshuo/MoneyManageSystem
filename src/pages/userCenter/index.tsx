import React from 'react'

export default function UserCenter() {
  return (
    <div>
      {JSON.parse(sessionStorage.getItem('user')||"null").infoname}
    </div>
  )
}
