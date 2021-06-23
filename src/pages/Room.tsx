import { FormEvent, useState } from 'react'
import { useParams } from 'react-router'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

import '../styles/room.scss'

type RoomParamsType = {
  id: string
}

function Room() {
  const { user } = useAuth()
  const { id: roomId } = useParams<RoomParamsType>()
  const [ newQuestion, setNewQuestion ] = useState('')

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()

    const question = newQuestion.trim()

    if(question === '') return

    if(!user) {
      throw new Error('You must be logged in')
    }

    const ask = {
      content: question,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighLighted: false,
      isAnswered: false
    }

    await database.ref(`/rooms/${roomId}/questions`).push(ask)

    setNewQuestion('')
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={ roomId }/>
        </div>
      </header>
      
      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form onSubmit={ handleSendQuestion }>
          <textarea 
            placeholder="O que você que perguntar?"
            onChange={ event => setNewQuestion(event.target.value) }
            value={ newQuestion }
          />

          <div className="form-footer">
            { user 
              ? (
                <div className="user-info">
                  <img src={ user.avatar } alt={ user.name } />
                  <span>{ user.name }</span>
                </div>
              ) 
              : (<span>Para enviar uma pergunta, <button>faça seu login</button>.</span>)
            }
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  )
}

export { Room }