import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCases, getEvidence, getSuspects, getActivityLogs } from '@/services/game'
import type { Case, Evidence, Suspect, ActivityLog } from '@/types/game'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  FolderOpen,
  FileSearch,
  Users,
  CheckCircle,
  Activity,
  ChevronRight,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const statusLabels: Record<string, string> = {
  aberto: 'Aberto',
  em_andamento: 'Em Andamento',
  resolvido: 'Resolvido',
  arquivado: 'Arquivado',
}
const priorityColors: Record<string, string> = {
  baixa: 'bg-blue-500/20 text-blue-400',
  media: 'bg-yellow-500/20 text-yellow-400',
  alta: 'bg-orange-500/20 text-orange-400',
  critica: 'bg-red-500/20 text-red-400',
}

export default function Index() {
  const [cases, setCases] = useState<Case[]>([])
  const [evidence, setEvidence] = useState<Evidence[]>([])
  const [suspects, setSuspects] = useState<Suspect[]>([])
  const [activity, setActivity] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const [c, e, s, a] = await Promise.all([
        getCases(),
        getEvidence(),
        getSuspects(),
        getActivityLogs(),
      ])
      setCases(c)
      setEvidence(e)
      setSuspects(s)
      setActivity(a)
      setLoading(false)
    }
    loadData()
  }, [])

  const activeCases = cases.filter((c) => c.status !== 'resolvido' && c.status !== 'arquivado')
  const resolvedCases = cases.filter((c) => c.status === 'resolvido')
  const resolutionRate =
    cases.length > 0 ? Math.round((resolvedCases.length / cases.length) * 100) : 0

  const stats = [
    { label: 'Casos Ativos', value: activeCases.length, icon: FolderOpen, color: 'text-blue-400' },
    { label: 'Evidências', value: evidence.length, icon: FileSearch, color: 'text-cyan-400' },
    { label: 'Suspeitos', value: suspects.length, icon: Users, color: 'text-orange-400' },
    {
      label: 'Taxa de Resolução',
      value: `${resolutionRate}%`,
      icon: CheckCircle,
      color: 'text-green-400',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Visão Geral</h1>
        <p className="text-sm text-muted-foreground mt-1">Painel de controle da investigação</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="bg-card border-border">
              <CardContent className="p-3 md:p-4 flex items-center gap-3">
                <div className={cn('p-2 rounded-md bg-muted', stat.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base text-foreground">Casos Ativos</CardTitle>
            <Link to="/banco-de-dados" className="text-xs text-primary hover:underline">
              Ver todos
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {activeCases.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">Nenhum caso ativo</p>
            ) : (
              activeCases.map((c) => (
                <Link
                  key={c.id}
                  to="/banco-de-dados"
                  className="block p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors duration-200"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{c.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{c.location}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge
                        variant="secondary"
                        className={cn('text-xs', priorityColors[c.priority])}
                      >
                        {c.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs hidden sm:inline-flex">
                        {statusLabels[c.status]}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <Activity className="w-4 h-4" /> Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activity.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">Sem atividade</p>
            ) : (
              activity.slice(0, 6).map((a) => (
                <div key={a.id} className="flex gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-foreground font-medium">{a.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{a.description}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
