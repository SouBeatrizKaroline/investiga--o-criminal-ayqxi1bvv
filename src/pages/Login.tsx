import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShieldCheck, Loader2 } from 'lucide-react'
import { getErrorMessage } from '@/lib/pocketbase/errors'

export default function Login() {
  const { signIn, signUp, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/" replace />

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const fn = isLogin ? signIn : signUp
    const { error } = await fn(email, password)
    if (error) {
      setError(getErrorMessage(error))
      setLoading(false)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in-up">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <ShieldCheck className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Investigação Criminal</h1>
          <p className="text-sm text-muted-foreground">Sistema Federal de Análise Criminal</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-card p-6 rounded-lg border border-border"
        >
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agente@fbi.gov"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isLogin ? (
              'Entrar'
            ) : (
              'Cadastrar'
            )}
          </Button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
          </button>
        </form>
      </div>
    </div>
  )
}
