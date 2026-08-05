import { useState, useEffect } from 'react'
import { getCases } from '@/services/game'
import type { Case } from '@/types/game'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Loader2 } from 'lucide-react'

export default function MapPage() {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCases().then((c) => {
      setCases(c)
      setLoading(false)
    })
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
        <MapPin className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mapa de Crimes</h1>
          <p className="text-sm text-muted-foreground">Localizações dos incidentes</p>
        </div>
      </div>
      <div className="grid gap-3">
        {cases.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Nenhum caso mapeado</p>
        ) : (
          cases.map((c) => (
            <Card key={c.id} className="bg-card border-border">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 rounded-md bg-primary/10 shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{c.location}</p>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {c.priority}
                </Badge>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
