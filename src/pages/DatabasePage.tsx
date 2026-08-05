import { useState, useEffect } from 'react'
import { getSuspects, getCases } from '@/services/game'
import type { Suspect, Case } from '@/types/game'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Database, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const caseStatusLabels: Record<string, string> = {
  aberto: 'Aberto',
  em_andamento: 'Em Andamento',
  resolvido: 'Resolvido',
  arquivado: 'Arquivado',
}
const suspStatusLabels: Record<string, string> = {
  livre: 'Livre',
  sob_vigilancia: 'Vigilância',
  detido: 'Detido',
  inocentado: 'Inocentado',
}
const levelColors: Record<string, string> = {
  baixa: 'bg-blue-500/20 text-blue-400',
  baixo: 'bg-blue-500/20 text-blue-400',
  media: 'bg-yellow-500/20 text-yellow-400',
  medio: 'bg-yellow-500/20 text-yellow-400',
  alta: 'bg-orange-500/20 text-orange-400',
  alto: 'bg-orange-500/20 text-orange-400',
  critica: 'bg-red-500/20 text-red-400',
  extremo: 'bg-red-500/20 text-red-400',
}

export default function DatabasePage() {
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

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Database className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Banco de Dados</h1>
          <p className="text-sm text-muted-foreground">Suspeitos e casos registrados</p>
        </div>
      </div>
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Casos</h2>
        <div className="grid md:grid-cols-2 gap-3 mb-6">
          {cases.map((c) => (
            <Card key={c.id} className="bg-card border-border">
              <CardContent className="p-3">
                <p className="text-sm font-medium text-foreground">{c.title}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.description}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className={cn('text-xs', levelColors[c.priority])}>
                    {c.priority}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {caseStatusLabels[c.status] || c.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Suspeitos</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {suspects.map((s) => (
            <Card key={s.id} className="bg-card border-border">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">"{s.alias}"</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant="secondary"
                      className={cn('text-xs', levelColors[s.threat_level])}
                    >
                      {s.threat_level}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {suspStatusLabels[s.status]}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
