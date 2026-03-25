import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useUserStore } from '../store/useUserStore'

const Switch = ({ checked, onChange }: { checked: boolean, onChange: (checked: boolean) => void }) => (
  <button 
    onClick={() => onChange(!checked)}
    className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${checked ? 'bg-orange-500' : 'bg-zinc-200'}`}
  >
    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
)

export function Settings({ onBack }: { onBack: () => void }) {
  const { name, phone, email, acceptsPromotions, setName, setPhone, setEmail, setAcceptsPromotions, resetUser } = useUserStore()
  
  const [localName, setLocalName] = useState(name)
  const [localPhone, setLocalPhone] = useState(phone)
  const [localEmail, setLocalEmail] = useState(email)
  const [localAccepts, setLocalAccepts] = useState(acceptsPromotions)

  const handleSave = () => {
    setName(localName)
    setPhone(localPhone)
    setEmail(localEmail)
    setAcceptsPromotions(localAccepts)
    onBack()
  }

  const handleDelete = () => {
    resetUser()
    window.location.reload()
  }

  return (
    <div className="min-h-full bg-slate-50 pb-32">
      {/* Header */}
      <header className="flex items-center pt-14 px-6 pb-6 bg-slate-50 sticky top-0 z-30">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center text-zinc-900 hover:bg-zinc-50 transition-colors absolute left-6">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-zinc-900 font-bold text-lg tracking-wide w-full text-center">Configurações</h1>
      </header>

      <div className="px-6">
        {/* Card 1: Dados Pessoais */}
        <section className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-100 mb-4">
          <h2 className="text-sm font-bold text-zinc-900 mb-4">Dados Pessoais</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Nome Completo</label>
              <input 
                type="text" 
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Celular / WhatsApp</label>
              <input 
                type="tel" 
                value={localPhone}
                onChange={(e) => setLocalPhone(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">E-mail</label>
              <input 
                type="email" 
                value={localEmail}
                onChange={(e) => setLocalEmail(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>
        </section>

        {/* Card 2: Preferências */}
        <section className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-100 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-zinc-900 font-medium">Receber promoções no WhatsApp</h3>
              <p className="text-zinc-500 text-sm">Cupons e ofertas exclusivas</p>
            </div>
            <Switch checked={localAccepts} onChange={setLocalAccepts} />
          </div>
        </section>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 z-40">
        <button 
          onClick={handleSave}
          className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold text-lg shadow-md hover:bg-zinc-800 transition-colors mb-4"
        >
          Salvar Alterações
        </button>
        <button 
          onClick={handleDelete}
          className="w-full text-red-500 font-medium text-sm hover:text-red-600 transition-colors"
        >
          Apagar meus dados do aplicativo
        </button>
      </div>
    </div>
  )
}
