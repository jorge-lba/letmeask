import { useParams } from 'react-router-dom'
import { Icon } from '../Icon'
import { RoomCode } from '../RoomCode'

type RoomParamsType = {
  id: string
}

function Header(){
  const { id: roomId } = useParams<RoomParamsType>()

  return(
    <header>
        <div className="content">
          <Icon option="logo" type="img" alt="Letmeask" />
          <RoomCode code={ roomId }/>
        </div>
      </header>
  )
}

export { Header }