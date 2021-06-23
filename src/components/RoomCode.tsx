import copyImg from '../assets/images/copy.svg'

function RoomCode() {
  return (
    <button className="room-code">
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #232de3d32d</span>
    </button>
  )
}

export { RoomCode }