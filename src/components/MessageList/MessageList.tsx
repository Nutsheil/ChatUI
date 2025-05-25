import { useEffect, useRef } from 'react'
import type { Message } from '../../types/Message'
import { MessageItem } from '../MessageItem'
import styles from './MessageList.module.css'

interface Props {
  messages: Message[]
}

export const MessageList = (props: Props) => {
  const { messages } = props

  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className={styles.message_list}>
      {messages.map(msg => (
        <MessageItem key={msg.id} message={msg} />
      ))}
      <div ref={endRef} />
    </div>
  )
}
