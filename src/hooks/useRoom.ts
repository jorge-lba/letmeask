import { useEffect, useState } from "react"
import { database } from "../services/firebase"

type FirebaseQuestionsType = Record<string, {
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighLighted: boolean
}>

type QuestionType = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighLighted: boolean
}

function useRoom(roomId: string){
  const [ questions, setQuestions ] = useState<QuestionType[]>([])
  const [ title, setTitle ] = useState('')

  useEffect( () => {
    const roomRef = database.ref(`/rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestionsType = databaseRoom.questions ?? {}
      const parsedQuestions = Object.entries(firebaseQuestions)
        .map(([id, value]) => {
          return{
            id,
            ...value
          }
        })
      
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
  }, [roomId] )

  return { questions, title }
}

export { useRoom }