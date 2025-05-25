import { useEffect, useRef, useState } from 'react'
import styles from './ChatInput.module.css'

interface Props {
  onSend: (text: string) => void
  isDisabled: boolean
}

const MAX_ROWS = 4

const getMaxHeight = (computedStyles: CSSStyleDeclaration) => {
  const fontSize = parseFloat(computedStyles.fontSize || '16')

  const lineHeightRaw = computedStyles.lineHeight
  const lineHeight = lineHeightRaw === 'normal' ? 1.2 * fontSize : parseFloat(lineHeightRaw)

  const paddingTop = parseFloat(computedStyles.paddingTop || '0')
  const paddingBottom = parseFloat(computedStyles.paddingBottom || '0')
  const verticalPadding = paddingTop + paddingBottom

  return lineHeight * MAX_ROWS + verticalPadding
}

export const ChatInput = (props: Props) => {
  const { onSend, isDisabled } = props

  const [text, setText] = useState('')

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!isDisabled && textareaRef.current) textareaRef.current.focus()
  }, [isDisabled])

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const maxHeight = getMaxHeight(window.getComputedStyle(textarea))

    textarea.style.height = 'auto'
    textarea.style.overflowY = 'hidden'

    const contentHeight = textarea.scrollHeight
    if (contentHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`
      textarea.style.overflowY = 'auto'
    } else {
      textarea.style.height = `${contentHeight}px`
    }
  }, [text])

  const handleSend = () => {
    if (text.trim() === '') return
    onSend(text)
    setText('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={styles.container}>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.textarea}
        placeholder='Введите сообщение...'
        disabled={isDisabled}
        rows={1}
      />
      <button onClick={handleSend} className={styles.button} disabled={isDisabled}>
        Отправить
      </button>
    </div>
  )
}
