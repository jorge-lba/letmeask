import { FormEvent, useState } from 'react'
import cx from 'classnames'
import { useParams } from 'react-router'

import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { Question } from '../components/Question'
import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

import '../styles/room.scss'
import { Header } from '../components/Header'

type RoomParamsType = {
  id: string
}

function Room() {
  const { user, signInWithGoogle } = useAuth()
  const { id: roomId } = useParams<RoomParamsType>()
  const [ newQuestion, setNewQuestion ] = useState('')

  const { questions, questionsHighLighted, title } = useRoom(roomId)
  
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
        id: user.id,
        name: user.name,
        avatar: user.avatar
      },
      isHighLighted: false,
      isAnswered: false
    }

    await database.ref(`/rooms/${roomId}/questions`).push(ask)

    setNewQuestion('')
  }

  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    const likeRef = await database
      .ref(`/rooms/${roomId}/questions/${questionId}/likes`)
    
    !likeId 
      ? likeRef.push({
        authorId: user?.id
      })
      : likeRef.child(likeId).remove()
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
      <Header />
      
      <main>
        <div className="room-title">
          <h1>Sala - {title}</h1>
          { 
            (() => {
              const countQuestions = questions.length + questionsHighLighted.length
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
              : (<span>Para enviar uma pergunta, <button onClick={signInWithGoogle}>faça seu login</button>.</span>)
            }
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

        <div className="question-list">
          {questionsHighLighted.map(({
              id, 
              content, 
              author, 
              likeCount,
              likeId,
              isAnswered,
              isHighLighted
          }) => 
            <Question 
              key={id}
              content={content}  
              author={author}
              isAnswered={isAnswered}
              isHighLighted={isHighLighted}
              likes={likeCount}
            >
              <button
                className={ cx(
                  'like-button',
                  {
                    liked: likeId,
                    disabled: isAnswered
                  }
                )}
                disabled={isAnswered}
                type="button"
                aria-label="Marcar como gostei"
                onClick={() => handleLikeQuestion(id, likeId)}
              >
                <Icon option='like' type='svg' />
              </button>
              {
                user?.id === author.id && !isAnswered && !isHighLighted
                && <button onClick={() => handleDeleteQuestion(id)}>
                  <Icon option='delete' type='img' />
                </button>
              }
            </Question>
          )}
        </div>

        <div className="question-list">
          {questions.map(({
              id, 
              content, 
              author, 
              likeCount,
              likeId,
              isAnswered,
              isHighLighted
          }) => 
            <Question 
              key={id}
              content={content}  
              author={author}
              isAnswered={isAnswered}
              isHighLighted={isHighLighted}
              likes={likeCount}
            >
              <button
                className={ cx(
                  'like-button',
                  {
                    liked: likeId,
                    disabled: isAnswered
                  }
                )}
                disabled={isAnswered}
                type="button"
                aria-label="Marcar como gostei"
                onClick={() => handleLikeQuestion(id, likeId)}
              >
                <Icon option='like' type='svg' />
              </button>
              {
                user?.id === author.id && !isAnswered
                && <button onClick={() => handleDeleteQuestion(id)}>
                  <Icon option='delete' type='img' />
                </button>
              }
            </Question>
          )}
        </div>
      </main>
    </div>
  )
}

export { Room }