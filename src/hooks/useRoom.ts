import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type FirebaseQuestionsType = Record<string, {
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighLighted: boolean,
  likes: Record<string, {
    authorId: string
  }>
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
  likeCount: number
  likeId: string | undefined
}

function useRoom(roomId: string){
  const { user } = useAuth()
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
            ...value,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
          }
        })
      
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })

    return () => {
      roomRef.off('value')
    }
  }, [roomId, user?.id] )

  return { questions, title }
}

export { useRoom }