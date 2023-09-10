// Работает при установке пакета => npm install prompt-sync
import promptSync from 'prompt-sync'
const prompt = promptSync()

function readFromTerminal(question) {
  const input = prompt(question)
  return input
}

export default readFromTerminal
