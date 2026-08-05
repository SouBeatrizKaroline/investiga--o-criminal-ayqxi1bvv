import { useState, useEffect } from 'react'
import { getCases, getActivityLogs } from '@/services/game'
import type { Case, ActivityLog } from '@/types/game'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Loader2 } from 'lucide-react'

export default function TimelinePage() {
  const [cases, setCases] = useState<Case[]>([])
  const [activity, setActivity] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const [c, a] = await Promise.all([getCases(), getActivityLogs()])
      setCases(c)
      setActivity(a)
      setLoading(false)
    }
    load()
  }, [])

  const events = [
    ...cases.map((c) => ({ date: c.occurred_at, title: c.title, desc: c.location })),
    ...activity.map((a) => ({ date: a.created, title: a.action, desc: a.description })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Clock className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Linha do Tempo</h1>
          <p className="text-sm text-muted-foreground">Cronologia dos eventos</p>
        </div>
      </div>
      <div className="relative pl-6 space-y-3">
        <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />
        {events.map((ev, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
            <Card className="bg-card border-border">
              <CardContent className="p-3">
                <p className="text-sm font-medium text-foreground">{ev.title}</p>
                <p className="text-xs text-muted-foreground">{ev.desc}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(ev.date).toLocaleString('pt-BR')}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
