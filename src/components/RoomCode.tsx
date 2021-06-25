import cn from 'classnames'
import { useEffect, useState } from 'react'

import '../styles/room-code.scss'
import { Icon } from './Icon'

type RoomCodePropsType = {
  code: string
}

function RoomCode(props: RoomCodePropsType) {
  const [copied, setCopied] = useState(false)

  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 5000)
  }

  return (
    <button 
    className={cn('room-code', { copied })} 
      onClick={copyRoomCodeToClipboard}
    >
      <div>
        <Icon option="copy" type="svg" alt="Copy room code" />
      </div>
       <span>Sala #{ props.code }</span>
    </button>
  )
}

export { RoomCode }