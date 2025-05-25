import styles from './ErrorMessage.module.css'

interface Props {
  message: string | null
}

export const ErrorMessage = (props: Props) => {
  const { message } = props

  if (!message) return null

  return <div className={styles.container}>{message}</div>
}
