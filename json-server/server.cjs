const jsonServer = require('json-server')

const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const router = jsonServer.router('./db.json')

server.use(middlewares)
server.use(jsonServer.bodyParser)

const mockResponses = ['Да', 'Нет']

// Наш кастомный POST-обработчик
server.post('/messages', (req, res) => {
  const { message } = req.body

  if (!message) {
    return res.status(400).json({ error: 'message is required' })
  }

  const index = Math.floor(Math.random() * mockResponses.length)

  // router.db.get('messages').push({ message }).write()

  // res.status(200).json({ text: mockResponses[index] })
  res.status(200).json({ text: message })
})

server.use(router)

server.listen(4000, () => {
  console.log('JSON Server is running on http://localhost:4000')
})
