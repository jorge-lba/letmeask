import { useHistory, useParams } from 'react-router'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useRoom } from '../hooks/useRoom'

import '../styles/room.scss'
import { database } from '../services/firebase'

type RoomParamsType = {
  id: string
}

function AdminRoom() {
  const history = useHistory()
  const { id: roomId } = useParams<RoomParamsType>()
  const { questions, title } = useRoom(roomId)

  async function handleEndRoom() {
    await database.ref(`/rooms/${roomId}`).update({
      endedAt: new Date()
    })

    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string){
    const response = window.confirm(
      'Tem certeza que você deseja excluir esta pergunta?'
    )

    if(response){
      await database
        .ref(`/rooms/${roomId}/questions/${questionId}`)
        .remove()
    } 
  }
  
  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={ roomId }/>
            <Button 
              isOutlined
              onClick={handleEndRoom}
            >
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>
      
      <main>
        <div className="room-title">
          <h1>Sala - {title}</h1>
          { 
            (() => {
              const countQuestions = questions.length
              return (
                countQuestions > 0 && <span>{
                  countQuestions < 2 
                    ? `${countQuestions} pergunta` 
                    : `${countQuestions} perguntas`   
                }</span>
              )
            })() 
          }
        </div>

        <div className="question-list">
          {questions.map(({id, content, author}) => 
            <Question 
              key={id}
              content={content}  
              author={author}
            >
              <button
                type="button"
                onClick={() => handleDeleteQuestion(id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          )}
        </div>
      </main>
    </div>
  )
}

export { AdminRoom }