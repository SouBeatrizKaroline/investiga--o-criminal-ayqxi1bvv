export type CaseStatus = 'aberto' | 'em_andamento' | 'resolvido' | 'arquivado'
export type CasePriority = 'baixa' | 'media' | 'alta' | 'critica'
export type SuspectStatus = 'livre' | 'sob_vigilancia' | 'detido' | 'inocentado'
export type ThreatLevel = 'baixo' | 'medio' | 'alto' | 'extremo'

export interface Case {
  id: string
  title: string
  description: string
  status: CaseStatus
  priority: CasePriority
  location: string
  occurred_at: string
  created: string
  updated: string
}

export interface Evidence {
  id: string
  case_id: string
  name: string
  type: string
  description: string
  collected_at: string
}

export interface Suspect {
  id: string
  name: string
  alias: string
  status: SuspectStatus
  threat_level: ThreatLevel
  description: string
}

export interface Testimony {
  id: string
  case_id: string
  witness_name: string
  statement: string
  recorded_at: string
}

export interface ActivityLog {
  id: string
  action: string
  description: string
  created: string
}
