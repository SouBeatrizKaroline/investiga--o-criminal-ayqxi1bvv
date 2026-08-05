import { useState, useEffect } from 'react'
import { getTestimonies, getCases } from '@/services/game'
import type { Testimony, Case } from '@/types/game'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Loader2 } from 'lucide-react'

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([])
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const [t, c] = await Promise.all([getTestimonies(), getCases()])
      setTestimonies(t)
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
        <MessageSquare className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Depoimentos</h1>
          <p className="text-sm text-muted-foreground">Testemunhos coletados</p>
        </div>
      </div>
      <div className="grid gap-3">
        {testimonies.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhum depoimento registrado
          </p>
        ) : (
          testimonies.map((t) => (
            <Card key={t.id} className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm text-foreground">{t.witness_name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground italic">"{t.statement}"</p>
                <p className="text-xs text-muted-foreground">Caso: {caseTitle(t.case_id)}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(t.recorded_at).toLocaleString('pt-BR')}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
