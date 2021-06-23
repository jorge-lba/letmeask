import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

function NewRoom(){
  const [newRoom, setNewRoom] = useState('')

  const { user } = useAuth()

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    const room = newRoom.trim()
    
    if(room === '') return

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: room,
      authorId: user?.id,
    })
  }

 return (
   <div id="page-auth">
    <aside>
      <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
      <strong>Crie salas e Q&amp;A ao-vivo</strong>
      <p>Tire as duvidas da sua audiência em tempo-real</p>
    </aside>
    <main>
      <div className="main-content">
        <img src={logoImg} alt="Letmeask" />
        <h2>Criar uma nova sala</h2>
        <form onSubmit={handleCreateRoom} >
          <input 
            type="text"
            placeholder="Nome da sala" 
            onChange={ event => setNewRoom(event.target.value) }
            value={ newRoom }
          />
          <Button type='submit'> 
            Criar sala
          </Button>
        </form>
        <p>
          Quer entrar em um sala existente? <Link to="/">clique aqui</Link>
        </p>
      </div>
    </main>
   </div>
 )
}

export { NewRoom }