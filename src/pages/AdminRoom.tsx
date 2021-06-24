import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

import '../styles/room.scss'

type RoomParamsType = {
  id: string
}

function AdminRoom() {
  const { id: roomId } = useParams<RoomParamsType>()

  const { questions, title } = useRoom(roomId)
  
  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={ roomId }/>
            <Button isOutlined>Encerrar Sala</Button>
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
          {questions.map(({id, content, author}) => <Question 
            key={id}
            content={content}  
            author={author}
          />)}
        </div>
      </main>
    </div>
  )
}

export { AdminRoom }