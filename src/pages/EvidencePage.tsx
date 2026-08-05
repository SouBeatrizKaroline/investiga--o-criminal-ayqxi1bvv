import { useState, useEffect } from 'react'
import { getEvidence, getCases } from '@/services/game'
import type { Evidence, Case } from '@/types/game'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileSearch, Loader2 } from 'lucide-react'

export default function EvidencePage() {
  const [evidence, setEvidence] = useState<Evidence[]>([])
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const [e, c] = await Promise.all([getEvidence(), getCases()])
      setEvidence(e)
      setCases(c)
      setLoading(false)
    }
    load()
  }, [])

  const caseTitle = (id: string) => cases.find((c) => c.id === id)?.title || 'Caso desconhecido'

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <FileSearch className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Evidências</h1>
          <p className="text-sm text-muted-foreground">Provas materiais coletadas</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {evidence.length === 0 ? (
          <p className="text-sm text-muted-foreground col-span-full text-center py-8">
            Nenhuma evidência registrada
          </p>
        ) : (
          evidence.map((ev) => (
            <Card key={ev.id} className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm text-foreground">{ev.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge variant="secondary">{ev.type}</Badge>
                <p className="text-xs text-muted-foreground">{ev.description}</p>
                <p className="text-xs text-muted-foreground">Caso: {caseTitle(ev.case_id)}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
