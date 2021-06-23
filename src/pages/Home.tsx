import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'

import { Button } from '../components/Button'
import { useHistory } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import { useTheme } from '../hooks/useTheme'

function Home(){
  const history = useHistory()
  const {theme, toggleTheme} = useTheme()
  const { user, signInWithGoogle } = useAuth()
  const [ roomCode, setRoomCode ] = useState('')

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(event:FormEvent) {
    event.preventDefault()

    const code = roomCode.trim()

    if(code === '') return

    const roomRef = await database.ref(`rooms/${code}`).get()

    if(!roomRef.exists()){
      alert('Room does not exists.')
      return
    }else {
      history.push(`/rooms/${code}`)
    }

  }

  return (
    <div className={theme} id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
        <strong>Crie salas e Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        {/* <button onClick ={() => {
          console.log(theme)
          toggleTheme()
        }}>theme mode</button> */}
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={ handleJoinRoom } >
            <input 
              type="text"
              placeholder="Digite o código da sala" 
              onChange={ event => setRoomCode(event.target.value) }
              value={ roomCode }
            />
            <Button type='submit'> 
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
 )
}

export { Home }