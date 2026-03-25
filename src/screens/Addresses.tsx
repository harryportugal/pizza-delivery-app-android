import { ChevronLeft, MapPin, Check, Trash2, Edit2 } from 'lucide-react'
import { motion } from 'motion/react'
import { useUserDataStore } from '../store/useUserDataStore'

export function Addresses({ onBack }: { onBack: () => void }) {
  const { addresses } = useUserDataStore()

  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="min-h-full bg-slate-50 pb-32">
      <header className="flex items-center pt-14 px-6 pb-6 bg-slate-50 sticky top-0 z-30">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center text-zinc-900 hover:bg-zinc-50 transition-colors absolute left-6">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-zinc-900 font-bold text-lg tracking-wide w-full text-center">Endereços</h1>
      </header>

      <div className="px-6 space-y-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <MapPin size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-zinc-900">{addr.title}</h3>
                {addr.isDefault && <Check size={16} className="text-orange-500" />}
              </div>
              <p className="text-sm text-zinc-500">{addr.street}, {addr.number}</p>
              <p className="text-sm text-zinc-500">{addr.neighborhood}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="text-zinc-400 hover:text-zinc-600"><Edit2 size={16} /></button>
              <button className="text-zinc-400 hover:text-red-500"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 z-40">
        <button className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold text-lg shadow-md hover:bg-zinc-800 transition-colors">
          + Adicionar Novo Endereço
        </button>
      </div>
    </motion.div>
  )
}
