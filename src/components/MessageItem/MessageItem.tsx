import type { Message } from '../../types/Message'
import { Markdown } from '../Markdown'
import styles from './MessageItem.module.css'

interface Props {
  message: Message
}

export const MessageItem = (props: Props) => {
  const { message } = props

  const isUser = message.sender === 'user'

  return (
    <div className={isUser ? styles.message_user_wrapper : styles.message_server_wrapper}>
      <div className={isUser ? styles.message_user : styles.message_server}>
        <Markdown text={message.text} />
      </div>
    </div>
  )
}
