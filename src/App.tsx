import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/hooks/use-auth'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/Layout'
import Index from '@/pages/Index'
import Login from '@/pages/Login'
import EvidencePage from '@/pages/EvidencePage'
import MapPage from '@/pages/MapPage'
import TimelinePage from '@/pages/TimelinePage'
import TestimoniesPage from '@/pages/TestimoniesPage'
import DatabasePage from '@/pages/DatabasePage'
import ConnectionsPage from '@/pages/ConnectionsPage'
import DeductionPage from '@/pages/DeductionPage'
import AssistantPage from '@/pages/AssistantPage'
import NotFound from '@/pages/NotFound'

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/evidencias" element={<EvidencePage />} />
              <Route path="/mapa" element={<MapPage />} />
              <Route path="/linha-do-tempo" element={<TimelinePage />} />
              <Route path="/depoimentos" element={<TestimoniesPage />} />
              <Route path="/banco-de-dados" element={<DatabasePage />} />
              <Route path="/conexoes" element={<ConnectionsPage />} />
              <Route path="/deducao" element={<DeductionPage />} />
              <Route path="/assistente" element={<AssistantPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
