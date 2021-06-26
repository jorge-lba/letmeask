import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type FirebaseQuestionsType = Record<string, {
  author: {
    id: string
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
    id: string
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighLighted: boolean
  likeCount: number
  likeId: string | undefined
}

type QuestionsDivisorType = {
  open: QuestionType[]
  isAnswered: QuestionType[]
  isHighLighted: QuestionType[]
}

function useRoom(roomId: string){
  const { user } = useAuth()
  const [ questions, setQuestions ] = useState<QuestionType[]>([])
  const [ title, setTitle ] = useState('')
  const [questionsAnswered, setQuestionsAnswered] = useState<QuestionType[]>([])
  const [questionsHighLighted, setQuestionsHighLighted] = useState<QuestionType[]>([])

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
        .sort((a, b) => b.likeCount - a.likeCount)
        .reduce((current, next) => {
          if(next.isAnswered){
            current.isAnswered.push(next)
          } else if(next.isHighLighted){
            current.isHighLighted.push(next)
          } else {
            current.open.push(next)
          }

          return current
        }, {
          open:[],
          isAnswered: [],
          isHighLighted: []
        } as QuestionsDivisorType)
      
      setTitle(databaseRoom.title)

      setQuestions(parsedQuestions.open)
      setQuestionsAnswered(parsedQuestions.isAnswered)
      setQuestionsHighLighted(parsedQuestions.isHighLighted)
    })

    return () => {
      roomRef.off('value')
    }
  }, [roomId, user?.id] )

  return { questions, questionsAnswered, questionsHighLighted, title }
}

export { useRoom }