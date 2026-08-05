import { useState, useEffect } from 'react'
import { getCases, getEvidence, getSuspects, getTestimonies } from '@/services/game'
import type { Case, Evidence, Suspect, Testimony } from '@/types/game'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Loader2, Lightbulb } from 'lucide-react'

export default function DeductionPage() {
  const [cases, setCases] = useState<Case[]>([])
  const [evidence, setEvidence] = useState<Evidence[]>([])
  const [suspects, setSuspects] = useState<Suspect[]>([])
  const [testimonies, setTestimonies] = useState<Testimony[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const [c, e, s, t] = await Promise.all([
        getCases(),
        getEvidence(),
        getSuspects(),
        getTestimonies(),
      ])
      setCases(c)
      setEvidence(e)
      setSuspects(s)
      setTestimonies(t)
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

  const deductions = cases.slice(0, 3).map((c, i) => ({
    title: c.title,
    text:
      [
        'A faca e impressões digitais apontam para um agressor conhecido da vítima.',
        'O acesso ao sistema sugere conhecimento interno e expertise técnica.',
        'O veículo abandonado e registros telefônicos indicam premeditação.',
      ][i] || 'Análise em andamento com as evidências disponíveis.',
  }))

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Brain className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dedução</h1>
          <p className="text-sm text-muted-foreground">Análise e conclusões investigativas</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm text-foreground">Resumo de Dados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>{cases.length} casos registrados</p>
            <p>{evidence.length} evidências coletadas</p>
            <p>{suspects.length} suspeitos identificados</p>
            <p>{testimonies.length} depoimentos gravados</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm text-foreground flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" /> Conclusões
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {deductions.map((d, i) => (
              <div key={i} className="p-3 rounded-md bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">{d.title}</p>
                <p className="text-sm text-foreground">{d.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
