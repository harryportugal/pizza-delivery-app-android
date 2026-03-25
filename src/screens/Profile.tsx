import { MapPin, CreditCard, Clock, Settings, LogOut, ChevronRight, RotateCcw, User } from 'lucide-react'
import { motion } from 'motion/react'
import { useUserStore } from '../store/useUserStore'

export function Profile({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { name, email } = useUserStore()

  return (
    <div className="min-h-full bg-slate-50 pb-32">
      {/* Header */}
      <header className="pt-16 px-6 pb-6 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-zinc-200 flex items-center justify-center border-4 border-white shadow-sm text-zinc-400">
            <User size={48} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900">{name || 'Usuário'}</h1>
        <p className="text-sm text-zinc-500 mt-1">{email || 'seu@email.com'}</p>
      </header>

      <div className="px-6 space-y-6">
        {/* Último Pedido */}
        <section>
          <h2 className="text-sm font-bold text-zinc-900 mb-3 px-1 uppercase tracking-wider">Último Pedido</h2>
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                <Clock size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-zinc-900">Pizza Família Calabresa</h3>
                <p className="text-xs text-zinc-500">Ontem, 20:30 • R$ 65,90</p>
              </div>
            </div>
            <button className="w-full bg-zinc-900 text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
              <RotateCcw size={18} />
              Pedir Novamente
            </button>
          </div>
        </section>

        {/* Menu Options */}
        <section className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
          <div className="divide-y divide-zinc-100">
            <button onClick={() => onNavigate('addresses')} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-zinc-600">
                  <MapPin size={20} />
                </div>
                <span className="font-medium text-zinc-900">Meus Endereços</span>
              </div>
              <ChevronRight size={20} className="text-zinc-400" />
            </button>
            
            <button onClick={() => onNavigate('cards')} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-zinc-600">
                  <CreditCard size={20} />
                </div>
                <span className="font-medium text-zinc-900">Meus Cartões</span>
              </div>
              <ChevronRight size={20} className="text-zinc-400" />
            </button>

            <button onClick={() => onNavigate('orders')} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-zinc-600">
                  <Clock size={20} />
                </div>
                <span className="font-medium text-zinc-900">Histórico de Pedidos</span>
              </div>
              <ChevronRight size={20} className="text-zinc-400" />
            </button>

            <button onClick={() => onNavigate('settings')} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-zinc-600">
                  <Settings size={20} />
                </div>
                <span className="font-medium text-zinc-900">Configurações</span>
              </div>
              <ChevronRight size={20} className="text-zinc-400" />
            </button>

            <button className="w-full flex items-center justify-between p-5 hover:bg-red-50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-50 group-hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors">
                  <LogOut size={20} />
                </div>
                <span className="font-medium text-red-500">Sair</span>
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
