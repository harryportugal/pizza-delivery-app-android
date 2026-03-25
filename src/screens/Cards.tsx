import { ChevronLeft, CreditCard, QrCode } from 'lucide-react'
import { motion } from 'motion/react'
import { useUserDataStore } from '../store/useUserDataStore'

export function Cards({ onBack }: { onBack: () => void }) {
  const { cards } = useUserDataStore()

  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="min-h-full bg-slate-50 pb-32">
      <header className="flex items-center pt-14 px-6 pb-6 bg-slate-50 sticky top-0 z-30">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center text-zinc-900 hover:bg-zinc-50 transition-colors absolute left-6">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-zinc-900 font-bold text-lg tracking-wide w-full text-center">Pagamento</h1>
      </header>

      <div className="px-6 space-y-4">
        {cards.map((card) => (
          card.type === 'credit' ? (
            <div key={card.id} className="bg-zinc-900 text-white p-6 rounded-2xl shadow-lg border border-zinc-800">
              <div className="flex justify-between items-start mb-8">
                <CreditCard size={24} className="text-orange-500" />
                <span className="font-bold tracking-widest">{card.brand}</span>
              </div>
              <p className="text-xl font-mono tracking-widest mb-4">•••• {card.last4}</p>
              <div className="flex justify-between items-end">
                <p className="text-sm text-zinc-400">{card.name}</p>
                <span className="text-xs font-bold uppercase tracking-widest">{card.label}</span>
              </div>
            </div>
          ) : (
            <div key={card.id} className="bg-white p-5 rounded-2xl shadow-sm border border-zinc-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                <QrCode size={24} />
              </div>
              <span className="font-bold text-zinc-900">{card.label}</span>
            </div>
          )
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 z-40">
        <button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-md hover:bg-orange-600 transition-colors">
          + Adicionar Cartão
        </button>
      </div>
    </motion.div>
  )
}
