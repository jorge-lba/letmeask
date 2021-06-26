import { useHistory, useParams } from 'react-router'

import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useRoom } from '../hooks/useRoom'

import '../styles/room.scss'
import { database } from '../services/firebase'
import { Icon } from '../components/Icon'
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'

type RoomParamsType = {
  id: string
}

function AdminRoom() {
  const history = useHistory()
  const { id: roomId } = useParams<RoomParamsType>()
  const { questions, title } = useRoom(roomId)
  const { user, signInWithGoogle } = useAuth()

  useEffect(() => {
    handleRedirectIfNotAnAdmin()
  }, [user])
  
  async function handleRedirectIfNotAnAdmin() {
    const roomRef = database.ref(`/rooms/${roomId}`)
    const authorId = await (await roomRef.child('authorId').get()).val()

    const isAdmin = authorId === user?.id

    if(!isAdmin && !!user?.id){
      history.push(`/rooms/${roomId}`)
    }

  }

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

  async function handleCheckQuestionAsAnswered(questionId: string){
    await database
      .ref(`/rooms/${roomId}/questions/${questionId}`)
      .update({
        isAnswered: true
      })
  }

  async function handleHighlightQuestion(questionId: string){
    await database
      .ref(`/rooms/${roomId}/questions/${questionId}`)
      .update({
        isHighLighted: true
      })
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
          { 
            user?.id 
              ? questions.map(({id, content, author, isAnswered, isHighLighted}) => 
              <Question 
                key={id}
                content={content}  
                author={author}
                isAnswered={isAnswered}
                isHighLighted={isHighLighted}
              > 
                { !isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(id)}
                    >
                      <Icon option="check" type='img' alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(id)}
                    >
                      <Icon option="answer" type='img' alt="Dar destaque à pergunta" />
                    </button>
                  </>
                ) }
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(id)}
                >
                  <Icon option="delete" type='img' alt="Remover pergunta" />
                </button>
              </Question>
            ) : <span>Para acessar essa essa pagina <button className="btn-login" onClick={signInWithGoogle}>faça seu login</button>.</span>
          }
        </div>
      </main>
    </div>
  )
}

export { AdminRoom }