import { useState, useRef, useEffect } from 'react'
import { Bot, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const suggestions = [
  'Quais são os suspeitos do caso #1?',
  'Resuma as evidências do desaparecimento',
  'Qual a conexão entre os suspeitos?',
]

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá, Agente. Sou o assistente de investigação. Como posso ajudar com os casos?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text: string) => {
    if (!text.trim() || loading) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setLoading(true)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Analisando os dados disponíveis... Esta é uma resposta simulada. Conecte o backend de IA para respostas completas.',
        },
      ])
      setLoading(false)
    }, 1200)
  }

  return (
    <div className="p-4 md:p-6 space-y-4 flex flex-col h-screen animate-fade-in">
      <div className="flex items-center gap-2">
        <Bot className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Assistente</h1>
          <p className="text-sm text-muted-foreground">IA para análise investigativa</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
            <div
              className={
                m.role === 'user'
                  ? 'bg-primary text-primary-foreground px-4 py-2 rounded-lg max-w-[80%] md:max-w-md text-sm'
                  : 'bg-muted text-foreground px-4 py-2 rounded-lg max-w-[80%] md:max-w-md text-sm'
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted px-4 py-2 rounded-lg">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-muted/70 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
        className="flex gap-2 pb-4"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua pergunta..."
          disabled={loading}
        />
        <Button type="submit" size="icon" disabled={loading || !input.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}
