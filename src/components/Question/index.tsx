import { ReactNode } from 'react'
import cx from 'classnames'
import './styles.scss'

type QuestionProps =  {
  content: string
  author: {
    name: string
    avatar: string
  }
  children?: ReactNode
  isAnswered: boolean
  isHighLighted: boolean
  likes?: number
}

function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighLighted = false,
  likes
}: QuestionProps) {
  return (
    <div 
      className={cx(
        'question',
        {
          answered: isAnswered,
          highlighted: isHighLighted && !isAnswered
        }
      )}>
      <div className="content">
        { likes ? <span className='likes'>{likes} {likes > 1 ? 'likes' : 'like'}</span> : <span>0 likes</span>}
        <p>{content}</p>
      </div>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  )
}

export { Question }