import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import {
  Home,
  FileSearch,
  Map,
  Clock,
  MessageSquare,
  Database,
  Network,
  Brain,
  Bot,
  LogOut,
  ShieldCheck,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Visão Geral', icon: Home },
  { to: '/evidencias', label: 'Evidências', icon: FileSearch },
  { to: '/mapa', label: 'Mapa', icon: Map },
  { to: '/linha-do-tempo', label: 'Linha do Tempo', icon: Clock },
  { to: '/depoimentos', label: 'Depoimentos', icon: MessageSquare },
  { to: '/banco-de-dados', label: 'Banco de Dados', icon: Database },
  { to: '/conexoes', label: 'Conexões', icon: Network },
  { to: '/deducao', label: 'Dedução', icon: Brain },
  { to: '/assistente', label: 'Assistente', icon: Bot },
]

export function Sidebar() {
  const location = useLocation()
  const { signOut, user } = useAuth()

  return (
    <aside className="flex w-16 md:w-64 flex-col bg-[hsl(var(--sidebar))] border-r border-[hsl(var(--sidebar-border))] shrink-0 transition-all duration-300">
      <div className="p-3 md:p-5 border-b border-[hsl(var(--sidebar-border))]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
          <div className="hidden md:block">
            <h1 className="text-sm font-bold text-foreground">Investigação Criminal</h1>
            <p className="text-xs text-muted-foreground">Sistema Federal</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-2 md:p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-[hsl(var(--sidebar-border))] hover:text-foreground',
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-2 md:p-3 border-t border-[hsl(var(--sidebar-border))]">
        <p className="text-xs text-muted-foreground truncate mb-2 hidden md:block">
          {user?.email || 'Agente'}
        </p>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className="hidden md:inline">Sair</span>
        </button>
      </div>
    </aside>
  )
}
