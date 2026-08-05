import type { Case, Evidence, Suspect, Testimony, ActivityLog } from '@/types/game'

export const mockCases: Case[] = [
  {
    id: 'case-1',
    title: 'Homicídio na Rua das Acácias',
    description: 'Corpo encontrado em residência abandonada.',
    status: 'em_andamento',
    priority: 'alta',
    location: 'Rua das Acácias, 145 - Centro',
    occurred_at: '2026-07-28T22:30:00Z',
    created: '2026-07-29T08:00:00Z',
    updated: '2026-08-03T14:20:00Z',
  },
  {
    id: 'case-2',
    title: 'Furto na Galeria Municipal',
    description: 'Três pinturas valiosas furtadas.',
    status: 'em_andamento',
    priority: 'media',
    location: 'Av. Brasil, 500',
    occurred_at: '2026-08-01T03:15:00Z',
    created: '2026-08-01T09:30:00Z',
    updated: '2026-08-04T11:00:00Z',
  },
  {
    id: 'case-3',
    title: 'Desaparecimento - Maria Silva',
    description: 'Jovem desaparecida após o trabalho.',
    status: 'em_andamento',
    priority: 'critica',
    location: 'Jardim Primavera',
    occurred_at: '2026-08-03T19:00:00Z',
    created: '2026-08-04T07:00:00Z',
    updated: '2026-08-05T10:30:00Z',
  },
  {
    id: 'case-4',
    title: 'Fraude TechCorp Ltda',
    description: 'Desvio de R$ 2.5 milhões.',
    status: 'resolvido',
    priority: 'alta',
    location: 'Centro Empresarial Norte',
    occurred_at: '2026-06-15T00:00:00Z',
    created: '2026-06-20T10:00:00Z',
    updated: '2026-07-25T16:00:00Z',
  },
]

export const mockEvidence: Evidence[] = [
  {
    id: 'ev-1',
    case_id: 'case-1',
    name: 'Faca serrilhada',
    type: 'Arma',
    description: 'Lâmina 15cm com sangue.',
    collected_at: '2026-07-29T10:00:00Z',
  },
  {
    id: 'ev-2',
    case_id: 'case-1',
    name: 'Impressões digitais',
    type: 'Biometria',
    description: 'Marcas na maçaneta.',
    collected_at: '2026-07-29T11:30:00Z',
  },
  {
    id: 'ev-3',
    case_id: 'case-2',
    name: 'Gravação CCTV',
    type: 'Vídeo',
    description: 'Dois suspeitos encapuzados.',
    collected_at: '2026-08-01T06:00:00Z',
  },
  {
    id: 'ev-4',
    case_id: 'case-3',
    name: 'Veículo abandonado',
    type: 'Objeto',
    description: 'Honda Civic prata.',
    collected_at: '2026-08-04T08:00:00Z',
  },
  {
    id: 'ev-5',
    case_id: 'case-3',
    name: 'Registro telefônico',
    type: 'Digital',
    description: 'Última chamada 19:12.',
    collected_at: '2026-08-04T09:00:00Z',
  },
]

export const mockSuspects: Suspect[] = [
  {
    id: 'susp-1',
    name: 'Ricardo Almeida',
    alias: 'O Lobo',
    status: 'sob_vigilancia',
    threat_level: 'alto',
    description: 'Ex-namorado da vítima.',
  },
  {
    id: 'susp-2',
    name: 'Fernando Costa',
    alias: 'Fantasma',
    status: 'livre',
    threat_level: 'extremo',
    description: 'Especialista em segurança.',
  },
  {
    id: 'susp-3',
    name: 'Ana Paula Ribeiro',
    alias: 'Sombra',
    status: 'detido',
    threat_level: 'medio',
    description: 'Motorista do veículo suspeito.',
  },
  {
    id: 'susp-4',
    name: 'Marcos Vieira',
    alias: 'Contador',
    status: 'inocentado',
    threat_level: 'baixo',
    description: 'Cooperação total.',
  },
]

export const mockTestimonies: Testimony[] = [
  {
    id: 'test-1',
    case_id: 'case-1',
    witness_name: 'João Pereira',
    statement: 'Ouvi gritos às 22h. Vi uma pessoa sair correndo.',
    recorded_at: '2026-07-29T14:00:00Z',
  },
  {
    id: 'test-2',
    case_id: 'case-2',
    witness_name: 'Carlos Santos',
    statement: 'Vi um furgão escuro às 2h da manhã.',
    recorded_at: '2026-08-01T15:00:00Z',
  },
  {
    id: 'test-3',
    case_id: 'case-3',
    witness_name: 'Patrícia Lima',
    statement: 'Maria saiu às 19h, parecia normal.',
    recorded_at: '2026-08-04T11:00:00Z',
  },
]

export const mockActivity: ActivityLog[] = [
  {
    id: 'act-1',
    action: 'Evidência coletada',
    description: 'Faca serrilhada adicionada ao Caso #1',
    created: '2026-08-05T09:30:00Z',
  },
  {
    id: 'act-2',
    action: 'Suspeito identificado',
    description: 'Ricardo Almeida em vigilância',
    created: '2026-08-05T08:15:00Z',
  },
  {
    id: 'act-3',
    action: 'Depoimento registrado',
    description: 'João Pereira - Caso #1',
    created: '2026-08-04T16:00:00Z',
  },
  {
    id: 'act-4',
    action: 'Caso atualizado',
    description: 'Caso #3 prioridade elevada para crítica',
    created: '2026-08-04T10:30:00Z',
  },
  {
    id: 'act-5',
    action: 'Conexão estabelecida',
    description: 'Ana Paula ligada ao Caso #3',
    created: '2026-08-04T09:00:00Z',
  },
]
