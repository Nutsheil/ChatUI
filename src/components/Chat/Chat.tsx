import { useState } from 'react'
import type { Message } from '../../types/Message'
import { MessageList } from '../MessageList'
import { ChatInput } from '../ChatInput'
import styles from './Chat.module.css'
import { ErrorMessage } from '../ErrorMessage'
import type { ServerPayload, ServerResponse } from '../../types/api'
import { MESSAGE_URL } from '../../constants'

const getMock = () => {
  const mockMessages: Message[] = []
  const text =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, voluptatum quam. Architecto nostrum ipsa, pariatur sint, culpa doloribus ullam dolorum error facere consequatur odio fugit dolore aliquam aut ea amet!'

  for (let i = 0; i < 100; i++) {
    mockMessages.push({
      id: i.toString(),
      text,
      sender: i % 2 === 0 ? 'user' : 'server',
    })
  }

  return mockMessages
}

const isMock = true

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(isMock ? getMock() : [])
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendOnServer = async (payload: ServerPayload) => {
    setIsFetching(true)
    setError(null)

    try {
      const res = await fetch(MESSAGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data: ServerResponse = await res.json()
      return data.text
    } catch {
      setError('Не удалось получить ответ от сервера')
    } finally {
      setIsFetching(false)
    }
  }

  const onSend = async (text: string) => {
    setMessages(prev => prev.concat({ id: prev.length.toString(), text, sender: 'user' }))

    const response = await sendOnServer({ message: text })

    if (response) {
      setMessages(prev => prev.concat({ id: prev.length.toString(), text: response, sender: 'server' }))
    }
  }

  return (
    <div className={styles.chat}>
      <MessageList messages={messages} />
      <ChatInput onSend={onSend} isDisabled={isFetching} />
      <ErrorMessage message={error} />
    </div>
  )
}
