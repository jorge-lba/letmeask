import { createContext, ReactNode, useEffect, useState } from "react"
import { auth, firebase } from "../services/firebase"

type UserType = {
  id: string
  name: string
  avatar: string
}

type AuthContextType = {
  user: UserType | undefined
  signInWithGoogle: () => Promise<void>
}

type AuthContextProviderPropsType = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

function AuthContextProvider(props: AuthContextProviderPropsType){
  const [ user, setUser ] = useState<UserType>()

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    const { user } = await auth.signInWithPopup(provider)

    if(user){
      const {
        displayName,
        photoURL,
        uid
      } = user

      if(!displayName || !photoURL){
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        if(user){
          const {
            displayName,
            photoURL,
            uid
          } = user
    
          if(!displayName || !photoURL){
            throw new Error('Missing information from Google Account.')
          }
    
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])
  
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      { props.children }
    </AuthContext.Provider> 
  )
}

export { AuthContextProvider }