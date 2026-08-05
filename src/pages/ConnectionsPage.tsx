import { useState, useEffect } from 'react'
import { getSuspects, getCases } from '@/services/game'
import type { Suspect, Case } from '@/types/game'
import { Card, CardContent } from '@/components/ui/card'
import { Network, Loader2 } from 'lucide-react'

export default function ConnectionsPage() {
  const [suspects, setSuspects] = useState<Suspect[]>([])
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const [s, c] = await Promise.all([getSuspects(), getCases()])
      setSuspects(s)
      setCases(c)
      setLoading(false)
    }
    load()
  }, [])

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )

  const labels = ['Suspeito principal', 'Acesso ao sistema', 'Cúmplice', 'Testemunha']
  const connections = suspects.slice(0, 4).map((s, i) => ({
    from: s.name,
    to: cases[i]?.title || 'Caso',
    label: labels[i] || 'Relacionado',
  }))
  if (suspects.length >= 2)
    connections.push({ from: suspects[0].name, to: suspects[1].name, label: 'Conhecidos' })
  if (suspects.length >= 3)
    connections.push({ from: suspects[1].name, to: suspects[2].name, label: 'Vistos juntos' })

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Network className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Conexões</h1>
          <p className="text-sm text-muted-foreground">Rede de relacionamentos</p>
        </div>
      </div>
      <div className="grid gap-3">
        {connections.map((conn, i) => (
          <Card key={i} className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-2 md:gap-4">
              <div className="flex-1 text-center min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{conn.from}</p>
              </div>
              <div className="flex flex-col items-center gap-1 px-2 md:px-4 shrink-0">
                <div className="w-px h-4 bg-border" />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {conn.label}
                </span>
                <div className="w-px h-4 bg-border" />
              </div>
              <div className="flex-1 text-center min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{conn.to}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
